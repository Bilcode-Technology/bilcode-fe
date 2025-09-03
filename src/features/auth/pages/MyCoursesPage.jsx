import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { BookOpen, ChevronRight } from 'lucide-react';

const MyCoursesPage = () => {
  const { user, courses: enrolledCourses } = useAuth();

  if (!user) {
    return (
      <div className="text-center py-40">
        <h1 className="text-3xl font-bold">Silakan login untuk melihat kursus Anda.</h1>
        <Link to="/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">Login</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Kursus Saya</h1>
          <p className="mt-4 text-xl text-slate-600">Lanjutkan perjalanan belajar Anda dan kuasai keahlian baru.</p>
        </header>

        {enrolledCourses.length > 0 ? (
          <div className="space-y-6">
            {enrolledCourses.map(course => (
              <div key={course.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-6">
                <img src={course.image} alt={course.title} className="w-32 h-20 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="font-bold text-slate-800 text-lg">{course.title}</h3>
                  <div className="w-full bg-slate-200 rounded-full h-4 mt-2">
                    <div className="bg-blue-600 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ width: `${course.progress || 0}%` }}>
                      {course.progress || 0}%
                    </div>
                  </div>
                </div>
                <Link to={course.href} className="bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-200 transition-colors">
                  Lanjutkan Belajar <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-md">
            <BookOpen className="w-16 h-16 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800">Anda belum terdaftar di kursus manapun.</h2>
            <p className="text-slate-600 mt-2 mb-6">Jelajahi katalog kami untuk menemukan kursus yang tepat untuk Anda.</p>
            <Link to="/academy" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Jelajahi Kursus
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCoursesPage;
