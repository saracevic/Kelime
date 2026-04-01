# 📚 Kelime Sistemi — Year 5/6

İngilizce National Curriculum Year 5 & 6 kelimelerini çalışmak için kişisel web uygulaması.

## Özellikler

- **103 kelime** — Year 5 (52) + Year 6 (51), Türkçe anlamları ve "tuzak" notlarıyla
- **Flash kart oyunu** — Biliyorum / bilmiyorum sistemi
- **İlerleme takibi** — Kelime durumlarını işaretle, grafik ile ölç
- **Haftalık plan** — 21 haftalık yol haritası
- **Aktivite fikirleri** — 7 oyun & öğrenme tekniği
- **Veriler tarayıcıda kalır** — localStorage, hesap gerekmez

## Kurulum (yerel)

```bash
npm install
npm run dev
# http://localhost:3000 adresi açılır
```

## GitHub Pages'e deploy etme

### 1. Repoyu oluştur
GitHub'da yeni bir **public** repo oluştur (ör: `kelime-sistemi`).

### 2. Kodu yükle
```bash
git init
git add .
git commit -m "ilk yükleme"
git remote add origin https://github.com/KULLANICI_ADIN/kelime-sistemi.git
git push -u origin main
```

### 3. GitHub Pages ayarla
- Repo → **Settings** → **Pages**
- Source: **GitHub Actions** seç
- Kaydet

### 4. İlk deploy
`main` branch'e push yapınca GitHub Actions otomatik çalışır.
Birkaç dakika sonra `https://KULLANICI_ADIN.github.io/kelime-sistemi` adresinde yayına girer.

## Teknik detaylar

- **Next.js 14** — static export (`next export`) ile GitHub Pages'e uyumlu
- **Tailwind CSS** — utility-first styling
- **localStorage** — hesap veya sunucu gerektirmeden ilerlemeyi kaydeder
- **GitHub Actions** — her push'ta otomatik build & deploy

## Kişiselleştirme

Kelimeleri veya Türkçe anlamları değiştirmek için `data/words.js` dosyasını düzenle.
