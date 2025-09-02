import {
  Globe,
  Smartphone,
  Paintbrush,
  Cloud,
  Folder,
  Rocket,
  ShoppingCart,
  Server,
} from "lucide-react";

export const navItems = [
  {
    label: "Layanan",
    type: "mega-menu",
    megaMenuContent: {
      layout: "services-layout",
      cards: [
        {
          icon: <Globe />,
          title: "Pengembangan Web",
          description:
            "Solusi end-to-end untuk aplikasi web modern dengan teknologi terbaru dan praktik terbaik.",
          bgColor: "bg-[#F7A338]",
          href: "/academy",
          fullWidth: true,
        },
        {
          icon: <Smartphone />,
          title: "Pengembangan Mobile",
          description: "Aplikasi mobile native dan lintas platform.",
          bgColor: "bg-[#6A38F7]",
          href: "/academy",
        },
        {
          icon: <Paintbrush />,
          title: "Desain UI/UX",
          description: "Antarmuka pengguna yang intuitif dan indah.",
          bgColor: "bg-[#F73838]",
          href: "/academy",
        },
        {
          icon: <Cloud />,
          title: "AI & Otomatisasi",
          description: "Otomatisasi cerdas untuk pertumbuhan bisnis.",
          bgColor: "bg-[#3852F7]",
          href: "/academy",
        },
      ],
      whatsNew: {
        title: "Produk Kami",
        items: [
          { label: "Bilcode Academy", href: "/academy" },
          { label: "Bilcode Joki", href: "/joki" },
          { label: "Kandidat Pro", href: "/kandidat-pro" },
        ],
        buttonText: "Lihat Semua Layanan",
        buttonHref: "/academy",
      },
    },
  },
  {
    label: "Portofolio",
    type: "mega-menu",
    megaMenuContent: {
      cards: [
        {
          icon: <Folder />,
          image: "/public/logo/pln.png",
          title: "PLN",
          description:
            "Jelajahi portofolio lengkap kami dengan studi kasus mendetail dan testimoni klien.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
          fullWidth: true,
        },
        {
          icon: <Rocket />,
          title: "USAID",
          description: "Teknologi gesit untuk startup yang berkembang pesat.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
        },
        {
          icon: <ShoppingCart />,
          title: "Trust Indonesia",
          description: "Ekosistem e-commerce yang dapat diskalakan.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
        },
        {
          icon: <Server />,
          title: "Carbon Trade",
          description: "Solusi perangkat lunak berbasis SaaS.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
        },
      ],
      whatsNew: {
        title: "Semua Klien",
        items: ["Pemerintah", "Korporasi", "Agensi", "Mahasiswa"],
        buttonText: "Lihat Semua Klien",
        buttonHref: "/#portfolio",
      },
    },
  },
  {
    label: "Academy",
    type: "link",
    href: "/academy",
  },
  {
    label: "Karier",
    type: "link",
    href: "/career",
  },
  {
    label: "Harga",
    type: "link",
    href: "/pricelist",
  },
];