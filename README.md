# Bilcode Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

Repository ini berisi kode sumber untuk frontend aplikasi **Bilcode**, sebuah platform multifungsi yang dirancang untuk edukasi teknologi dan penyediaan jasa pengembangan perangkat lunak.

## ✨ Fitur Utama

Aplikasi ini terbagi menjadi beberapa fitur utama yang saling terintegrasi untuk memberikan pengalaman pengguna yang lengkap.

### 🎓 Academy
Pusat pembelajaran online dengan berbagai fitur untuk mendukung siswa dan instruktur.
- **Katalog Kursus**: Menampilkan semua kursus dengan fitur pencarian, filter (level, harga), dan pengurutan (popularitas, rating, terbaru).
- **Halaman Belajar Interaktif**: Halaman khusus untuk belajar dengan konten video, kuis, dan pelacakan progres per topik melalui checkbox.
- **Gamifikasi**:
    - **Papan Peringkat (Leaderboard)**: Menampilkan peringkat siswa berdasarkan poin yang didapat.
    - **Halaman Pencapaian (Badges)**: Pengguna dapat melihat lencana yang telah mereka peroleh dan yang masih terkunci.
- **Jalur Belajar (Learning Paths)**: Kurikulum terstruktur yang terdiri dari beberapa kursus untuk mencapai tujuan karir tertentu.
- **Komunitas**: Forum diskusi dan tautan ke grup Discord untuk interaksi antara siswa dan instruktur.
- **Blog**: Artikel dan wawasan seputar dunia teknologi dengan sistem filter berdasarkan tag.
- **Profil Instruktur**: Halaman detail untuk setiap instruktur, menampilkan biografi dan kursus yang mereka ajar.
- **Sistem Notifikasi**: Pusat notifikasi di header untuk memberitahu pengguna tentang pembaruan penting.

### 🛠️ Jasa "Joki"
Fitur untuk memesan layanan pengembangan perangkat lunak secara profesional.
- **Sistem Pemesanan Multi-Langkah**: Alur pemesanan yang terstruktur untuk memudahkan pengguna:
    1.  **Pemilihan Layanan**: Memilih dari berbagai layanan yang ditawarkan (e.g., Pembuatan Website, Desain UI/UX).
    2.  **Detail Proyek**: Mengisi formulir rinci tentang kebutuhan proyek.
    3.  **Konfirmasi**: Meninjau kembali pesanan sebelum dikirim.
- **Halaman Konfirmasi**: Halaman yang memberitahukan bahwa pesanan telah berhasil dikirim.

### 👤 Pengguna & Autentikasi
- **Dasbor Pengguna**: Halaman pusat bagi pengguna untuk mengakses kursus mereka, melihat progres, dan mengelola profil.
- **Manajemen Akun**: Proses registrasi dan login pengguna.

## 🚀 Tumpukan Teknologi (Tech Stack)

- **Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Animasi**: [GSAP (GreenSock Animation Platform)](https://greensock.com/gsap/)
- **Ikon**: [Lucide React](https://lucide.dev/)
- **Manajemen State (Konteks)**: React Context API

## 📂 Struktur Proyek

Struktur kode diatur berdasarkan fitur untuk menjaga modularitas dan skalabilitas.
```
src/
├── components/     # Komponen UI global (Header, Footer)
├── context/        # React Context (e.g., AuthContext)
├── features/       # Direktori utama untuk semua fitur aplikasi
│   ├── academy/    # Fitur e-learning (kursus, blog, event, dll)
│   ├── auth/       # Fitur autentikasi (login, register, dasbor)
│   ├── joki/       # Fitur pemesanan jasa
│   └── landing/    # Halaman utama dan halaman statis lainnya
├── hooks/          # Custom React Hooks
└── layouts/        # Komponen layout utama
```

## ⚙️ Menjalankan Proyek Secara Lokal

Untuk menjalankan proyek ini di lingkungan pengembangan lokal Anda, ikuti langkah-langkah berikut.

### Prasyarat
- [Node.js](https://nodejs.org/) (versi 18.x atau lebih tinggi direkomendasikan)
- [npm](https://www.npmjs.com/) (biasanya terinstal bersama Node.js)

### Instalasi
1.  Clone repository ini ke mesin lokal Anda:
    ```bash
    git clone https://github.com/username/bilcode-fe.git
    cd bilcode-fe
    ```
2.  Instal semua dependensi yang diperlukan:
    ```bash
    npm install
    ```

### Menjalankan Server Pengembangan
- Untuk memulai server pengembangan Vite, jalankan perintah berikut:
  ```bash
  npm run dev
  ```
- Buka browser Anda dan kunjungi `http://localhost:5173` (atau port lain yang ditampilkan di terminal Anda).

## 🤝 Kontribusi

Kontribusi untuk proyek ini sangat kami hargai. Jika Anda ingin berkontribusi, silakan buat *fork* dari repository ini dan ajukan *pull request*.
