import sharp from 'sharp'
import { join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const resourcesDir = join(projectRoot, '../Resources')
const outputDir = join(projectRoot, 'public/assets/images')
const teachersOutputDir = join(outputDir, 'teachers')

const MAX_PX = 1080
const TARGET_QUALITY = 80 // WebP quality

const mappings = [
  { src: 'Teachers/Optimized/Abe.png', dest: 'teachers/abe.webp' },
  { src: 'Teachers/Optimized/Caleb.png', dest: 'teachers/caleb.webp' },
  { src: 'Teachers/Optimized/Ema.png', dest: 'teachers/ema.webp' },
  { src: 'Teachers/Optimized/John.png', dest: 'teachers/john.webp' },
  { src: 'Teachers/Optimized/Keiko Harrigan.png', dest: 'teachers/keiko.webp' },
  { src: 'Teachers/Optimized/Lucy.png', dest: 'teachers/lucy.webp' },
  { src: 'Teachers/Optimized/Naomi Aoki.png', dest: 'teachers/naomi.webp' },
  { src: '03. About Course/1.jpg', dest: 'about-hero.jpg' },
  { src: 'Contact/Hariigan map section-2.png', dest: 'contact-bg.webp' }
]

async function processImages() {
  console.log('🚀 Starting bulk image compression...')
  for (const { src, dest } of mappings) {
    const srcPath = join(resourcesDir, src)
    const destPath = join(outputDir, dest)

    try {
      const info = await sharp(srcPath)
        .resize({
          width: MAX_PX,
          height: MAX_PX,
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: TARGET_QUALITY, effort: 6 })
        .toFile(destPath)

      const sizeKB = (info.size / 1024).toFixed(1)
      console.log(`✅ ${src} -> ${dest} (${sizeKB}kb)`)
      
      // If it's too big, try again with lower quality
      if (info.size > 100 * 1024) {
        console.log(`⚠️  ${dest} is too large (${sizeKB}kb), retrying with lower quality...`)
        const info2 = await sharp(srcPath)
          .resize({ width: MAX_PX, height: MAX_PX, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 65, effort: 6 })
          .toFile(destPath)
        console.log(`✅ ${dest} retry: ${(info2.size / 1024).toFixed(1)}kb`)
      }
    } catch (err) {
      console.error(`❌ Error processing ${src}:`, err.message)
    }
  }
}

processImages()
