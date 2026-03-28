import { useState, useEffect } from 'react'

// Email is assembled client-side only — never in HTML source — to avoid harvesters.
export default function SupportContact() {
  const [href, setHref] = useState<string>('#')
  const [label, setLabel] = useState<string>('Loading...')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const u = 'support'
    const d = 'absoluteear' + '.' + 'com'
    const email = `${u}@${d}`
    setHref(`mailto:${email}`)
    setLabel(email)
    setReady(true)
  }, [])

  return (
    <div>
      <a
        href={href}
        aria-label="Send an email to Absolute Ear support"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          padding: '13px 24px',
          background: 'var(--color-accent)',
          color: 'var(--color-surface)',
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '15px',
          textDecoration: 'none',
          transition: 'opacity 0.15s, transform 0.1s',
          opacity: ready ? 1 : 0.5,
          pointerEvents: ready ? 'auto' : 'none',
        }}
        onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '0.88' }}
        onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = '1' }}
        onMouseDown={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(0.97)' }}
        onMouseUp={(e) => { (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)' }}
      >
        {/* Mail icon */}
        <svg width="17" height="13" viewBox="0 0 17 13" fill="none" aria-hidden="true">
          <rect x="0.5" y="0.5" width="16" height="12" rx="1.5" stroke="currentColor" strokeOpacity="0.7"/>
          <path d="M1 1.5L8.5 7.5L16 1.5" stroke="currentColor" strokeOpacity="0.7" strokeLinecap="round"/>
        </svg>
        Email support
      </a>

      {ready && (
        <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--color-text-3)', fontFamily: 'var(--font-mono)' }}>
          {label}
        </p>
      )}
    </div>
  )
}
