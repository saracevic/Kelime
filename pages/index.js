import Head from 'next/head'
import Link from 'next/link'
import { useProgress } from '../components/useProgress'
import { allWords, year5Words, year6Words } from '../data/words'
import { useEffect, useState } from 'react'

function ProgressRing({ pct, size = 80, stroke = 6, color = '#4a7c59' }) {
  const r = (size - stroke) / 2
  const circ = 2 * Math.PI * r
  const offset = circ - (pct / 100) * circ
  return (
    <svg width={size} height={size}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#e8e3da" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round" transform={`rotate(-90 ${size/2} ${size/2})`}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        fontSize="14" fontWeight="600" fill="#1a1a2e" fontFamily="Syne,sans-serif">
        {pct}%
      </text>
    </svg>
  )
}

const weekPlan = [
  { day: 'Pzt', activity: 'Dinle & 3 kez yaz', type: 'write' },
  { day: 'Sal', activity: 'Türkçe anlamı yaz', type: 'meaning' },
  { day: 'Çar', activity: 'Hece renklendir', type: 'colour' },
  { day: 'Per', activity: 'Kelime avı (kitap/TV)', type: 'hunt' },
  { day: 'Cum', activity: 'Mini dikte', type: 'dictation' },
  { day: 'C.t', activity: 'Flash kart turu', type: 'cards' },
]

const typeColors = {
  write: 'bg-blue-50 text-blue-800 border-blue-200',
  meaning: 'bg-purple-50 text-purple-800 border-purple-200',
  colour: 'bg-orange-50 text-orange-800 border-orange-200',
  hunt: 'bg-green-50 text-green-800 border-green-200',
  dictation: 'bg-red-50 text-red-800 border-red-200',
  cards: 'bg-yellow-50 text-yellow-800 border-yellow-200',
}

export default function Home() {
  const { stats, loaded } = useProgress()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const s5 = stats(year5Words)
  const s6 = stats(year6Words)
  const sAll = stats(allWords)

  const today = new Date().getDay()
  const todayPlan = weekPlan[today === 0 ? 6 : today - 1]

  return (
    <>
      <Head><title>Kelime Sistemi — Year 5/6</title></Head>
      <div className="min-h-screen" style={{ background: 'var(--paper)' }}>

        {/* Header */}
        <header className="border-b border-stone-200 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif', fontWeight: 700 }}>
              📚 Kelime Sistemi
            </h1>
            <span className="text-sm" style={{ color: 'var(--mist)' }}>Year 5 & 6</span>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

          {/* Today's task */}
          {mounted && todayPlan && (
            <div className="card animate-slide-up" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
              <p className="text-xs font-medium uppercase tracking-widest mb-2 opacity-60" style={{ fontFamily: 'Syne, sans-serif' }}>Bugünkü görev</p>
              <p className="text-2xl font-bold mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>{todayPlan.day} — {todayPlan.activity}</p>
              <p className="text-sm opacity-60">10–15 dakika yeterli</p>
              <div className="mt-4 flex gap-3 flex-wrap">
                <Link href="/tracker" className="px-4 py-2 rounded-full text-sm font-medium bg-white/15 hover:bg-white/25 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Kelime listesi →
                </Link>
                <Link href="/game" className="px-4 py-2 rounded-full text-sm font-medium bg-white/15 hover:bg-white/25 transition-colors" style={{ fontFamily: 'Syne, sans-serif' }}>
                  Flash kart oyunu →
                </Link>
              </div>
            </div>
          )}

          {/* Progress overview */}
          {mounted && (
            <div className="grid grid-cols-3 gap-4 animate-slide-up">
              {[
                { label: 'Tümü', s: sAll, color: '#1a1a2e' },
                { label: 'Year 5', s: s5, color: '#4a7c59' },
                { label: 'Year 6', s: s6, color: '#8b9bb4' },
              ].map(({ label, s, color }) => (
                <div key={label} className="card flex flex-col items-center gap-2 py-5">
                  <ProgressRing pct={s.pct} color={color} />
                  <p className="text-xs font-medium" style={{ color: 'var(--mist)', fontFamily: 'Syne, sans-serif' }}>{label}</p>
                  <p className="text-xs" style={{ color: 'var(--mist)' }}>{s.known}/{s.total} öğrenildi</p>
                </div>
              ))}
            </div>
          )}

          {/* Navigation cards */}
          <div className="grid grid-cols-2 gap-4 animate-slide-up">
            {[
              { href: '/tracker', emoji: '🗂', title: 'Kelime takibi', desc: `${allWords.length} kelimenin tümü` },
              { href: '/game', emoji: '🎮', title: 'Flash kart', desc: 'Biliyorum / bilmiyorum' },
              { href: '/plan', emoji: '📅', title: 'Haftalık plan', desc: '21 haftalık yol haritası' },
              { href: '/tips', emoji: '💡', title: 'Aktivite fikirleri', desc: '7 oyun & teknik' },
            ].map(({ href, emoji, title, desc }) => (
              <Link key={href} href={href} className="card hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group">
                <div className="text-2xl mb-3">{emoji}</div>
                <p className="font-medium text-base mb-0.5" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</p>
                <p className="text-sm" style={{ color: 'var(--mist)' }}>{desc}</p>
              </Link>
            ))}
          </div>

          {/* Weekly schedule */}
          <div className="card animate-slide-up">
            <h2 className="font-bold text-base mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Haftalık ritim</h2>
            <div className="space-y-2">
              {weekPlan.map(({ day, activity, type }, i) => (
                <div key={day} className={`flex items-center gap-3 px-3 py-2 rounded-xl border text-sm ${typeColors[type]} ${i === (today === 0 ? 6 : today - 1) ? 'ring-2 ring-offset-1 ring-stone-400' : ''}`}>
                  <span className="font-bold w-8 shrink-0" style={{ fontFamily: 'DM Mono, monospace' }}>{day}</span>
                  <span>{activity}</span>
                  {i === (today === 0 ? 6 : today - 1) && <span className="ml-auto text-xs font-semibold">bugün</span>}
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  )
}
