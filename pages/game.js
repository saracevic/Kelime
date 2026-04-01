import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect, useCallback } from 'react'
import { useProgress } from '../components/useProgress'
import { allWords, year5Words, year6Words } from '../data/words'

function shuffle(arr) {
  const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]] } return a
}

const modes = [
  { key: 'all', label: 'Tümü (103)' },
  { key: 'y5', label: 'Year 5 (52)' },
  { key: 'y6', label: 'Year 6 (51)' },
  { key: 'weak', label: 'Sadece zor' },
]

export default function Game() {
  const { cycleStatus, getStatus, setStatus } = useProgress()
  const [mode, setMode] = useState('all')
  const [deck, setDeck] = useState([])
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [sessionStats, setSessionStats] = useState({ known: 0, learning: 0 })
  const [done, setDone] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const buildDeck = useCallback(() => {
    let words = mode === 'y5' ? year5Words : mode === 'y6' ? year6Words : allWords
    if (mode === 'weak') words = allWords.filter(w => getStatus(w.en) === 'learning' || !getStatus(w.en))
    return shuffle(words)
  }, [mode, getStatus])

  useEffect(() => {
    if (!mounted) return
    const d = buildDeck()
    setDeck(d); setIdx(0); setRevealed(false); setDone(false); setSessionStats({ known: 0, learning: 0 })
  }, [mode, mounted])

  const current = deck[idx]

  function answer(knew) {
    setStatus(current.en, knew ? 'known' : 'learning')
    setSessionStats(s => ({ ...s, [knew ? 'known' : 'learning']: s[knew ? 'known' : 'learning'] + 1 }))
    if (idx + 1 >= deck.length) { setDone(true); return }
    setIdx(i => i + 1); setRevealed(false)
  }

  function restart() {
    const d = buildDeck()
    setDeck(d); setIdx(0); setRevealed(false); setDone(false); setSessionStats({ known: 0, learning: 0 })
  }

  if (!mounted) return null

  return (
    <>
      <Head><title>Flash Kart Oyunu</title></Head>
      <div className="min-h-screen flex flex-col" style={{ background: 'var(--paper)' }}>

        <header className="border-b border-stone-200 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/" className="text-sm" style={{ color: 'var(--mist)' }}>← Ana sayfa</Link>
            <h1 className="font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Flash kart</h1>
          </div>
        </header>

        <main className="max-w-md mx-auto w-full px-4 py-8 flex flex-col gap-6 flex-1">

          {/* Mode selector */}
          <div className="flex gap-2 flex-wrap">
            {modes.map(({ key, label }) => (
              <button key={key} onClick={() => setMode(key)}
                className={`tab-btn text-xs ${mode === key ? 'active' : ''}`}
                style={{ fontFamily: 'Syne, sans-serif' }}>
                {label}
              </button>
            ))}
          </div>

          {done ? (
            <div className="card text-center py-12 space-y-4 animate-slide-up">
              <p className="text-4xl">🎉</p>
              <p className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>Tur bitti!</p>
              <div className="flex justify-center gap-8 text-sm">
                <div><p className="text-2xl font-bold" style={{ color: 'var(--sage)' }}>{sessionStats.known}</p><p style={{ color: 'var(--mist)' }}>Bildim</p></div>
                <div><p className="text-2xl font-bold" style={{ color: 'var(--gold)' }}>{sessionStats.learning}</p><p style={{ color: 'var(--mist)' }}>Çalışacak</p></div>
              </div>
              <button onClick={restart} className="btn-primary mt-4">Tekrar oyna</button>
            </div>
          ) : current ? (
            <>
              {/* Progress */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: '#e8e3da' }}>
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${(idx / deck.length) * 100}%`, background: 'var(--ink)' }} />
                </div>
                <span className="text-xs font-mono" style={{ color: 'var(--mist)' }}>{idx + 1}/{deck.length}</span>
              </div>

              {/* Card */}
              <div className="card py-12 text-center space-y-3 animate-slide-up" style={{ minHeight: 220 }}>
                <p className="text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--mist)', fontFamily: 'Syne, sans-serif' }}>
                  Year {current.year}
                </p>
                <p className="text-4xl font-bold tracking-tight" style={{ fontFamily: 'Syne, sans-serif', color: 'var(--ink)' }}>
                  {current.en}
                </p>
                {current.tricky && (
                  <p className="text-xs font-mono px-3 py-1 rounded-full inline-block" style={{ background: '#f5f0e8', color: 'var(--mist)' }}>
                    tuzak: {current.tricky}
                  </p>
                )}
                {revealed && (
                  <div className="animate-fade-in pt-4 border-t border-stone-100 mt-4">
                    <p className="text-xl font-400" style={{ color: 'var(--sage)' }}>{current.tr}</p>
                  </div>
                )}
              </div>

              {/* Actions */}
              {!revealed ? (
                <button onClick={() => setRevealed(true)} className="btn-primary w-full text-center">
                  Anlamı göster
                </button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <button onClick={() => answer(false)}
                    className="card py-4 text-center border-2 hover:-translate-y-0.5 transition-all duration-200"
                    style={{ borderColor: '#e8927c', color: '#c0614a' }}>
                    <p className="text-xl mb-1">✗</p>
                    <p className="font-medium text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Bilmiyorum</p>
                  </button>
                  <button onClick={() => answer(true)}
                    className="card py-4 text-center border-2 hover:-translate-y-0.5 transition-all duration-200"
                    style={{ borderColor: '#4a7c59', color: '#2d5c3c' }}>
                    <p className="text-xl mb-1">✓</p>
                    <p className="font-medium text-sm" style={{ fontFamily: 'Syne, sans-serif' }}>Biliyorum</p>
                  </button>
                </div>
              )}

              {/* Session mini stats */}
              <div className="flex justify-center gap-6 text-sm" style={{ color: 'var(--mist)' }}>
                <span style={{ color: 'var(--sage)' }}>✓ {sessionStats.known}</span>
                <span style={{ color: 'var(--gold)' }}>● {sessionStats.learning}</span>
              </div>
            </>
          ) : (
            <div className="card text-center py-12">
              <p style={{ color: 'var(--mist)' }}>Bu filtrede kelime yok.</p>
              <button onClick={() => setMode('all')} className="btn-ghost mt-4">Tüm kelimeleri göster</button>
            </div>
          )}
        </main>
      </div>
    </>
  )
}
