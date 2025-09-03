import { Book, Map } from 'lucide-react';

export const academyNavItems = [
  {
    label: "Kursus",
    type: "mega-menu",
    megaMenuContent: {
      layout: "industries-layout", // FIX: Use the layout that supports fullWidth cards
      cards: [
        {
          icon: <Book />,
          title: "Semua Kursus",
          description: "Jelajahi katalog lengkap kami dari berbagai tingkat keahlian.",
          bgColor: "bg-blue-500",
          href: "/academy/",
          fullWidth: true,
        },
        {
          icon: <Map />,
          title: "Jalur Belajar",
          description: "Ikuti peta jalan terstruktur untuk mencapai tujuan karir Anda.",
          bgColor: "bg-green-500",
          href: "/academy/paths",
        },
      ],
      whatsNew: {
        title: "Baru di Akademi",
        items: [
          "Kursus React v19",
          "Jalur Belajar DevOps",
          "Diskon 50% untuk pelajar",
        ],
        buttonText: "Lihat Semua Kursus",
        buttonHref: "/academy/",
      },
    },
  },
  { label: "Blog", href: "/academy/blog", type: "link" },
  { label: "Komunitas", href: "/academy/community", type: "link" },
  { label: "Harga", href: "/academy/pricing", type: "link" },
  { label: "Instruktur", href: "/academy/instructors", type: "link" },
];