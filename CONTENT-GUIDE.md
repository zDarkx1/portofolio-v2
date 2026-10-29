# Mengisi portofolio

Identitas, foto, kontak, Pactra, dan EventTwin memakai data repo sebelumnya. Sesuai permintaan pemilik, pendidikan dan pengalaman memakai data dummy yang ditandai "DATA CONTOH" / "SAMPLE DATA". Nama perusahaan dan sekolah masih berupa placeholder; jabatan, jurusan, tugas, serta periode adalah contoh, bukan riwayat yang telah diverifikasi.

## Lokasi konten

| Konten | File |
| --- | --- |
| Nama, foto, tautan sosial, data proyek asli | `src/lib/data.ts` |
| Homepage, about, teknologi, dan efek scroll | `src/components/digital-garden.tsx` |
| Partikel, koneksi pointer, dan ripple klik | `src/components/ui/ambient-field.tsx` |
| Orbit, glow, tilt, dan animasi dekorasi | `src/app/scene-effects.css` |
| Lima komponen React Bits dari lampiran | `src/components/react-bits/` |
| Warna dan layout adapter React Bits | `src/app/react-bits-integration.css` |
| Pemilih kelompok teknologi | `src/components/technology-explorer.tsx` |
| Status muat/error gambar proyek | `src/components/refined-project-image.tsx` |
| Komponen logo brand dan label | `src/components/brand-icon.tsx` |
| SVG brand terpilih dan sumber aslinya | `src/lib/brand-icons.ts` |
| Generator SVG dari Simple Icons | `scripts/sync-brand-icons.mjs` |
| Data contoh pendidikan dan pengalaman | `src/lib/resume.ts` |
| Tampilan pendidikan dan pengalaman | `src/components/resume-sections.tsx` |
| Terjemahan dan konteks studi kasus | `src/lib/project-copy.ts` |
| Tiga catatan teknis awal, ID dan EN | `src/lib/field-notes.ts` |
| Footer dan tautan | `src/components/footer.tsx` |
| Bahasa dan penyimpanan preferensi | `src/components/language-provider.tsx` |
| Pengaturan resep dan renderer ASCII | `src/lib/ascii-engine.ts` |
| Lifecycle, resize, visibility, reduced motion Canvas | `src/components/ui/ascii-canvas.tsx` |

Ganti `experience.entries` dan `education.entries` di `src/lib/resume.ts` dengan data asli. Setelah seluruh entri dalam masing-masing bagian benar, ubah `isSample` menjadi `false` untuk bagian tersebut. Setiap entri memiliki versi ID dan EN. Tidak ada tautan CV sebelum berkasnya tersedia.

## Visual & komponen

Logo brand dipakai pada hero/ticker, teknologi, tag proyek, pengalaman, menu, sosial, dan footer. SVG berasal dari Simple Icons 16.35.0; hanya 16 path terpilih yang masuk aplikasi. Package katalog lengkap menjadi dev dependency dan dapat disinkronkan dengan `npm run icons:sync`. Lenis dan Foundry memakai PNG dari situs resminya, sementara LinkedIn memakai SVG lokal yang sudah ada. URL sumber aset dicatat di `src/lib/brand-icons.ts` dan `public/brands/README.md`. Nama brand tetap tampil; ikon dekoratif tidak menambah pengumuman screen reader. Logo hitam/putih mengikuti warna teks pada kedua tema.

- Arah visual: kertas hangat, tinta hijau gelap, aksen terracotta, tipografi editorial, anotasi monospace.
- Referensi komposisi: https://kitna.my.id/ — identitas, copy, layout, dan susunan detail tidak disalin.
- Foto botanical resep Ink Garden: `public/ink-garden.webp`, dari URL aset yang diberikan pengguna (`https://21st.dev/ascii-editor/demos/generated/ref-029.webp`). Renderer dibuat ulang dengan Canvas2D.
- Komponen footer berasal dari dua lampiran identik pengguna. Disimpan di `src/components/ui/halftone-wordmark-footer.tsx`, dengan label terjemahan dan penyesuaian lifecycle.
- Kedua lampiran berisi footer, sehingga switcher bahasa dibuat tersendiri di `src/components/ui/language-switcher.tsx`.
- Tailwind 4 dan TypeScript sudah terpasang. `components.json` menyediakan alias shadcn; komponen reusable ada di `src/components/ui`, global styling di `src/app/globals.css`. Tidak perlu scaffold ulang proyek.

## Interaksi scroll

