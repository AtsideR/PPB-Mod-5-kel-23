# Resep Nusantara

Aplikasi web modern untuk menemukan resep masakan dan minuman khas Indonesia. Dibangun sebagai Progressive Web App (PWA), aplikasi ini dapat diinstal di perangkat Anda dan berfungsi penuh bahkan saat offline.

## Memulai Proyek

Pastikan Anda sudah menginstal Node.js di sistem Anda (disarankan v18+).

### Buat Proyek React dengan Vite
Buka terminal di lokasi folder yang Anda inginkan, lalu jalankan perintah ini untuk membuat proyek baru.

```bash
npm create vite@latest resep-nusantara -- --template react
```
lalu masuk ke direktory proyek

```bash
cd resep-nusantara
```
### Instalasi Semua Dependensi

```bash
npm install lucide-react

npm install -D vite-plugin-pwa

npm install tailwindcss @tailwindcss/vite
```
### Mulai Koding

Setup awal selesai! Sekarang Anda bisa mulai membuat struktur folder (src/components, src/pages, src/data) dan mengisi file-file kode seperti HomePage.jsx, makanan.js, dan lainnya.

### Mode Pengembangan

```bash
npm run dev
```

### Mode Produksi

```bash
npm run build
```

### Pengujian PWA di Mobile

#### Bangun aplikasi dengan perintah npm run build

#### install serve untuk menjalankan folder dist hasil build

```bash
npm install -g serve
```

#### jalankan server produksi

```bash
serve -s dist
```
Perhatikan alamat Network yang muncul di terminal (misal: http://192.168.1.10:3000).

Akses dari HP Anda:

Pastikan laptop dan HP Anda terhubung ke jaringan Wi-Fi yang sama.

Buka browser Chrome di HP Anda dan ketikkan alamat Network tadi.

Aplikasi akan terbuka, dan Anda akan melihat opsi untuk menginstalnya
