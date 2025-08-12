import {
  Globe, Smartphone, Paintbrush, Cloud, CreditCard, HeartPulse, GraduationCap, Store, Landmark, Truck, Building2, 
  Folder, Rocket, ShoppingCart, BarChart3, BookOpen, Users, Briefcase, Handshake, Award, FileText, 
  Layers, Shield, PenTool, Server, BookMarked, FileSearch, Languages, ChevronDown, Plane, Building, Code, 
  Palette, LayoutTemplate, Library, Phone, Mail
} from 'lucide-react';

export const navItems = [
  {
    label: 'Services',
    type: 'mega-menu',
    megaMenuContent: {
      layout: 'services-layout',
      cards: [
        { icon: <Globe />, title: 'Web Development', description: 'End-to-end solutions for modern web apps with cutting-edge technologies and best practices.', bgColor: 'bg-blue-500', href: '#services', fullWidth: true },
        { icon: <Smartphone />, title: 'Mobile Apps', description: 'Native and cross-platform mobile apps.', bgColor: 'bg-purple-500', href: '#services' },
        { icon: <Paintbrush />, title: 'UI/UX Design', description: 'Intuitive and beautiful user interfaces.', bgColor: 'bg-teal-500', href: '#services' },
        { icon: <Cloud />, title: 'AI & Automation', description: 'Intelligent automation for business growth.', bgColor: 'bg-sky-500', href: '#services' },
      ],
      whatsNew: { title: 'Our Process', items: ['Discovery & Strategy', 'Design & Development', 'Testing & Deployment'], buttonText: 'All Services', buttonHref: '#services' }
    }
  },
  {
    label: 'Industries',
    type: 'mega-menu',
    megaMenuContent: {
      layout: 'industries-layout',
      leftColumnCards: [
        { icon: <CreditCard />, title: 'Fintech', description: 'Secure solutions for modern banking.', href: '#', bgColor: 'bg-green-500' },
        { icon: <HeartPulse />, title: 'HealthTech', description: 'Innovative healthcare platforms.', href: '#', bgColor: 'bg-red-500' },
        { icon: <GraduationCap />, title: 'EdTech', description: 'Next-gen digital learning platforms.', href: '#', bgColor: 'bg-yellow-500' },
      ],
      middleColumnCards: [
        { icon: <Store />, title: 'E-commerce', description: 'Scalable online retail solutions.', href: '#', bgColor: 'bg-indigo-500' },
        { icon: <Landmark />, title: 'Government', description: 'Smart public sector solutions.', href: '#', bgColor: 'bg-orange-500' },
        { icon: <Truck />, title: 'Logistics', description: 'Efficient supply chain optimization.', href: '#', bgColor: 'bg-pink-500' },
      ],
      rightColumnCards: [
        { icon: <Building2 />, title: 'Real Estate', description: 'PropTech innovations for real estate.', href: '#', bgColor: 'bg-cyan-500' },
      ],
      whatsNew: { title: 'Industry Insights', items: ['Latest trends in Fintech', 'AI in Healthcare', 'Future of E-commerce'], buttonText: 'Explore Industries', buttonHref: '#' }
    }
  },
  {
    label: 'Work',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <Folder />, title: 'All Projects', description: 'Browse our complete showcase with detailed case studies and client testimonials.', bgColor: 'bg-purple-500', href: '#portfolio', fullWidth: true },
        { icon: <Rocket />, title: 'Startups', description: 'Agile tech for fast-growing startups.', bgColor: 'bg-red-500', href: '#portfolio' },
        { icon: <ShoppingCart />, title: 'E-commerce', description: 'A scalable e-commerce ecosystem.', bgColor: 'bg-sky-500', href: '#portfolio' },
        { icon: <Server />, title: 'SaaS Platforms', description: 'Software as a Service solutions.', bgColor: 'bg-green-500', href: '#portfolio' },
        { icon: <Building />, title: 'Enterprise', description: 'Robust systems for global enterprises.', bgColor: 'bg-yellow-500', href: '#portfolio' },
        { icon: <FileText />, title: 'Case Studies', description: 'In-depth project analysis.', bgColor: 'bg-indigo-500', href: '#portfolio' },
      ],
      whatsNew: { title: 'Client Success', items: ['40% increase in user engagement', '25% cost reduction'], buttonText: 'Explore Portfolio', buttonHref: '#portfolio' }
    }
  },
  {
    label: 'Company',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <BookOpen />, title: 'Our Story', description: 'The journey of our company.', bgColor: 'bg-blue-500', href: '#' },
        { icon: <Users />, title: 'Our Team', description: 'Meet the people behind our success.', bgColor: 'bg-purple-500', href: '#' },
        { icon: <Briefcase />, title: 'Careers', description: 'Join our talented team.', bgColor: 'bg-teal-500', href: '#' },
        { icon: <Handshake />, title: 'Partnerships', description: 'Our trusted collaborators.', bgColor: 'bg-sky-500', href: '#' },
        { icon: <Award />, title: 'Certifications', description: 'Our recognized credentials.', bgColor: 'bg-green-500', href: '#' },
        { icon: <Mail />, title: 'Contact', description: 'Send us a message or book a call.', bgColor: 'bg-indigo-500', href: '#' },
      ],
      whatsNew: { title: 'Company News', items: ['We are expanding to a new office!', 'New partnership announcement.'], buttonText: 'Read More', buttonHref: '#' }
    }
  },
  {
    label: 'Programs',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <GraduationCap />, title: 'Bootcamp Program', description: 'Intensive 12-week training with job assistance.', bgColor: 'bg-emerald-500', href: '#', fullWidth: true },
        { icon: <BookMarked />, title: 'Workshops', description: 'Hands-on skill-building sessions.', bgColor: 'bg-yellow-500', href: '#' },
        { icon: <Users />, title: '1-on-1 Mentoring', description: 'Personalized learning with experts.', bgColor: 'bg-indigo-500', href: '#' },
        { icon: <Award />, title: 'Certification', description: 'Recognized industry credentials.', bgColor: 'bg-pink-500', href: '#' },
        { icon: <Briefcase />, title: 'Corporate Training', description: 'Upskill your entire workforce.', bgColor: 'bg-cyan-500', href: '#' },
        { icon: <Layers />, title: 'Student Assistance', description: 'Support for academic projects.', bgColor: 'bg-pink-600', href: '#' },
        { icon: <PenTool />, title: 'Final Project Mentoring', description: 'Guidance for graduation projects.', bgColor: 'bg-cyan-600', href: '#' },
        { icon: <Rocket />, title: 'MVP Build', description: 'Rapid prototype development.', bgColor: 'bg-red-600', href: '#' },
        { icon: <Shield />, title: 'NDA-Secured Work', description: 'Confidential project development.', bgColor: 'bg-teal-600', href: '#' },
        { icon: <Server />, title: 'Debug & Optimization', description: 'Improve performance and stability.', bgColor: 'bg-sky-600', href: '#' },
      ],
      whatsNew: { title: 'Upcoming Programs', items: ['AI Bootcamp', 'UI/UX Design Sprint', 'Cloud Certification Prep'], buttonText: 'All Programs', buttonHref: '#' }
    }
  },
  {
    label: 'Resources',
    type: 'mega-menu',
    megaMenuContent: {
      cards: [
        { icon: <BookOpen />, title: 'Blog', description: 'Insights and updates from our experts.', bgColor: 'bg-orange-500', href: '#' },
        { icon: <FileSearch />, title: 'Whitepapers', description: 'In-depth research and industry reports.', bgColor: 'bg-lime-500', href: '#' },
        { icon: <GraduationCap />, title: 'Tutorials', description: 'Step-by-step guides for developers.', bgColor: 'bg-yellow-500', href: '#' },
        { icon: <FileText />, title: 'Research Reports', description: 'Our latest research findings.', bgColor: 'bg-indigo-500', href: '#' },
        { icon: <Users />, title: 'Community Forum', description: 'Collaborate and learn together.', bgColor: 'bg-pink-500', href: '#' },
        { icon: <Layers />, title: 'Open Source Contributions', description: 'Our public code projects.', bgColor: 'bg-cyan-500', href: '#' },
        { icon: <LayoutTemplate />, title: 'Templates', description: 'Ready-to-use website designs.', bgColor: 'bg-blue-500', href: '#' },
        { icon: <Palette />, title: 'Mobile UI Kits', description: 'Complete UI kits for mobile apps.', bgColor: 'bg-purple-500', href: '#' },
        { icon: <BarChart3 />, title: 'Dashboards', description: 'Pre-built dashboard designs.', bgColor: 'bg-teal-500', href: '#' },
        { icon: <Library />, title: 'Components', description: 'Reusable UI components.', bgColor: 'bg-sky-500', href: '#' },
        { icon: <Code />, title: 'Landing Kits', description: 'Kits for creating landing pages.', bgColor: 'bg-green-500', href: '#' },
      ],
      whatsNew: { title: 'Featured Content', items: ['Top 10 UI Trends', 'Scaling Your SaaS Globally'], buttonText: 'Explore Resources', buttonHref: '#' }
    }
  },
  {
    label: 'Language',
    type: 'dropdown',
    items: [
      { title: 'English', href: '#' },
      { title: 'Español', href: '#' },
      { title: '日本語', href: '#' },
      { title: 'العربية', href: '#' },
      { title: 'Français', href: '#' },
    ],
    icon: <Languages />
  }
];