GradientASCII menjadi latar hero; TiltedCard membungkus foto; RefineFrame menampilkan proses muat screenshot; BranchedMenu memilih kelompok teknologi. Header kini memakai lampiran immersive fullscreen Hyperiux di `src/components/ui/immersive-full-screen-nav.tsx`. Panel memuat enam tautan section, preview Pactra/EventTwin, dan sosial dengan logo asli. Kontrol bahasa dan tema ada di header. Focus trap, Escape, dan scroll lock terhubung dengan Lenis.

Hero botanical memiliki parallax ringan. Label FERN/ASCII dan PERSONAL PORTFOLIO, frame Canvas 2D, ticker teknologi, deskripsi teknologi hero, dan ornamen orbit sudah dihapus. Potret beralih dari ASCII ke foto di desktop, kartu proyek memakai sticky stacking, dan timeline pengalaman memiliki garis progress. GSAP memakai matchMedia dan cleanup saat navigasi atau perubahan bahasa. Pengaturan reduced-motion menghilangkan gerak dan mempertahankan konten. Manifesto, proses generik, dan daftar catatan di homepage sudah dihapus agar isi lebih langsung.

Section ASCII lab dan seluruh kontrolnya sudah dihapus sesuai permintaan pemilik. Renderer Ink Garden tetap dipakai pada hero dan foto. Hero dan portrait memakai variasi monochrome agar menyatu dengan komposisi. Canvas dibatasi DPR dan frame rate, sampling dilakukan ketika sumber/ukuran berubah, dan animasi berhenti di luar viewport atau saat tab tersembunyi.

Lapisan ambient memakai satu canvas dengan 48 partikel desktop / 20 mobile, target 30 fps, dan DPR maksimal 1.5. Pointer membentuk koneksi dan klik memunculkan ripple; listener tidak membatalkan aksi tautan/tombol. Gerak berhenti ketika tab tersembunyi, konten keluar layar, atau reduced motion aktif. Target frame rate bukan hasil benchmark perangkat. Orbit hero, sheen tombol, scan foto, dan halo teknologi memakai CSS dengan play-state berdasarkan visibilitas. Reveal, parallax, highlight timeline, dan tilt kartu memakai GSAP dengan cleanup saat navigasi atau perubahan bahasa.

Teks UI memakai `t(english, indonesia)`. Preferensi disimpan lokal dan atribut `html.lang` ikut berubah. Metadata/canonical masih menggunakan versi Inggris dan domain dari profil; sebelum deployment, konfirmasi domain tersebut. URL tidak berubah ketika bahasa diganti.

## Preview & validasi

```powershell
npm ci
npm run dev -- --hostname 127.0.0.1 --port 3011
npm run lint
npm test
npm run build
npm run start -- --hostname 127.0.0.1 --port 3012
# Terminal terpisah:
$env:TEST_BASE_URL = 'http://127.0.0.1:3012'
npm run test:pages
```

Node 22.19 atau runtime yang mendukung native TypeScript stripping digunakan untuk test. Route Spotify dipertahankan untuk pengembangan nanti; widget tidak menjadi konten utama homepage. Tidak ada dependency baru untuk efek Canvas atau footer.

## Catatan validasi 26 Oktober 2026

### Latar hero selebar layar

GradientASCII dipindahkan dari `.garden-hero.container` ke wrapper `.hero-scene` yang selebar halaman. Latar naik sebesar tinggi header (88 px desktop / 72 px mobile), sehingga mulai pada koordinat halaman x=0, y=0 dan berada di belakang navbar. Mask hanya memudarkan bagian bawah. Konten tetap memakai container; background tidak menambah lebar scroll.

Build/TypeScript, lint, dan 6 test HTTP lulus setelah perubahan. Browser mengukur latar desktop dari x=0/y=0 selebar sekitar 1265 px; mobile juga x=0/y=0 selebar sekitar 375 px. Light/dark diperiksa tanpa overflow horizontal atau error/warning console. Screenshot: `artifacts/portfolio-hero-fullwidth.jpg` dan `artifacts/portfolio-hero-fullwidth-mobile-light.jpg`.

### Logo brand asli

19 brand memakai mark aslinya: 16 SVG dari Simple Icons, PNG resmi Lenis/Foundry, dan SVG LinkedIn yang sudah tersedia. Penempatan meliputi hero/ticker, kelompok teknologi, tag proyek, timeline, menu, sosial, dan footer. Teks label dipertahankan; ikon dekoratif memakai `aria-hidden`.

