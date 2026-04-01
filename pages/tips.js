import Head from 'next/head'
import Link from 'next/link'

const tips = [
  {
    emoji: '🎨',
    title: 'Hece renklendirme',
    body: 'Zor kelimelerdeki "tuzak" bölümünü renkli kalemle işaretle. Örn: acCOMModate — büyük harfli kısmı farklı renkle yaz. Görsel bellek ezberi azaltır.',
    tag: 'En etkili',
    tagColor: '#4a7c59',
  },
  {
    emoji: '🃏',
    title: 'Fiziksel flash kart',
    body: 'Ön yüz: İngilizce kelime. Arka yüz: Türkçe anlam + örnek cümle + tuzak notu. Kartondan elle yazmak bile başlı başına bir öğrenme tekniği.',
    tag: 'Klasik',
    tagColor: '#8b9bb4',
  },
  {
    emoji: '📺',
    title: 'Kelime avı',
    body: 'TV altyazılarında, okunan kitapta, market rafında bu haftaki kelimeleri aramak. Gerçek bağlamda görmek kalıcılaştırır — listeden ezbere kıyasla 3× daha iyi.',
    tag: 'Bağlam',
    tagColor: '#8b9bb4',
  },
  {
    emoji: '🎯',
    title: 'Dikte oyunu',
    body: 'Ebeveyn kelimeyi cümlede kullanarak okur: "The restaurant was very crowded." Çocuk sadece hedef kelimeyi yazar. Nokta atışı pratik.',
    tag: 'Günlük',
    tagColor: '#8b9bb4',
  },
  {
    emoji: '❌',
    title: 'Kasıtlı yanlış yazma',
    body: 'Sen yanlış yaz, çocuk hataları bulsun: "accomodate" yerine "accommodate" hangisi doğru? Hata fark etmek doğru yazımı çok güçlü pekiştirir.',
    tag: 'Oyun',
    tagColor: '#d4a843',
  },
  {
    emoji: '🔗',
    title: 'Desen gruplaması',
    body: 'Kelimeleri ortak özelliğe göre grupla: "-tion ile bitenler", "çift harf içerenler (mm, ss, rr)", "sessiz harf içerenler". Desen görmek ezberi gereksiz kılar.',
    tag: 'Akıllı strateji',
    tagColor: '#4a7c59',
  },
  {
    emoji: '⏱',
    title: '10 dakika kuralı',
    body: 'Her gün aynı saatte, kısa tut. Yorgunken 30 dakika yerine dinç kafayla 10 dakika çok daha etkili. Düzenlilik, süre uzunluğundan önemli.',
    tag: 'Alışkanlık',
    tagColor: '#8b9bb4',
  },
]

const patternGroups = [
  { pattern: 'Çift harf', words: ['accommodate', 'aggressive', 'committee', 'embarrass', 'interrupt', 'marvellous', 'necessary', 'opportunity', 'correspond'] },
  { pattern: '-tion / -sion', words: ['competition', 'explanation', 'profession', 'pronunciation'] },
  { pattern: 'Sessiz harf', words: ['bargain', 'foreign', 'government', 'muscle', 'vehicle', 'yacht', 'soldier'] },
  { pattern: '-ough / -eigh', words: ['thorough', 'neighbour', 'eight'] },
]

export default function Tips() {
  return (
    <>
      <Head><title>Aktivite Fikirleri</title></Head>
      <div className="min-h-screen" style={{ background: 'var(--paper)' }}>
        <header className="border-b border-stone-200 bg-white/60 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
            <Link href="/" className="text-sm" style={{ color: 'var(--mist)' }}>← Ana sayfa</Link>
            <h1 className="font-bold text-lg" style={{ fontFamily: 'Syne, sans-serif' }}>Aktivite fikirleri</h1>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-4">

          {tips.map(({ emoji, title, body, tag, tagColor }) => (
            <div key={title} className="card space-y-2">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{emoji}</span>
                  <h2 className="font-bold text-base" style={{ fontFamily: 'Syne, sans-serif' }}>{title}</h2>
                </div>
                <span className="text-xs px-2 py-1 rounded-full shrink-0" style={{ background: tagColor + '20', color: tagColor, border: `1px solid ${tagColor}40`, fontFamily: 'Syne, sans-serif' }}>
                  {tag}
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>{body}</p>
            </div>
          ))}

          {/* Pattern groups */}
          <div className="card mt-6">
            <h2 className="font-bold text-base mb-4" style={{ fontFamily: 'Syne, sans-serif' }}>Desen grupları — nereden başlamalı?</h2>
            <div className="space-y-3">
              {patternGroups.map(({ pattern, words }) => (
                <div key={pattern}>
                  <p className="text-xs font-medium uppercase tracking-wider mb-1.5" style={{ color: 'var(--mist)', fontFamily: 'Syne, sans-serif' }}>{pattern}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {words.map(w => (
                      <span key={w} className="text-xs px-2.5 py-1 rounded-full font-mono" style={{ background: '#f5f0e8', color: 'var(--ink)', border: '1px solid #e8e3da' }}>
                        {w}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>
      </div>
    </>
  )
}
