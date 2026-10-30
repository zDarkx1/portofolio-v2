# Alrizky — Digital Garden

Portofolio editorial dengan visual ASCII Canvas2D, cerita berbasis scroll, dan konten Inggris/Indonesia. Dibangun di Next.js 16 App Router, React 19, TypeScript, Tailwind 4, GSAP, dan Lenis.

## Menjalankan

Gunakan Node.js 22.19+ dengan dukungan native TypeScript stripping untuk test.

```powershell
npm ci
npm run dev
```

Untuk preview production:

```powershell
npm run build
npm run start
```

Port default 3000. Tambahkan `-- --hostname 127.0.0.1 --port 3011` pada perintah dev/start untuk port khusus. Bila output Next terkunci di Windows, hentikan dulu server yang memakai checkout tersebut sebelum membangun ulang.

## Pengalaman situs

- Hero botanical ASCII dengan pointer parallax dan animasi huruf.
- About dengan foto asli dan transisi dari ASCII di desktop.
- Selected work: Pactra dan EventTwin, kartu sticky, dan studi kasus lengkap.
- Teknologi, enam pengalaman lomba/hackathon/komunitas, serta pendidikan yang masih ditandai sebagai data contoh.
- Partikel ASCII dengan koneksi pointer dan ripple saat klik; ASCII lab dihapus.
- Glow/tilt kartu, parallax screenshot, reveal judul, scan foto, dan highlight timeline.
- Kontak dan footer halftone interaktif. Artikel teknis tetap tersedia di `/articles`.
- Bahasa ID/EN yang tersimpan lokal, keyboard menu, reduced motion, sitemap, dan metadata halaman.
- Light/dark mode mengikuti sistem atau pilihan tersimpan, dengan transisi circular reveal.
- Smooth wheel scrolling, magnetic buttons, dan idle motion yang berhenti di luar viewport.
- Komponen React Bits aktif: GradientASCII, TiltedCard, RefineFrame, dan BranchedMenu. Detail adaptasi ada di `src/components/react-bits/README.md`.
- Navbar compact di tengah dari lampiran Hyperiux: header fixed 420 px, panel ringkas dengan timeline GSAP yang dapat dibalik, preview proyek asli, focus trap, Escape/klik di luar, dan scroll lock Lenis.
- Monogram A asli tersedia di `public/branding` sebagai SVG/PNG. Ubah `src/lib/brand.ts`, lalu jalankan `npm run branding:sync` untuk memperbarui logo dan favicon.
- Logo brand asli pada teknologi, proyek, pengalaman, menu, dan sosial. SVG terpilih disinkronkan lewat `npm run icons:sync`; sumber aset tercatat di `public/brands/README.md`.

## Struktur

```text
src/app/                 Routes, metadata, global styles
src/components/          Editorial page sections and shared layout
src/components/ui/       ASCII Canvas, supplied halftone footer, language switcher
src/lib/data.ts          Identity and verified project data
src/lib/project-copy.ts  Bilingual project context
src/lib/field-notes.ts    Bilingual article bodies
src/lib/resume.ts        Real experience and sample education
public/experience/      Organizer logos and asset provenance
src/app/scene-effects.css  Orbit, hover, reveal, and idle effects
src/lib/ascii-engine.ts  Raster sampling, primitives, and effects
public/                  Original portrait, botanical source, project screenshots
tests/                   Renderer math, project content, HTTP route checks
```

Lihat [CONTENT-GUIDE.md](./CONTENT-GUIDE.md) untuk mengganti isi dan memahami sumber aset. Pengalaman memakai kegiatan yang diberikan pemilik; pendidikan masih berupa data contoh di `src/lib/resume.ts`. Sumber logo dan penyesuaian dark/light dicatat di [public/experience/README.md](./public/experience/README.md). Label pendidikan dapat dihapus lewat `isSample` setelah data asli diisi. `components.json` memetakan struktur shadcn ke `src/components/ui`.

## Validasi

```powershell
npm run lint
npm test
npm run build
# Jalankan server, lalu di terminal lain:
$env:TEST_BASE_URL = 'http://127.0.0.1:3000'
npm run test:pages
```

Enam test data/renderer dan tujuh test HTTP memeriksa konten serta route, termasuk enam pengalaman asli di homepage dan About. Pemeriksaan tampilan dan interaksi tetap dilakukan di browser, termasuk viewport mobile.

## Spotify (opsional)

Route `/api/now-playing` tetap tersedia untuk pengembangan selanjutnya. Secret tidak diperlukan untuk situs utama. Setup opsional ada di [SPOTIFY_SETUP.md](./SPOTIFY_SETUP.md); jangan masukkan secret ke konten atau kode client.

## Referensi

Komposisi mengambil inspirasi dari [kitna.my.id](https://kitna.my.id/) dengan identitas, susunan visual, dan copy tersendiri. Ink Garden diimplementasikan ulang dari resep serta sumber foto [21st.dev](https://21st.dev/community/ascii) yang diberikan pengguna. Footer diadaptasi dari komponen React lampiran pengguna.