Lint, production build/TypeScript, 6 test data/renderer, dan 6 test HTTP lulus. Browser memeriksa logo frontend pada light/dark (termasuk Next.js yang mengikuti warna tinta), kelompok backend dan motion, PNG Lenis yang berhasil dimuat, serta tujuh logo stack Pactra termasuk Foundry pada mobile. Tidak ditemukan overflow horizontal pada desktop 1280 px dan viewport mobile 390 × 844. Screenshot: `artifacts/portfolio-brand-icons-light.jpg` dan `artifacts/portfolio-brand-icons-dark.jpg`.

### Catatan validasi integrasi awal lima lampiran React Bits

Kelima komponen dipakai langsung pada halaman. Build/TypeScript, lint, 6 test data/renderer, dan 6 test HTTP lulus. Browser memverifikasi GradientASCII dengan renderer WebGL, buka/tutup CardNav dan Escape, tautan Pendidikan mobile pada offset sekitar 90 px, pergantian ID/EN serta light/dark, tiga pilihan BranchedMenu, TiltedCard dengan foto asli dan transform matrix3d, serta RefineFrame pada studi kasus Pactra sampai `complete` dan `data-resolved`.

Layout akhir dicek pada desktop 1280 px dan mobile 390 × 844 tanpa overflow horizontal. Viewport pengujian dikembalikan setelah pemeriksaan. Tidak ada error/warning console pada pemeriksaan aplikasi. Screenshot: `artifacts/portfolio-react-bits-hero.jpg`, `artifacts/portfolio-react-bits-portrait.jpg`, dan `artifacts/portfolio-react-bits-mobile.jpg`. Gambar proyek memakai status muat/error asli; gyroscope pada foto dinonaktifkan.

### Penghapusan lab dan penambahan efek visual

ASCII lab, mode selector, ukuran sel, pause, reset, dan penggantian foto di homepage dihapus. Hero, portrait, dan footer ASCII tetap tersedia. Nomor section dan metadata disesuaikan; tidak ada dependency baru.

Lint, build/TypeScript, 6 test data/renderer, dan 6 test HTTP lulus. Browser memverifikasi penghapusan lab, orbit hero berjalan saat terlihat dan paused di luar layar, highlight timeline, parallax screenshot, serta glow/tilt kartu pendidikan (transform matrix3d dan spotlight aktif). Desktop dan viewport 390 × 844 diperiksa pada light/dark tanpa overflow horizontal atau error/warning console. Screenshot baru: `artifacts/portfolio-effects-desktop.jpg`, `artifacts/portfolio-effects-mobile.jpg`, dan `artifacts/portfolio-effects-mobile-dark.jpg`.

### Perapian isi dan resume

Homepage kini berisi profil singkat, pengalaman, pendidikan, proyek, teknologi, dan kontak. Pengalaman dan pendidikan berada sebelum proyek, tersedia juga di `/about`, dan memiliki tautan header/footer. Label dummy mengikuti flag `isSample` per bagian di `src/lib/resume.ts`.

Validasi revisi: lint, production build/TypeScript, 6 test data/renderer, dan 6 test HTTP lulus. Browser ID/EN, light/dark, anchor pendidikan/pengalaman desktop, serta menu pendidikan pada viewport 390 × 844 diperiksa. Anchor terukur sekitar 106 px desktop dan 90 px mobile; tidak ada overflow horizontal atau error/warning console dalam pemeriksaan. Screenshot: `artifacts/portfolio-experience-light.jpg`, `artifacts/portfolio-education-dark.jpg`, dan `artifacts/portfolio-education-mobile.jpg`.

### Penyempurnaan tema dan gerak

`src/app/theme-motion.css` memuat palet light/dark serta idle keyframes. Next Themes memakai preferensi sistem pada kunjungan pertama, lalu menyimpan pilihan manual dengan key `alrizky-theme`. Tombol tema bilingual di header menggunakan circular reveal bila View Transitions tersedia, dan berpindah langsung untuk reduced motion.

