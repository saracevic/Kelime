import Head from 'next/head'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useProgress } from '../components/useProgress'
import { allWords, year5Words, year6Words } from '../data/words'

const filters = [
  { key: 'all', label: 'Tümü' },
  { key: 'new', label: 'Yeni' },
  { key: 'learning', label: 'Çalışılıyor' },
  { key: 'known', label: 'Öğrenildi' },
]

const yearFilters = [
  { key: 'both', label: 'Y5 + Y6' },
  { key: '5', label: 'Year 5' },
  { key: '6', label: 'Year 6' },
]

export default function Tracker() {
  const { cycleStatus, getStatus, stats, loaded } = useProgress()
  const [filter, setFilter] = useState('all')
  const [yearFilter, setYearFilter] = useState('both')
  const [search, setSearch] = useState('')
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const baseWords = yearFilter === '5' ? year5Words : yearFilter === '6' ? year6Words : allWords

  const visible = baseWords.filter(w => {
    const s = getStatus(w.en)
    if (filter === 'new' && s) return false
    if (filter === 'learning' && s !== 'learning') return false
    if (filter === 'known' && s !== 'known') return false
    if (search && !w.en.toLowerCase().includes(search.toLowerCase()) && !w.tr.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const s = stats(baseWords)

  if (!mounted) return null

  return (
    <>
      <Head><title>Kelime Takibi</title></Head>
      <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <header className="border-b border-stone-200 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/" className="text-sm" style={{ color: 'var(--mist)' }}>← Ana sayfa</Link>
            <h1 className="font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Kelime takibi</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-6 space-y-5">

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Toplam', val: s.total },
              { label: 'Çalışılıyor', val: s.learning, color: '#d4a843' },
              { label: 'Öğrenildi', val: s.known, color: '#4a7c59' },
            ].map(({ label, val, color }) => (
              <div key={label} className="card py-4 text-center">
                <p className="text-2xl font-bold" style={{ fontFamily: 'Syne, sans-serif', color: color || 'var(--ink)' }}>{val}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--mist)' }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--mist)' }}>
              <span>İlerleme</span><span>{s.pct}%</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e8e3da' }}>
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${s.pct}%`, background: 'var(--sage)' }} />
            </div>
          </div>

          {/* Search */}
          <input
            type="text" placeholder="Kelime ara…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full px-4 py-2.5 rounded-full border border-stone-200 bg-white text-sm outline-none focus:border-stone-400 transition-colors"
          />

          {/* Year filter */}
          <div className="flex gap-2">
            {yearFilters.map(({ key, label }) => (
              <button key={key} onClick={() => setYearFilter(key)}
                className={`tab-btn ${yearFilter === key ? 'active' : ''}`}
                style={{ fontFamily: 'Syne, sans-serif' }}>
                {label}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex gap-2 flex-wrap">
            {filters.map(({ key, label }) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`tab-btn ${filter === key ? 'active' : ''}`}
                style={{ fontFamily: 'Syne, sans-serif' }}>
                {label} {key !== 'all' && (
                  <span className="ml-1 opacity-60">
                    {key === 'new' && baseWords.filter(w => !getStatus(w.en)).length}
                    {key === 'learning' && baseWords.filter(w => getStatus(w.en) === 'learning').length}
                    {key === 'known' && baseWords.filter(w => getStatus(w.en) === 'known').length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Legend */}
          <p className="text-xs" style={{ color: 'var(--mist)' }}>
            Karta tıkla: boş → 🟡 çalışılıyor → 🟢 öğrenildi → sıfırla
          </p>

          {/* Word grid */}
          <div className="grid grid-cols-2 gap-2">
            {visible.map(word => {
              const s = getStatus(word.en)
              const chipClass = s === 'known' ? 'word-chip-known' : s === 'learning' ? 'word-chip-learning' : 'word-chip-new'
              return (
                <button key={word.en} onClick={() => cycleStatus(word.en)}
                  className={`word-chip ${chipClass} text-left`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate" style={{ fontFamily: 'Syne, sans-serif' }}>{word.en}</p>
                    <p className="text-xs truncate opacity-70">{word.tr}</p>
                    {word.tricky && <p className="text-xs mt-0.5 font-mono opacity-50">{word.tricky}</p>}
                  </div>
                  <span className="text-base shrink-0">
                    {s === 'known' ? '✓' : s === 'learning' ? '●' : ''}
                  </span>
                </button>
              )
            })}
          </div>

          {visible.length === 0 && (
            <p className="text-center py-12 text-sm" style={{ color: 'var(--mist)' }}>Bu filtrede kelime yok.</p>
          )}

        </main>
      </div>
    </>
  )
}
