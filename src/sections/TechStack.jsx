import { useEffect, useRef, useState } from 'react';
import RotatingGrid from './components/RotatingGrid';

const TechStack = () => {
  const techLogos = [
    { name: "React", logo: "https://logo.clearbit.com/react.dev" },
    { name: "Next.js", logo: "https://logo.clearbit.com/nextjs.org" },
    { name: "React Native", logo: "https://logo.clearbit.com/reactnative.dev" },
    { name: "TypeScript", logo: "https://logo.clearbit.com/typescriptlang.org" },
    { name: "Node.js", logo: "https://logo.clearbit.com/nodejs.org" },
    { name: "Express", logo: "https://logo.clearbit.com/expressjs.com" },
    { name: "NestJS", logo: "https://logo.clearbit.com/nestjs.com" },
    { name: "Python", logo: "https://logo.clearbit.com/python.org" },
    { name: "Django", logo: "https://logo.clearbit.com/djangoproject.com" },
    { name: "FastAPI", logo: "https://logo.clearbit.com/fastapi.tiangolo.com" },
    { name: "GraphQL", logo: "https://logo.clearbit.com/graphql.org" },
    { name: "Apollo", logo: "https://logo.clearbit.com/apollographql.com" },
    { name: "PostgreSQL", logo: "https://logo.clearbit.com/postgresql.org" },
    { name: "MySQL", logo: "https://logo.clearbit.com/mysql.com" },
    { name: "MongoDB", logo: "https://logo.clearbit.com/mongodb.com" },
    { name: "Redis", logo: "https://logo.clearbit.com/redis.io" },
    { name: "Prisma", logo: "https://logo.clearbit.com/prisma.io" },
    { name: "Tailwind CSS", logo: "https://logo.clearbit.com/tailwindcss.com" },
    { name: "MUI", logo: "https://logo.clearbit.com/mui.com" },
    { name: "AWS", logo: "https://logo.clearbit.com/aws.amazon.com" },
    { name: "GCP", logo: "https://logo.clearbit.com/cloud.google.com" },
    { name: "Vercel", logo: "https://logo.clearbit.com/vercel.com" },
    { name: "Docker", logo: "https://logo.clearbit.com/docker.com" },
    { name: "Kubernetes", logo: "https://logo.clearbit.com/kubernetes.io" },
    { name: "Nginx", logo: "https://logo.clearbit.com/nginx.com" },
    { name: "Cloudflare", logo: "https://logo.clearbit.com/cloudflare.com" },
    { name: "Supabase", logo: "https://logo.clearbit.com/supabase.com" },
  ];

  return (
    <section className="py-16 md:py-20 bg-gradient-to-b from-[#f7faff] via-white to-[#f7faff]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 opacity-0 animate-[headingIn_700ms_ease-out_forwards]">Our Tech Stack</h2>
          <p className="text-gray-600 mt-3 max-w-2xl">Battle-tested tools we use to build fast, reliable, and scalable products.</p>
        </div>

        <div className="relative mt-12">
          <RotatingGrid items={techLogos} rows={2} cols={6} intervalMs={3200} />
        </div>

        <style>{`
          @keyframes headingIn { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
          @keyframes flipUp {
            0% { transform: rotateX(0); }
            40% { transform: rotateX(0); }
            50% { transform: rotateX(180deg); }
            90% { transform: rotateX(180deg); }
            100% { transform: rotateX(360deg); }
          }
        `}</style>
      </div>
    </section>
  );
};

export default TechStack;
