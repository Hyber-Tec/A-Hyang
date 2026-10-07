import { EN, KO } from './logoPaths'

type Props = {
  className?: string
  /** 'sign' mirrors the storefront: leaf-green 애향 with a white a-hyang. */
  tone?: 'sign' | 'light' | 'dark'
  withLatin?: boolean
  shadow?: boolean
  title?: string
}

const GAP = 22
const LATIN_SCALE = 0.52

/** The 애향 a-hyang wordmark, drawn as vector paths so it stays crisp at any size. */
export function Logo({ className = '', tone = 'sign', withLatin = true, shadow = false, title = '애향 a-hyang' }: Props) {
  const width = withLatin ? KO.w + GAP + EN.w * LATIN_SCALE : KO.w
  const height = KO.h
  const ko = tone === 'dark' ? 'var(--color-leaf-deep)' : tone === 'light' ? 'var(--color-paper)' : 'var(--color-leaf)'
  const en = tone === 'dark' ? 'var(--color-ink)' : 'var(--color-paper)'

  return (
    <svg
      viewBox={`-2 -2 ${(width + (shadow ? 8 : 4)).toFixed(1)} ${(height + (shadow ? 9 : 4)).toFixed(1)}`}
      className={className}
      role="img"
      aria-label={title}
    >
      {shadow && <path d={KO.d} fill="#000" opacity={0.55} transform="translate(5 6)" />}
      <path d={KO.d} fill={ko} />
      {withLatin && (
        <g transform={`translate(${KO.w + GAP} ${height - EN.h * LATIN_SCALE}) scale(${LATIN_SCALE})`}>
          <path d={EN.d} fill={en} />
        </g>
      )}
    </svg>
  )
}

/** Just the Hangul mark, for oversized decorative use. */
export function LogoMark({ className = '', color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg viewBox={`0 0 ${KO.w} ${KO.h}`} className={className} aria-hidden="true">
      <path d={KO.d} fill={color} />
    </svg>
  )
}
