export const qnaData = [
  {
    id: 1,
    author: 'Budi Santoso',
    avatar: 'https://i.pravatar.cc/150?u=budi',
    question: 'Bagaimana cara terbaik untuk menangani state management di aplikasi React yang besar? Apakah Redux masih relevan atau ada alternatif yang lebih baik seperti Zustand atau Jotai?',
    timestamp: '2 hari yang lalu',
    answers: [
      {
        id: 1,
        author: 'Rizky (Instruktur)',
        avatar: 'https://i.pravatar.cc/150?u=instruktur',
        answer: 'Pertanyaan bagus, Budi! Redux masih sangat relevan, terutama untuk aplikasi enterprise yang butuh middleware kompleks dan devtools yang matang. Namun, untuk proyek baru, banyak developer sekarang lebih memilih Zustand karena lebih simpel, boilerplate-nya sedikit, dan terasa lebih "React-like". Jotai juga pilihan bagus untuk state yang lebih atomik. Saran saya, coba Zustand dulu untuk proyek selanjutnya.',
        timestamp: '1 hari yang lalu',
        isInstructor: true,
      },
      {
        id: 2,
        author: 'Citra Lestari',
        avatar: 'https://i.pravatar.cc/150?u=citra',
        answer: 'Saya setuju dengan instruktur. Tim saya baru saja migrasi dari Redux ke Zustand dan development jadi lebih cepat. Kurva belajarnya juga lebih landai untuk anggota tim yang baru.',
        timestamp: '1 hari yang lalu',
        isInstructor: false,
      },
    ],
  },
  {
    id: 2,
    author: 'Ani Wijaya',
    avatar: 'https://i.pravatar.cc/150?u=ani',
    question: 'Apakah kita harus selalu menggunakan `useEffect` untuk data fetching? Saya dengar ada library seperti React Query atau SWR, apa kelebihannya?',
    timestamp: '5 hari yang lalu',
    answers: [
       {
        id: 1,
        author: 'Rizky (Instruktur)',
        avatar: 'https://i.pravatar.cc/150?u=instruktur',
        answer: 'Betul sekali, Ani. Menggunakan `useEffect` untuk fetching data bisa jadi cukup rumit karena harus menangani state loading, error, dan caching secara manual. Library seperti React Query atau SWR (keduanya bagus!) mengabstraksi semua itu. Kelebihan utamanya: caching otomatis, re-fetching saat window focus, dan sinkronisasi state server di client jadi jauh lebih mudah. Sangat direkomendasikan untuk aplikasi modern.',
        timestamp: '4 hari yang lalu',
        isInstructor: true,
      },
    ],
  },
];
