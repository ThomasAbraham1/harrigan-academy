import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RESOURCES_DIR = path.resolve(__dirname, '../../Resources')
const OUTPUT_DIR    = path.join(__dirname, '../public/assets/images')
const MAX_PX        = 1080
const QUALITY       = 85

const fileMap = {
  // Hero
  '01. Hero Banners/Main Landing.png': 'hero-main.webp',
  '01. Hero Banners/Carousel 2.png':   'hero-carousel-2.webp',
  '01. Hero Banners/Carousel - 3.png': 'hero-carousel-3.webp',
  '01. Hero Banners/Carousel - 4.png': 'hero-carousel-4.webp',
  '01. Hero Banners/Carousel - 5.png': 'hero-carousel-5.webp',
  '01. Hero Banners/HA-Mobile banner-1.png': 'hero-mobile-1.webp',
  '01. Hero Banners/HA-Mobile banner-2.png': 'hero-mobile-2.webp',
  '01. Hero Banners/HA-Mobile banner-3.png': 'hero-mobile-3.webp',
  '01. Hero Banners/HA-Mobile banner-4.png': 'hero-mobile-4.webp',
  '01. Hero Banners/HA-Mobile banner-5.png': 'hero-mobile-5.webp',

  // Why Us
  '02. Why Students/1.jpg': 'why-us-1.webp',
  '02. Why Students/2.jpg': 'why-us-2.webp',
  '02. Why Students/3.jpg': 'why-us-3.webp',

  // About
  '03. About Course/1.jpg': 'about-1.webp',
  '03. About Course/2.jpg': 'about-2.webp',
  '03. About Course/3.jpg': 'about-3.webp',

  // Teachers
  'Teachers/John Harrigan.jpeg': 'teachers/john.webp',
  'Teachers/Keiko.jpeg':         'teachers/keiko.webp',
  'Teachers/Ema.jpeg':           'teachers/ema.webp',
  'Teachers/Naomi.jpeg':         'teachers/naomi.webp',
  'Teachers/Caleb.jpeg':         'teachers/caleb.webp',
  'Teachers/Lucy.jpeg':          'teachers/lucy.webp',
  'Teachers/abe.jpeg':           'teachers/abe.webp',

  // Misc Elements
  'Harrigan website elements/World map.png': 'world-map.webp',
  'Wavy Cloud Border.png':                   'wavy-cloud-border.webp',
}

async function run() {
  console.log('Cleaning existing public/assets/images (only non-dirs)...')
  const existing = fs.readdirSync(OUTPUT_DIR)
  for (const f of existing) {
    const full = path.join(OUTPUT_DIR, f)
    if (!fs.statSync(full).isDirectory()) {
      fs.unlinkSync(full)
    }
  }
  // also clean teachers dir
  const existingT = fs.readdirSync(path.join(OUTPUT_DIR, 'teachers'))
  for (const f of existingT) {
    fs.unlinkSync(path.join(OUTPUT_DIR, 'teachers', f))
  }

  console.log(`\nProcessing ${Object.keys(fileMap).length} pristine images from Resources...`)
  
  for (const [srcRel, outRel] of Object.entries(fileMap)) {
    const src = path.join(RESOURCES_DIR, srcRel)
    const out = path.join(OUTPUT_DIR, outRel)
    
    if (!fs.existsSync(src)) {
      console.warn(`[WARN] Not found: ${src}`)
      continue
    }

    try {
      const { width, height } = await sharp(src).metadata()
      let resizeOpts = {}
      if (width > MAX_PX || height > MAX_PX) {
        resizeOpts = width >= height ? { width: MAX_PX } : { height: MAX_PX }
      }

      await sharp(src)
        .resize(resizeOpts)
        .webp({ quality: QUALITY })
        .toFile(out)

      const kb = (fs.statSync(out).size / 1024).toFixed(0)
      console.log(` [OK] ${outRel.padEnd(30)} => ${kb} KB`)
    } catch (e) {
      console.error(` [ERR] ${outRel}:`, e.message)
    }
  }
  console.log('\nAll done!')
}

run()
