import { useState, useEffect, useCallback } from 'react'

type Phase = 'idle' | 'playing' | 'answered'

const DEMO_NOTES = ['E', 'G', 'C', 'E', 'G']
const UNIT_NOTES = ['C', 'E', 'G']
const WAVEFORM_HEIGHTS = [0.3, 0.65, 1.0, 0.8, 0.5, 0.9, 0.6, 0.4, 0.85, 0.7, 0.35]

export default function PhoneMockup() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [correctNote, setCorrectNote] = useState('E')
  const [streak, setStreak] = useState(12)
  const [demoIdx, setDemoIdx] = useState(0)

  const runCycle = useCallback((idx: number) => {
    const note = DEMO_NOTES[idx % DEMO_NOTES.length]
    setCorrectNote(note)
    setPhase('playing')

    const t1 = setTimeout(() => setPhase('answered'), 2200)
    const t2 = setTimeout(() => setStreak((s) => s + 1), 2200)
    const t3 = setTimeout(() => {
      setPhase('idle')
      const next = (idx + 1) % DEMO_NOTES.length
      setDemoIdx(next)
    }, 4000)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  useEffect(() => {
    const init = setTimeout(() => runCycle(0), 800)
    return () => clearTimeout(init)
  }, [])

  useEffect(() => {
    if (phase !== 'idle') return
    const t = setTimeout(() => runCycle(demoIdx), 600)
    return () => clearTimeout(t)
  }, [phase, demoIdx, runCycle])

  return (
    <div style={{ animation: 'float 5s ease-in-out infinite' }}>
      {/* Phone outer frame */}
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
        {/* Screen */}
        <div
          style={{
            borderRadius: 'calc(2.75rem - 3px)',
            overflow: 'hidden',
            background: '#0f1115',
            minHeight: '520px',
          }}
        >
          {/* Status bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 22px 8px',
            }}
          >
            <span style={{ fontSize: '11px', color: '#8d96a5', fontFamily: 'monospace' }}>9:41</span>
            <div
              style={{
                width: '88px',
                height: '18px',
                background: '#161a21',
                borderRadius: '999px',
              }}
            />
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <div
                style={{
                  width: '14px',
                  height: '10px',
                  border: '1.5px solid #8d96a5',
                  borderRadius: '2px',
                  opacity: 0.6,
                }}
              />
            </div>
          </div>

          {/* App content */}
          <div style={{ padding: '4px 18px 24px' }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '14px',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#8d96a5',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontFamily: 'monospace',
                    marginBottom: '2px',
                  }}
                >
                  Unit 1
                </div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc' }}>
                  The Major Triad
                </div>
              </div>

              {/* Streak badge */}
              <div
                style={{
                  background: '#1d222b',
                  border: '1px solid #2f3541',
                  borderRadius: '10px',
                  padding: '5px 9px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div
                  style={{
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    background: '#38d9d9',
                    animation: 'pulse-dot 2s ease-in-out infinite',
                  }}
                />
                <span
                  style={{
                    fontSize: '12px',
                    color: '#f8fafc',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    transition: 'all 0.3s ease',
                    minWidth: '18px',
                  }}
                >
                  {streak}
                </span>
              </div>
            </div>

            {/* Prompt box */}
            <div
              style={{
                background: '#161a21',
                border: '1px solid #2f3541',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
                marginBottom: '12px',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  color: '#8d96a5',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontFamily: 'monospace',
                  marginBottom: '12px',
                }}
              >
                What note is this?
              </div>

              {/* Waveform bars */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '3px',
                  height: '32px',
                }}
              >
                {WAVEFORM_HEIGHTS.map((h, i) => (
                  <div
                    key={i}
                    style={{
                      width: '3px',
                      borderRadius: '2px',
                      background: phase === 'playing' ? '#38d9d9' : '#2f3541',
                      height: `${Math.round(h * 28)}px`,
                      transformOrigin: 'center bottom',
                      animation:
                        phase === 'playing'
                          ? `waveform 0.75s ease-in-out infinite`
                          : 'none',
                      animationDelay: `${i * 0.065}s`,
                      transition: 'background 0.4s ease, height 0.4s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Note grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '7px',
                marginBottom: '12px',
              }}
            >
              {UNIT_NOTES.map((note) => {
                const isCorrect = phase === 'answered' && note === correctNote
                return (
                  <div
                    key={note}
                    style={{
                      borderRadius: '12px',
                      padding: '11px 4px',
                      fontSize: '14px',
                      fontWeight: 700,
                      fontFamily: 'monospace',
                      textAlign: 'center',
                      border: isCorrect ? '1.5px solid #38d9d9' : '1px solid #2f3541',
                      background: isCorrect ? '#38d9d9' : '#1d222b',
                      color: isCorrect ? '#0f1115' : '#c3c9d4',
                      transform: isCorrect ? 'scale(1.05)' : 'scale(1)',
                      transition: 'all 0.28s cubic-bezier(0.16, 1, 0.3, 1)',
                      cursor: 'default',
                    }}
                  >
                    {note}
                  </div>
                )
              })}
            </div>

            {/* Status line */}
            <div
              style={{
                fontSize: '12px',
                textAlign: 'center',
                fontFamily: 'monospace',
                fontWeight: phase === 'answered' ? 700 : 400,
                color: phase === 'answered' ? '#38d9d9' : '#8d96a5',
                transition: 'all 0.3s ease',
                minHeight: '18px',
              }}
            >
              {phase === 'answered'
                ? `Correct — ${correctNote}`
                : phase === 'playing'
                  ? 'Listen carefully...'
                  : 'Ready'}
            </div>

            {/* Accuracy bar */}
            <div style={{ marginTop: '16px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '5px',
                }}
              >
                <span style={{ fontSize: '10px', color: '#8d96a5', fontFamily: 'monospace' }}>
                  Accuracy
                </span>
                <span
                  style={{
                    fontSize: '10px',
                    color: '#38d9d9',
                    fontFamily: 'monospace',
                    fontWeight: 700,
                  }}
                >
                  84%
                </span>
              </div>
              <div
                style={{
                  height: '3px',
                  background: '#2f3541',
                  borderRadius: '2px',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: '84%',
                    background: '#38d9d9',
                    borderRadius: '2px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
