import { useState, type CSSProperties } from 'react'
import images from '../data/images.gen.json'

type Manifest = Record<string, { w: number; h: number; widths: number[]; lqip: string; color: string }>
const manifest = images as Manifest

export type ImageName = keyof typeof images

type Props = {
  name: ImageName
  alt: string
  /** The `sizes` attribute — how wide the image renders, so the browser picks the right file. */
  sizes?: string
  className?: string
  imgClassName?: string
  style?: CSSProperties
  imgStyle?: CSSProperties
  priority?: boolean
  /** CSS object-position for the inner <img>. */
  position?: string
}

const srcSet = (name: string, widths: number[], fmt: 'avif' | 'webp') =>
  widths.map((w) => `/images/${name}-${w}.${fmt} ${w}w`).join(', ')

/** Responsive <picture> with AVIF/WebP sources and a blurred placeholder that fades out on load. */
export function Img({ name, alt, sizes = '100vw', className = '', imgClassName = '', style, imgStyle, priority, position }: Props) {
  const m = manifest[name]
  const [loaded, setLoaded] = useState(false)
  if (!m) return null
  const fallback = m.widths.find((w) => w >= 1200) ?? m.widths[m.widths.length - 1]

  return (
    <picture
      className={`block overflow-hidden ${className}`}
      style={{ backgroundColor: m.color, backgroundImage: `url(${m.lqip})`, backgroundSize: 'cover', backgroundPosition: position ?? 'center', ...style }}
    >
      <source type="image/avif" srcSet={srcSet(name, m.widths, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, m.widths, 'webp')} sizes={sizes} />
      <img
        src={`/images/${name}-${fallback}.webp`}
        width={m.w}
        height={m.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        draggable={false}
        onLoad={() => setLoaded(true)}
        ref={(el) => {
          if (el?.complete && el.naturalWidth > 0 && !loaded) setLoaded(true)
        }}
        className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        style={{ objectPosition: position, ...imgStyle }}
      />
    </picture>
  )
}
