import Head from 'next/head'
import Link from 'next/link'

const phases = [
  {
    title: 'Aşama 1 — Tanışma', weeks: '1–2. haftalar', color: '#EEEDFE', border: '#AFA9EC', text: '#3C3489',
    days: [
      { day: 'Pzt', activity: 'Dinle & tekrarla', detail: 'Kelimeyi sesli söyle, 3 kez yaz' },
      { day: 'Sal', activity: 'Anlam çalışması', detail: 'Türkçe anlamını yaz' },
      { day: 'Çar', activity: 'Hece vurgula', detail: 'Tuzak bölümünü renkle işaretle' },
      { day: 'Per', activity: 'Resim bağlantısı', detail: 'Kelimeyi çizerek veya görselle bağla' },
      { day: 'Cum', activity: 'Mini dikte', detail: 'Ebeveyn okur, çocuk yazar' },
      { day: 'C.t', activity: 'Kart turu', detail: 'Bildiğini yeşile, bilmediğini sarıya koy' },
    ]
  },
  {
    title: 'Aşama 2 — Pekiştirme', weeks: '3–4. haftalar', color: '#E1F5EE', border: '#5DCAA5', text: '#085041',
    days: [
      { day: 'Pzt', activity: 'Yeni 5 + zor 2', detail: 'Önceki haftanın zorlarını tekrar et' },
      { day: 'Sal', activity: 'Cümle yaz', detail: 'Kelimeyi sözlü veya yazılı cümlede kullan' },
      { day: 'Çar', activity: 'Kelime avı', detail: 'Kitap/TV/etiket: bu haftaki kelimeleri bul' },
      { day: 'Per', activity: 'Grup oyunu', detail: 'Ortak harf/ek pattern bul (ör: "-tion"lar)' },
      { day: 'Cum', activity: 'Dikte + analiz', detail: 'Hataları 5 kez doğru yaz' },
      { day: 'C.t', activity: 'İlerleme ölç', detail: 'Uygulamada kelimeleri işaretle' },
    ]
  },
]

const milestones = [
  { week: '1–5', goal: '25 kelime tanıma', note: 'Year 5 başlangıç' },
  { week: '6–10', goal: '50 kelime tanıma', note: 'Year 5 bitiş hedefi' },
  { week: '11–16', goal: '75 kelime tanıma', note: 'Year 6 başlangıç' },
  { week: '17–21', goal: '103 kelime öğrenildi', note: 'Tam tamamlama' },
]

export default function Plan() {
  return (
    <>
      <Head><title>Haftalık Plan</title></Head>
      <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <header className="border-b border-stone-200 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/" className="text-sm" style={{ color: 'var(--mist)' }}>← Ana sayfa</Link>
            <h1 className="font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Haftalık plan</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">

          <div className="card" style={{ background: 'var(--ink)', color: 'var(--paper)' }}>
            <p className="text-xs uppercase tracking-widest opacity-60 mb-1" style={{ fontFamily: 'Syne, sans-serif' }}>Genel hedef</p>
            <p className="text-xl font-bold" style={{ fontFamily: 'Syne, sans-serif' }}>103 kelime · 21 hafta · günde 10–15 dk</p>
            <p className="text-sm mt-1 opacity-60">Haftada 5 kelime → yaklaşık 5 ay</p>
          </div>

          {phases.map(phase => (
            <div key={phase.title} className="card space-y-3">
              <div>
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: phase.color, color: phase.text, border: `1px solid ${phase.border}`, fontFamily: 'Syne, sans-serif' }}>
                  {phase.weeks}
                </span>
                <h2 className="font-bold text-base mt-2" style={{ fontFamily: 'Syne, sans-serif' }}>{phase.title}</h2>
              </div>
              <div className="space-y-1.5">
                {phase.days.map(({ day, activity, detail }) => (
                  <div key={day} className="flex items-start gap-3 py-2 border-b border-stone-100 last:border-0">
                    <span className="font-mono text-xs font-medium w-8 pt-0.5 shrink-0" style={{ color: 'var(--mist)' }}>{day}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>{activity}</p>
                      <p className="text-xs mt-0.5" style={{ color: 'var(--mist)' }}>{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Milestones */}
          <div className="card">
            <h2 className="font-bold text-base mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Kilometre taşları</h2>
            <div className="space-y-3">
              {milestones.map(({ week, goal, note }, i) => (
                <div key={i} className="flex items-center gap-4">
                  <span className="font-mono text-xs px-2 py-1 rounded shrink-0" style={{ background: '#f5f0e8', color: 'var(--mist)', minWidth: 50, textAlign: 'center' }}>
                    H{week}
                  </span>
                  <div className="flex-1 h-0.5 rounded-full" style={{ background: '#e8e3da' }}>
                    <div className="h-full rounded-full" style={{ width: `${(i + 1) * 25}%`, background: 'var(--sage)' }} />
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium" style={{ fontFamily: 'Syne, sans-serif' }}>{goal}</p>
                    <p className="text-xs" style={{ color: 'var(--mist)' }}>{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs text-center pb-4" style={{ color: 'var(--mist)' }}>
            Zor kelimelere ek hafta tanımaktan çekinme — ritim önemli, hız değil.
          </p>
        </main>
      </div>
    </>
  )
}
