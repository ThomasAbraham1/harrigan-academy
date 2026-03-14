import sharp from 'sharp'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const teachersDir = join(projectRoot, 'public/assets/images/teachers')

const MAX_PX = 1080
const TARGET_QUALITY = 80

const newImages = [
  { src: 'Harrigan.png', dest: 'john.webp', width: 800, height: 1000 },
  { src: 'Elizabeth.png', dest: 'elizabeth.webp', width: 1080, height: 1080 },
  { src: 'Hiromi.png', dest: 'hiromi.webp', width: 1080, height: 1080 }
]

async function compress() {
  console.log('🚀 Compressing new teacher images...')
  for (const { src, dest, width, height } of newImages) {
    const srcPath = join(teachersDir, src)
    const destPath = join(teachersDir, dest)

    try {
      const info = await sharp(srcPath)
        .resize({
          width: width,
          height: height,
          fit: 'inside', // This ensures we don't distort it
          withoutEnlargement: true
        })
        .webp({ quality: TARGET_QUALITY, effort: 6 })
        .toFile(destPath)

      console.log(`✅ ${src} -> ${dest} (${(info.size / 1024).toFixed(1)}kb) - ${width}x${height}`)
    } catch (err) {
      console.error(`❌ Error processing ${src}:`, err.message)
    }
  }
}

compress()