Smooth scroll memakai Lenis 1.3.27, disinkronkan melalui ticker GSAP sesuai [panduan integrasi resmi](https://github.com/darkroomengineering/lenis#gsap-scrolltrigger). Implementasi ada di `src/components/motion-provider.tsx`. Scroll touch tetap native; roda mouse memakai interpolasi. Anchor pada halaman yang sama dan back-to-top memakai satu pengendali, dengan kompensasi header dan CSS scroll-padding. Event listener, ticker, dan instance dilepas saat unmount.

Idle meliputi simbol logo/hero, cursor terminal, tunas ASCII, glyph ambient dengan pointer parallax, ticker, ikon teknologi, simbol kontak, dan gelombang halftone footer. IntersectionObserver mengendalikan play-state CSS; tab tersembunyi dan reduced motion menghentikan gerak. Warna Canvas disampling dan dicache saat sumber/ukuran berubah. Target refresh ASCII dinaikkan dari sekitar 20 ke 40 fps; footer dibatasi 30 fps. Ini target renderer, bukan hasil benchmark perangkat.

Palet Canvas memakai token CSS dan diperbarui saat tema berubah tanpa memuat ulang foto. Footer memakai token `--footer-bg`, `--footer-ink`, dan `--accent`.

Pemeriksaan penyempurnaan ini: light/dark tersimpan setelah reload, tinta ASCII mengikuti tema, idle hero berstatus running sedangkan ikon di luar layar paused, serta menu ponsel tidak menggeser layout. Target anchor terukur sekitar 106 px di desktop dan 90 px di mobile (header + 18 px). Navigasi beranda ke studi kasus dibuka pada scroll 0. Build/TypeScript dan lint lulus; enam test data/renderer serta enam test HTTP lulus. Screenshot tema tersimpan sebagai `artifacts/portfolio-light-motion.jpg` dan `artifacts/portfolio-dark-motion.jpg`.

- Production build dan TypeScript berhasil; 14 halaman statis/generated dihasilkan.
- ESLint bersih, termasuk empat error baseline dari komponen lama yang telah diperbaiki.
- Enam test data/renderer dan enam test HTTP lulus.
- Semua 25 pilihan mode di-smoke-test melalui browser tanpa error console.
- ID/EN, penyimpanan bahasa ketika pindah halaman, artikel, studi kasus, pause, ukuran sel, pergantian foto, reset, menu mobile/Escape, dan salin email diperiksa di browser.
- Layout diperiksa pada viewport desktop default dan override mobile 390 × 844. Tidak ditemukan overflow horizontal dalam pengukuran lebar dokumen. Override viewport dikembalikan setelah pengujian.
- Screenshot lokal disimpan di `artifacts/`. Pemeriksaan mobile memakai viewport browser, bukan perangkat fisik. Belum ada pengukuran Core Web Vitals produksi atau validasi deployment publik.

## Navbar compact dan monogram A

Navbar memakai lampiran Hyperiux, diadaptasi di `src/components/ui/immersive-full-screen-nav.tsx`; tautan dan konten ada di `src/components/site-header.tsx`, styling di `src/app/immersive-nav.css`. Bar fixed memiliki lebar maksimum 420 px di tengah, dengan panel 660 px di bawahnya. Spacer 88 px desktop / 72 px mobile menjaga posisi background hero. Scroll lock hanya mengubah overflow elemen html; body tidak dibuat scroll container baru. Tombol tutup tetap terjangkau setelah scroll halaman. Satu timeline GSAP dapat diputar maju/mundur agar klik cepat tidak meninggalkan callback animasi lama. Pada layar kecil, label tidak terpotong dan panel dapat digulir. Semua section utama dapat diakses, dengan preview proyek asli, sosial, ID/EN, dan pengaturan tema. Navigasi section menunggu animasi tutup selesai, kemudian memakai scroll controller Lenis yang sama dengan halaman.

Logo A geometris hitam berasal dari `src/lib/brand.ts` dan dipakai oleh `BrandMark`. Ekspor SVG/PNG transparan tersedia di `public/branding`; `npm run branding:sync` memperbarui ekspor, favicon, ikon SVG aplikasi, dan Apple icon. Header menyesuaikan warna logo pada tema gelap.

Validasi integrasi awal 2026-10-29: production build/TypeScript dan lint komponen baru lulus, 12 tes data/renderer/HTTP lulus, dan lima endpoint aset branding mengembalikan HTTP 200 dengan tipe gambar yang benar. Browser kembali tersedia pada pemeriksaan perbaikan navbar: bug header keluar viewport direproduksi dari posisi scroll, lalu diperbaiki. Delapan klik toggle, double-click cepat, Escape, klik di luar, focus trap Tab/Shift+Tab, dan navigasi Pendidikan telah diperiksa. Tema terang/gelap dan viewport desktop 1280 px serta mobile 390 px diperiksa tanpa overflow horizontal.

Validasi akhir navbar compact: production build/TypeScript, lint, 6 tes data/renderer, dan 6 tes HTTP lulus. Pada viewport 320 × 568, panel dapat digulir tanpa memindahkan tombol tutup dan tanpa overflow horizontal. Build produksi juga diperiksa dari posisi scroll sekitar 1463 px; tombol tutup tetap pada y=22 px. Background hero tetap bermula di x=0, y=0. Screenshot produksi: `artifacts/portfolio-compact-navbar.png`.
