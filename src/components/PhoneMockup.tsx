export default function PhoneMockup() {
  return (
    <div
      style={{
        width: '264px',
        borderRadius: '2.75rem',
        padding: '3px',
        background: 'linear-gradient(160deg, #3a4251 0%, #1d222b 60%)',
        boxShadow:
          '0 48px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      <div
        style={{
          borderRadius: 'calc(2.75rem - 3px)',
          overflow: 'hidden',
          background: 'var(--color-dark-bg)',
          position: 'relative',
        }}
      >
        <img
          src="/phone-screenshot.png"
          alt="Absolute Ear app home screen"
          style={{
            display: 'block',
            width: '100%',
            height: 'auto',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(165deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.04) 16%, rgba(255,255,255,0) 34%), linear-gradient(180deg, rgba(8,12,18,0) 58%, rgba(8,12,18,0.16) 100%)',
            pointerEvents: 'none',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '4%',
            left: '6%',
            width: '64%',
            height: '22%',
            borderRadius: '999px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 100%)',
            filter: 'blur(18px)',
            transform: 'rotate(-10deg)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  )
}
