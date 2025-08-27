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
          href: "#services",
          fullWidth: true,
        },
        {
          icon: <Smartphone />,
          title: "Mobile Development",
          description: "Native and cross-platform mobile apps.",
          bgColor: "bg-[#6A38F7]",
          href: "#services",
        },
        {
          icon: <Paintbrush />,
          title: "UI/UX Design",
          description: "Intuitive and beautiful user interfaces.",
          bgColor: "bg-[#F73838]",
          href: "#services",
        },
        {
          icon: <Cloud />,
          title: "AI & Automation",
          description: "Intelligent automation for business growth.",
          bgColor: "bg-[#3852F7]",
          href: "#services",
        },
      ],
      whatsNew: {
        title: "Produk Kami",
        items: ["Bilcode Academy", "Bilcode Joki", "Kandidat Pro"],
        buttonText: "Semua Layanan",
        buttonHref: "#services",
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
          href: "#portfolio",
          fullWidth: true,
        },
        {
          icon: <Rocket />,
          title: "USAID",
          description: "Agile tech for fast-growing startups.",
          bgColor: "bg-[#E5E7EB]",
          href: "#portfolio",
        },
        {
          icon: <ShoppingCart />,
          title: "Trust Indonesia",
          description: "A scalable e-commerce ecosystem.",
          bgColor: "bg-[#E5E7EB]",
          href: "#portfolio",
        },
        {
          icon: <Server />,
          title: "Carbon Trade",
          description: "Software as a Service solutions.",
          bgColor: "bg-[#E5E7EB]",
          href: "#portfolio",
        },
      ],
      whatsNew: {
        title: "Semua Klien",
        items: ["Goverments", "Corporates", "Agencies", "Students"],
        buttonText: "Lihat Semua Klien",
        buttonHref: "#portfolio",
      },
    },
  },
  // {
  //   label: "Programs",
  //   type: "mega-menu",
  //   megaMenuContent: {
  //     cards: [
  //       {
  //         icon: <GraduationCap />,
  //         title: "Bootcamp Program",
  //         description: "Intensive 12-week training with job assistance.",
  //         bgColor: "bg-emerald-500",
  //         href: "#",
  //         fullWidth: true,
  //       },
  //       {
  //         icon: <BookMarked />,
  //         title: "Workshops",
  //         description: "Hands-on skill-building sessions.",
  //         bgColor: "bg-yellow-500",
  //         href: "#",
  //       },
  //       {
  //         icon: <Users />,
  //         title: "1-on-1 Mentoring",
  //         description: "Personalized learning with experts.",
  //         bgColor: "bg-indigo-500",
  //         href: "#",
  //       },
  //       {
  //         icon: <Award />,
  //         title: "Certification",
  //         description: "Recognized industry credentials.",
  //         bgColor: "bg-pink-500",
  //         href: "#",
  //       },
  //     ],
  //     whatsNew: {
  //       title: "Upcoming Programs",
  //       items: [
  //         "AI Bootcamp",
  //         "UI/UX Design Sprint",
  //         "Cloud Certification Prep",
  //       ],
  //       buttonText: "All Programs",
  //       buttonHref: "#",
  //     },
  //   },
  // },
  // {
  //   label: "Karir",
  //   type: "link",
  // },
  // {
  //   label: "Harga",
  //   type: "link",
  // },
  // {
  //   label: "Language",
  //   type: "dropdown",
  //   items: [
  //     { title: "English", href: "#" },
  //     { title: "Español", href: "#" },
  //     { title: "日本語", href: "#" },
  //     { title: "العربية", href: "#" },
  //     { title: "Français", href: "#" },
  //   ],
  //   icon: <Languages />,
  // },
];
