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
          title: "Web Development",
          description:
            "End-to-end solutions for modern web apps with cutting-edge technologies and best practices.",
          bgColor: "bg-[#F7A338]",
          href: "/academy",
          fullWidth: true,
        },
        {
          icon: <Smartphone />,
          title: "Mobile Development",
          description: "Native and cross-platform mobile apps.",
          bgColor: "bg-[#6A38F7]",
          href: "/academy",
        },
        {
          icon: <Paintbrush />,
          title: "UI/UX Design",
          description: "Intuitive and beautiful user interfaces.",
          bgColor: "bg-[#F73838]",
          href: "/academy",
        },
        {
          icon: <Cloud />,
          title: "AI & Automation",
          description: "Intelligent automation for business growth.",
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
        buttonText: "Semua Layanan",
        buttonHref: "/academy",
      },
    },
  },
  {
    label: "Portfolio",
    type: "mega-menu",
    megaMenuContent: {
      cards: [
        {
          icon: <Folder />,
          image: "/public/logo/pln.png",
          title: "PLN",
          description:
            "Browse our complete showcase with detailed case studies and client testimonials.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
          fullWidth: true,
        },
        {
          icon: <Rocket />,
          title: "USAID",
          description: "Agile tech for fast-growing startups.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
        },
        {
          icon: <ShoppingCart />,
          title: "Trust Indonesia",
          description: "A scalable e-commerce ecosystem.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
        },
        {
          icon: <Server />,
          title: "Carbon Trade",
          description: "Software as a Service solutions.",
          bgColor: "bg-[#E5E7EB]",
          href: "/#portfolio",
        },
      ],
      whatsNew: {
        title: "Semua Klien",
        items: ["Goverments", "Corporates", "Agencies", "Students"],
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
    label: "Karir",
    type: "link",
    href: "/career",
  },
  {
    label: "Harga",
    type: "link",
    href: "/pricelist",
  },
];