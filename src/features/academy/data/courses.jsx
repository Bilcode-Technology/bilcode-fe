import { Code, Server, Layout, Smartphone, PenTool } from 'lucide-react';

export const courses = [
  {
    title: 'Front End Development',
    description: 'Master the art of creating beautiful and interactive user interfaces with modern web technologies.',
    type: 'material',
    level: 'Beginner',
    icon: <Code />,
    href: '/academy/courses/frontend',
  },
  {
    title: 'Back End Development',
    description: 'Learn how to build robust and scalable server-side applications and APIs.',
    type: 'video',
    level: 'Intermediate',
    icon: <Server />,
    href: '/academy/courses/backend',
  },
  {
    title: 'Fullstack Development',
    description: 'Become a versatile developer by mastering both front-end and back-end development.',
    type: 'material',
    level: 'Advanced',
    icon: <Layout />,
    href: '/academy/courses/fullstack',
  },
  {
    title: 'UI/UX Design',
    description: 'Design intuitive and user-friendly interfaces that provide a great user experience.',
    type: 'video',
    level: 'Beginner',
    icon: <PenTool />,
    href: '/academy/courses/uiux',
  },
  {
    title: 'Mobile App Development',
    description: 'Build native and cross-platform mobile applications for iOS and Android.',
    type: 'material',
    level: 'Intermediate',
    icon: <Smartphone />,
    href: '/academy/courses/mobile',
  },
];
