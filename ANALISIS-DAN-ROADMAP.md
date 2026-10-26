# Analisis dan roadmap portofolio Alrizky

Tanggal audit: 26 Oktober 2026 (Asia/Jakarta).
Repository: https://github.com/zDarkx1/portofolio-v2
Baseline: `main`, commit `380c41b6d1af72188752d83b32e368dfe72f6332`.

Catatan: dokumen ini merekam audit baseline sebelum redesign. Implementasi dan validasi terbaru dijelaskan di `README.md` dan `CONTENT-GUIDE.md`.

Dokumen ini menjadi acuan pengembangan berikutnya. Audit ini menambahkan dokumentasi saja; kode aplikasi dan konten profil belum diubah. Rekomendasi adalah usulan, bukan fitur yang sudah selesai dikerjakan.

## Penilaian utama

Fondasi visual sudah konsisten: layout sempit yang mudah dibaca, tipografi Geist, tema terang/gelap, animasi, dan screenshot proyek asli. Halaman Pactra dan EventTwin sudah memberi bukti karya yang jauh lebih berguna daripada daftar teknologi saja.

Hambatan terbesar saat ini adalah isi dan urutan informasi. Beranda hanya memperkenalkan nama, tagline umum, kontak, dan Spotify. Pengunjung harus membuka navigasi Projects untuk menemukan karya. About dan Articles masih kosong. Grafik kontribusi terlihat seperti bukti aktivitas GitHub, tetapi isinya pola deterministik buatan.

Arah yang disarankan: portofolio personal developer yang cepat menjelaskan kemampuan, menunjukkan bukti melalui studi kasus, dan memudahkan kontak. Identitas visual minimalis yang ada bisa dipertahankan. Target spesifik (rekrutmen, freelance, atau personal brand) belum ditentukan pengguna.

## Peta teknis

| Bagian | Kondisi sekarang |
| --- | --- |
| Framework | Next.js 16.2.10 App Router, React 19.2.4, TypeScript strict |
| Styling | Tailwind CSS 4, token warna CSS, next-themes |
| Animasi | GSAP + ScrollTrigger, OGL/WebGL SideRays, SVG glass, View Transitions |
| Data | Konfigurasi dan konten statis dalam `src/lib/data.ts` |
| Halaman | Home, Projects, detail proyek, About, Articles, detail artikel |
| Backend | Route `/api/now-playing`; belum ada CMS/database untuk konten |
| Pengujian | Node test runner: validasi dua proyek dan tiga test HTTP halaman |
| Dokumentasi | README masih bawaan create-next-app; setup Spotify terpisah |
| Otomasi | Tidak ditemukan workflow CI dalam checkout yang diaudit |

Halaman statis diprerender saat build. Detail proyek memakai `generateStaticParams` dan slug tidak dikenal ditangani melalui `notFound`. Secret Spotify dibaca dalam modul `server-only`; browser mengambil data melalui route aplikasi sendiri.

## Temuan dan prioritas

### P1 — Grafik kontribusi memberi kesan data GitHub asli

`src/components/contribution-graph.tsx` menghasilkan intensitas lewat fungsi hash `level(week, day)`. Tidak ada pengambilan aktivitas GitHub. `src/components/footer.tsx` memasangnya di seluruh halaman dengan judul Contribution Graph.

Tindak lanjut: ambil data GitHub sebenarnya di server dengan cache dan fallback jujur, atau lepaskan grafik dari versi publik. Selama memakai contoh, beri label eksplisit sebagai demo. Jangan mengarang jumlah kontribusi.

### P1 — Beranda belum menunjukkan bukti kemampuan

`src/app/page.tsx` hanya memuat HeroIntro dan NowPlaying. Pactra dan EventTwin sudah tersedia dalam data, tetapi tidak ditampilkan di beranda. Tagline belum menjelaskan jenis masalah yang diselesaikan atau keunggulan yang paling ingin ditonjolkan.

Tindak lanjut: tambahkan Selected Projects setelah hero, CTA View Projects, ringkasan keahlian yang didukung karya, dan ajakan kontak. Spotify menjadi detail personal setelah konten utama. Tulis positioning dengan fakta yang disetujui pengguna.

### P1 — About dan Articles belum berisi konten

`src/app/about/page.tsx` menampilkan Coming soon. Halaman Articles selalu menampilkan empty state, belum membaca array artikel. Detail artikel masih memiliki body placeholder; menambah data artikel saja belum membentuk sistem publikasi lengkap.

`src/lib/data.ts` juga masih menyimpan persona John, contoh perusahaan, pengalaman, dan bio template. Data tersebut saat ini tidak dirender oleh About; jangan menyebutnya pengalaman pengguna atau mengaktifkannya tanpa verifikasi.

