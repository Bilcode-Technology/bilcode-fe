import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Menu, BookOpen, Clock, BarChart, CheckCircle, Search, Command } from 'lucide-react';

// Mock data
const course = {
  title: 'Belajar Full-stack Dengan React Router v7',
  bab: 2,
  pelajaran: 19,
  duration: '2 Jam',
  level: 'Beginner',
  shortDescription: 'React Router v7 memungkinkan kita untuk membangun aplikasi full-stack berbasis React.js.',
  author: 'Muhamad Nauval Azhar',
  price: 'Gratis',
  image: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&w=1470&q=80',
  description: 'React Router v7 memungkinkan kita untuk membangun aplikasi full-stack berbasis React.js.',
  learnings: [
    'Memahami fundamental React Router v7',
    'Memahami fitur data loading dan actions',
    'Implementasi sistem autentikasi',
    'Menangani error di aplikasi',
  ],
  prerequisites: ['Fundamental pengembangan web', 'Fundamental React'],
  curriculum: [
    {
      section: '00 Prolog',
      topics: ['Pendahuluan', 'Kenapa React Router v7?'],
    },
    {
      section: '01 Pembahasan',
      topics: [
        'Instalasi',
        'Pengenalan Direktori',
        'Routing Basic',
        'Routing Nested',
        'Routing Dynamic Segments',
        'Routing Prefix',
        'Routing Layout',
        'Styling',
        'Meta Tags',
        'Navigasi',
        'Data Loading',
        'Actions',
        'Autentikasi',
        'Resource Routes',
        'Streaming',
        'Error Handling',
      ],
    },
  ],
};

const CourseDetailPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsSidebarOpen(mediaQuery.matches);
    const handler = (e) => setIsSidebarOpen(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!course) {
    return (
      <div className="bg-white text-black pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold">404 - Course Not Found</h1>
        <Link to="/academy" className="mt-8 inline-block text-blue-600 hover:underline">
          &larr; Back to Academy
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out overflow-hidden ${
            isSidebarOpen ? 'w-72 p-6' : 'w-0 p-0'
          }`}
        >
          <div className="w-60">
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-blue-100 rounded-full mr-3"></div>
              <span className="font-semibold text-gray-900">User Name</span>
            </div>
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari pelajaran"
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs flex items-center">
                <Command size={12} className="mr-1" /> K
              </div>
            </div>
            <nav>
              <ul>
                {course.curriculum.map((item, index) => (
                  <li key={index} className="mb-6">
                    <h3 className="text-gray-500 text-sm font-bold mb-3">{item.section}</h3>
                    <ul>
                      {item.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>
                          <a
                            href="#"
                            className="block py-2 px-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 whitespace-nowrap"
                          >
                            {topic}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <header className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              <Link to="/academy" className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft size={20} />
              </Link>
              <span className="font-semibold hidden md:block ml-4 text-gray-900">{course.title}</span>
            </div>
            <div className="flex items-center">
              <button className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Login
              </button>
            </div>
          </header>

          <div className="p-6 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{course.title}</h1>
                <div className="flex items-center space-x-6 text-gray-600 mb-6 flex-wrap">
                  <div className="flex items-center mb-2">
                    <BookOpen size={16} className="mr-2 text-blue-600" />
                    <span>
                      {course.bab} Bab, {course.pelajaran} Pelajaran
                    </span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Clock size={16} className="mr-2 text-blue-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <BarChart size={16} className="mr-2 text-blue-600" />
                    <span>{course.level}</span>
                  </div>
                </div>
                <p className="text-lg mb-12 text-gray-700">{course.shortDescription}</p>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi</h2>
                  <p className="text-gray-700">{course.description}</p>
                </section>

                <section className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Apa yang akan kamu pelajari</h2>
                  <ul className="space-y-3">
                    {course.learnings.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle size={20} className="text-blue-600 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Prasyarat</h2>
                  <ul className="space-y-2 list-disc list-inside text-gray-700">
                    {course.prerequisites.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Floating Card */}
              <div className="lg:col-span-1">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-lg sticky top-24">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-t-2xl" />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-sm text-gray-600 mb-4">{course.shortDescription}</p>
                    <div className="flex items-center mb-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full mr-3"></div>
                      <span className="text-sm font-semibold text-gray-900">{course.author}</span>
                    </div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">{course.price}</div>
                    <div className="flex items-center text-sm text-gray-600 mb-6">
                      <CheckCircle size={18} className="mr-2 text-green-500" />
                      Akses Seumur Hidup
                    </div>
                    <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center">
                      <BookOpen size={18} className="mr-2" />
                      Mulai Belajar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CourseDetailPage;