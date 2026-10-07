import type { ReactNode } from 'react'
import { Reveal } from './motion'

/** Small numbered eyebrow that opens each section: "02 ── Signature". */
export function SectionLabel({ index, children, tone = 'dark' }: { index: string; children: ReactNode; tone?: 'dark' | 'light' }) {
  return (
    <Reveal y={12} className={`eyebrow flex items-center gap-3 ${tone === 'dark' ? 'text-muted' : 'text-muted-ink'}`}>
      <span className={`tabular-nums ${tone === 'dark' ? 'text-gold' : 'text-gold-deep'}`}>{index}</span>
      <span className={`h-px w-10 ${tone === 'dark' ? 'bg-white/25' : 'bg-ink/25'}`} />
      <span>{children}</span>
    </Reveal>
  )
}
