import sharp from 'sharp'
import { readdirSync, statSync, renameSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
// Resize source images in public so they stay small across all future builds
const assetsDir = join(__dirname, '../public/assets/images')
const MAX_PX = 1920
const SUPPORTED = ['.jpg', '.jpeg', '.png', '.webp']

function walk(dir) {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) files.push(...walk(full))
    else files.push(full)
  }
  return files
}

const files = walk(assetsDir).filter(f => SUPPORTED.includes(extname(f).toLowerCase()))

for (const file of files) {
  const meta = await sharp(file).metadata()
  const w = meta.width ?? 0
  const h = meta.height ?? 0
  const sizeMB = (statSync(file).size / 1024 / 1024).toFixed(1)
  const name = file.split(/[\\/]/).pop()
  const ext = extname(file).toLowerCase()

  if (w <= MAX_PX && h <= MAX_PX) {
    console.log(`  skip  ${name} (${w}x${h}, ${sizeMB}MB)`)
    continue
  }

  const tmpFile = file + '.resized'
  const sharpInst = sharp(file).resize(MAX_PX, MAX_PX, { fit: 'inside', withoutEnlargement: true })

  if (ext === '.png') await sharpInst.png({ compressionLevel: 8 }).toFile(tmpFile)
  else if (ext === '.webp') await sharpInst.webp({ quality: 85 }).toFile(tmpFile)
  else await sharpInst.jpeg({ quality: 82, mozjpeg: true }).toFile(tmpFile)

  // Rename: tmp replaces original
  renameSync(tmpFile, file)

  const newMB = (statSync(file).size / 1024 / 1024).toFixed(1)
  console.log(`  resize ${name}  ${w}x${h} → max ${MAX_PX}  ${sizeMB}MB → ${newMB}MB`)
}

console.log('\nAll done!')