Tindak lanjut: isi About dengan bio faktual, fokus keahlian, perjalanan belajar/kerja, dan kontak. Tunda tampilan Articles sampai ada tulisan, atau bangun rendering konten nyata sebelum menampilkannya sebagai fitur aktif.

### P1 — Baseline lint gagal

`npm run lint` menghasilkan empat error:

- `GlassSurface.tsx:164`: `react-hooks/set-state-in-effect`.
- `GlassSurface.tsx:164`: `react-hooks/immutability`, fungsi `supportsSVGFilters` diakses sebelum deklarasi menurut aturan lint.
- `portal.tsx:12`: `react-hooks/set-state-in-effect`.
- `animated-theme-toggler.tsx:24`: `react-hooks/set-state-in-effect`.

Build tetap berhasil. Ini berarti build sukses belum menjadi bukti bahwa seluruh pemeriksaan kualitas lulus. Perbaiki pola lifecycle/hydration sesuai kebutuhan komponen; hindari mematikan aturan secara global untuk membuat hasil hijau.

### P2 — Studi kasus masih bisa menunjukkan kontribusi pribadi lebih kuat

Detail proyek sudah memiliki overview, highlights, stack, screenshot, repository, dan live link. Belum ada bidang terstruktur untuk peran pribadi, periode, masalah, keputusan arsitektur, tantangan, hasil, dan pelajaran.

Tindak lanjut: perluas tipe Project dengan bidang tersebut sesuai kebutuhan. Gunakan bukti yang dapat diverifikasi. Jangan mengarang metrik pengguna, performa, pendapatan, penghargaan, atau status produksi. Pertahankan penjelasan keterbatasan Pactra/testnet yang sudah ada.

### P2 — SEO belum spesifik per halaman

Metadata global hanya berisi title dan description. Request lokal menunjukkan halaman Home, About, dan Articles memakai judul yang sama. Tidak ditemukan metadata khusus proyek, canonical, Open Graph/Twitter image, sitemap, atau robots route. `/sitemap.xml` dan `/robots.txt` mengembalikan 404 saat diuji.

Tindak lanjut: buat title template, metadata tiap route dan proyek, canonical sesuai domain produksi yang dikonfirmasi, sitemap, robots, dan social preview. Tambahkan structured data profil bila isi profil sudah final. 404 pada robots bukan berarti mesin pencari otomatis memblokir situs; yang belum ada adalah kontrol dan deklarasi eksplisitnya.

### P2 — Integrasi Spotify perlu lebih hemat dan tangguh

Client melakukan polling setiap lima detik. Setiap request terkonfigurasi menukar refresh token menjadi access token kembali, lalu mengambil playback. Dengan satu tab aktif terus, pola nominal ini bisa menghasilkan sekitar 12 request aplikasi dan 24 request upstream per menit. Angka ini dihitung dari kode, bukan hasil load test.

Tidak ditemukan timeout eksplisit, cache access token, penghentian polling saat tab tersembunyi, atau backoff. Route menangkap kegagalan dan mengembalikan status tidak bermain; masalah layanan tidak dibedakan dari playback kosong. Kondisi `res.status > 400` tidak mencakup status 400, dan tidak ada cabang 202 meski disebut dalam komentar.

Tindak lanjut: gunakan ulang token sampai mendekati kedaluwarsa, tangani status/error dengan jelas, tambah timeout dan backoff, serta jeda polling pada tab tersembunyi. Pilih TTL cache playback sesuai kebutuhan. Tampilkan fallback yang cocok untuk pengunjung; instruksi menambahkan credential cukup berada dalam dokumentasi pengembang.

Validasi live Spotify belum dilakukan karena checkout tidak memiliki credential. Respons fallback lokal telah diuji.

### P2 — Progressive enhancement, aksesibilitas, dan efek visual

CSS menyembunyikan elemen hero/reveal untuk pengguna tanpa reduced motion sebelum GSAP menampilkannya. Bila JavaScript tidak tersedia atau gagal sebelum animasi, konten itu berisiko tetap transparan. Ini temuan dari sumber, belum pengujian browser dengan JavaScript dimatikan.

Hero dan theme toggle memiliki penanganan reduced motion, tetapi tidak ditemukan pemeriksaan tersebut pada loop SideRays. SideRays mengamati intersection, namun background fixed tetap bisa berada dalam viewport sepanjang sesi. WebGL initialization juga belum memiliki fallback eksplisit ketika pembuatan renderer gagal.

Menu mobile menyediakan label tombol dan `aria-expanded`, tetapi belum memiliki pengelolaan fokus, Escape untuk menutup, dan pengembalian fokus yang eksplisit. Nav aktif belum memakai `aria-current`; belum ada skip link.

