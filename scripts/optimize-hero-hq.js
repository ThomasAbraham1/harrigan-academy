import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RESOURCES_DIR = path.resolve(__dirname, '../../Resources')
const OUTPUT_DIR    = path.join(__dirname, '../public/assets/images')

// Hero settings: 1080p max, 100 quality for largest possible size (targeting 400-500kb)
const HERO_MAX_PX = 1080
const HERO_QUALITY = 100

// Standard settings for other elements
const STD_MAX_PX = 1080
const STD_QUALITY = 85

const fileMap = {
  // Hero (now going to JPEGs for larger sizes)
  '01. Hero Banners/Main Landing.png': 'hero-main.jpg',
  '01. Hero Banners/Carousel 2.png':   'hero-carousel-2.jpg',
  '01. Hero Banners/Carousel - 3.png': 'hero-carousel-3.jpg',
  '01. Hero Banners/Carousel - 4.png': 'hero-carousel-4.jpg',
  '01. Hero Banners/Carousel - 5.png': 'hero-carousel-5.jpg',
  '01. Hero Banners/HA-Mobile banner-1.png': 'hero-mobile-1.jpg',
  '01. Hero Banners/HA-Mobile banner-2.png': 'hero-mobile-2.jpg',
  '01. Hero Banners/HA-Mobile banner-3.png': 'hero-mobile-3.jpg',
  '01. Hero Banners/HA-Mobile banner-4.png': 'hero-mobile-4.jpg',
  '01. Hero Banners/HA-Mobile banner-5.png': 'hero-mobile-5.jpg',

  // Website Elements
  'Harrigan website elements/Element - Cloud.png': 'element-cloud.webp',
  'Harrigan website elements/Element - Clouds.png': 'element-clouds.webp',
  'Harrigan website elements/Element - Paper Plane.png': 'element-paper-plane.webp',
  'Harrigan website elements/Element - Plane.png': 'element-plane.webp',
  'Harrigan website elements/Element - rainbow.png': 'element-rainbow.webp',
  'Harrigan website elements/Element - Stars.png': 'element-stars.webp',
  'Harrigan website elements/Element - Sun.png': 'element-sun.webp',
  'Harrigan website elements/Element - Bulb.png': 'element-bulb.webp',
  'Harrigan website elements/Element - Waves.png': 'element-waves.webp',
}

async function runHQ() {
  console.log(`Processing ${Object.keys(fileMap).length} hero images for HIGH QUALITY...`)
  
  for (const [srcRel, outRel] of Object.entries(fileMap)) {
    const src = path.join(RESOURCES_DIR, srcRel)
    const out = path.join(OUTPUT_DIR, outRel)
    
    if (!fs.existsSync(src)) {
      console.warn(`[WARN] Not found: ${src}`)
      continue
    }

    try {
      const isHero = srcRel.startsWith('01. Hero Banners')
      const maxPx = isHero ? HERO_MAX_PX : STD_MAX_PX
      const quality = isHero ? HERO_QUALITY : STD_QUALITY

      const { width, height } = await sharp(src).metadata()
      let resizeOpts = {}
      if (width > maxPx || height > maxPx) {
        resizeOpts = width >= height ? { width: maxPx } : { height: maxPx }
      }

      if (isHero) {
        // Output as high-quality JPEG to artificially increase file size to 400-600kb target
        await sharp(src)
          .resize(resizeOpts)
          .jpeg({ quality: 100, mozjpeg: false })
          .toFile(out)
      } else {
        await sharp(src)
          .resize(resizeOpts)
          .webp({ quality: quality, effort: 6 })
          .toFile(out)
      }

      const kb = (fs.statSync(out).size / 1024).toFixed(0)
      console.log(` [HQ] ${outRel.padEnd(30)} => ${kb} KB`)
    } catch (e) {
      console.error(` [ERR] ${outRel}:`, e.message)
    }
  }
  console.log('\nHero images re-processed at high quality.')
}

runHQ()
