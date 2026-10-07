// Optimizes source photos in assets-src/images into responsive AVIF/WebP sets in public/images,
// and writes src/data/images.gen.json (dimensions, available widths, blur placeholder, dominant color).
//
//   npm run images            # process new/changed images
//   npm run images -- --force # rebuild everything
//
// Optional per-image settings live in assets-src/images/images.config.json:
//   { "katsu-hero": { "crop": { "x": 0, "y": 0.1, "w": 1, "h": 0.8 }, "maxWidth": 2400, "quality": 60 } }
// crop values are fractions of the source image.
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const SRC = path.join(ROOT, 'assets-src/images')
const OUT = path.join(ROOT, 'public/images')
const MANIFEST = path.join(ROOT, 'src/data/images.gen.json')
const WIDTHS = [480, 800, 1200, 1600, 2400]
const force = process.argv.includes('--force')

const exists = (p) => fs.access(p).then(() => true, () => false)
const config = (await exists(path.join(SRC, 'images.config.json')))
  ? JSON.parse(await fs.readFile(path.join(SRC, 'images.config.json'), 'utf8'))
  : {}
const previous = (await exists(MANIFEST)) ? JSON.parse(await fs.readFile(MANIFEST, 'utf8')) : {}

await fs.mkdir(OUT, { recursive: true })
const files = (await fs.readdir(SRC)).filter((f) => /\.(jpe?g|png|webp|avif|tiff?)$/i.test(f)).sort()
const manifest = {}

for (const file of files) {
  const name = path.parse(file).name
  const src = path.join(SRC, file)
  const opts = config[name] ?? {}
  const stat = await fs.stat(src)
  const signature = `${stat.size}:${stat.mtimeMs}:${JSON.stringify(opts)}`

  if (!force && previous[name]?.signature === signature) {
    const allThere = await Promise.all(
      previous[name].widths.flatMap((w) => ['avif', 'webp'].map((f) => exists(path.join(OUT, `${name}-${w}.${f}`)))),
    )
    if (allThere.every(Boolean)) {
      manifest[name] = previous[name]
      continue
    }
  }

  let base = sharp(src).rotate() // honor EXIF orientation
  const meta = await base.metadata()
  let width = meta.autoOrient?.width ?? meta.width
  let height = meta.autoOrient?.height ?? meta.height
  if (opts.crop) {
    const c = opts.crop
    const region = {
      left: Math.round(c.x * width),
      top: Math.round(c.y * height),
      width: Math.round(c.w * width),
      height: Math.round(c.h * height),
    }
    base = sharp(await base.toBuffer()).extract(region)
    width = region.width
    height = region.height
  }
  const buf = await base.toBuffer()
  const maxW = Math.min(width, opts.maxWidth ?? 2400)
  const widths = WIDTHS.filter((w) => w < maxW)
  if (!widths.length || widths[widths.length - 1] !== maxW) widths.push(maxW)

  for (const w of widths) {
    const pipeline = sharp(buf).resize({ width: w, withoutEnlargement: true })
    await pipeline.clone().avif({ quality: opts.quality ?? 58, effort: 2 }).toFile(path.join(OUT, `${name}-${w}.avif`))
    await pipeline.clone().webp({ quality: (opts.quality ?? 58) + 22, effort: 2 }).toFile(path.join(OUT, `${name}-${w}.webp`))
  }

  const lqip = await sharp(buf).resize({ width: 24 }).blur(1.2).webp({ quality: 40 }).toBuffer()
  const { dominant } = await sharp(buf).stats()
  manifest[name] = {
    w: width,
    h: height,
    widths,
    lqip: `data:image/webp;base64,${lqip.toString('base64')}`,
    color: `rgb(${dominant.r},${dominant.g},${dominant.b})`,
    signature,
  }
  console.log(`✓ ${name}  ${width}×${height}  → ${widths.join(', ')}`)
}

// Remove outputs for images that no longer exist.
for (const f of await fs.readdir(OUT)) {
  const m = f.match(/^(.*)-\d+\.(avif|webp)$/)
  if (m && !manifest[m[1]]) await fs.rm(path.join(OUT, f))
}

await fs.mkdir(path.dirname(MANIFEST), { recursive: true })
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 1) + '\n')
console.log(`${Object.keys(manifest).length} images in manifest`)