Tindak lanjut: pastikan konten tetap terlihat saat animasi gagal, hormati preferensi motion untuk semua efek, sediakan fallback WebGL, dan lengkapi interaksi keyboard. Ukur di perangkat mobile sebelum mengklaim performanya baik atau buruk. Tidak ada skor Lighthouse/Core Web Vitals yang diukur dalam audit ini.

### P3 — Kebersihan repo dan kesiapan kolaborasi

README masih menjelaskan starter app. Belum ada pin runtime/engines, contoh environment, atau pipeline pemeriksaan. Native TypeScript import dalam test perlu runtime Node yang mendukungnya; audit ini memakai Node 22.19.0 dan npm 10.9.3.

Tindak lanjut: tulis README proyek, dokumentasikan setup lokal/deploy/struktur konten, tambahkan contoh environment tanpa secret, pin versi Node yang didukung, dan jalankan lint + test + build + test halaman di CI. Pindahkan atau hapus data template yang tidak digunakan setelah memastikan tidak ada dependensi.

## Roadmap yang disarankan

| Tahap | Cakupan | Syarat selesai |
| --- | --- | --- |
| 1. Fondasi | Empat error lint, grafik kontribusi, fallback konten/Spotify, README dan runtime | Lint, test, dan build lulus; tidak ada data contoh yang tampil sebagai fakta |
| 2. Portofolio inti | Hero yang spesifik, Selected Projects, About faktual, CTA kontak | Pengunjung bisa menemukan karya dan menghubungi pemilik dari beranda; seluruh klaim berasal dari fakta yang dikonfirmasi |
| 3. Studi kasus dan distribusi | Peran, masalah, solusi, keputusan teknis, hasil; metadata, social preview, sitemap | Kedua studi kasus lengkap; metadata unik dan URL crawl tersedia |
| 4. Keandalan dan pengukuran | Spotify, reduced motion, keyboard menu, fallback WebGL, CI, audit mobile | Alur desktop/mobile dan keyboard diuji; baseline performa nyata dicatat |
| 5. Konten lanjutan | Artikel Markdown/MDX atau sumber konten sederhana; proyek tambahan | Artikel memiliki body nyata, halaman daftar, metadata, dan 404 yang benar |

CMS, database, dashboard admin, filter proyek, atau fitur layanan tidak perlu ditambahkan hanya karena memungkinkan. Tambahkan ketika volume konten atau alur pembaruan benar-benar memerlukannya.

## Hasil validasi baseline

| Pemeriksaan | Hasil |
| --- | --- |
| Instalasi lockfile | `npm ci --no-audit --no-fund` berhasil, 369 package |
| Unit/data test | `npm test`: 2/2 lulus |
| Lint | Gagal: 4 error, 0 warning |
| Production build | `npm run build` berhasil, termasuk TypeScript dan prerender |
| HTTP test bawaan | `npm run test:pages`: 3/3 lulus terhadap server production port 3010 |
| Route tambahan | Home, About, Articles 200; artikel tidak dikenal 404 |
| Spotify tanpa credential | 200, `configured: false`, `isPlaying: false` |
| Crawl endpoint | robots.txt dan sitemap.xml 404 |
| Browser desktop lokal | Beranda dan Projects diperiksa; screenshot kedua proyek berhasil dimuat |

Perintah reproduksi, dari direktori repository:

```powershell
npm ci
npm test
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3010
# Terminal terpisah:
$env:TEST_BASE_URL = 'http://127.0.0.1:3010'
npm run test:pages
```

Lima test bawaan memeriksa data proyek, HTML, tujuan tautan, dan status 404. Test ini belum mencakup interaksi browser, integrasi Spotify terkonfigurasi, preferensi motion, atau accessibility.

Batas audit: penilaian sumber dan production build lokal pada commit di atas. Deployment publik, DNS/domain, live destination proyek, mobile, live Spotify, dependency security audit, dan performa produksi belum diverifikasi. Tidak ada perubahan aplikasi, push, atau deploy dalam pekerjaan analisis ini.

## Konteks untuk sesi berikutnya

- Checkout kerja berada di subfolder `portofolio-v2` dalam workspace Portofolio; folder induknya memiliki Git repository kosong yang terpisah.
- Jalankan Git dan npm dari checkout tersebut, bukan folder induk.
- Ikuti `AGENTS.md`: baca dokumentasi relevan di `node_modules/next/dist/docs/` sebelum mengubah kode Next.js.
- Pertahankan persona Alrizky dan dua proyek nyata yang sudah tercantum.
- Bio, riwayat pengalaman, CV, target audiens utama, peran dan hasil proyek perlu dikonfirmasi sebelum ditulis sebagai fakta.
- Titik mulai yang disarankan: tahap 1, kemudian homepage dan About pada tahap 2.
