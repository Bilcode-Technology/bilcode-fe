import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, Award, User } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const DashboardPage = () => {
  const { user, courses } = useAuth();

  if (!user) {
    return (
      <div className="bg-slate-50 min-h-screen pt-32 pb-20 text-center">
        <h1 className="text-2xl font-bold text-slate-800">Anda harus login untuk melihat dasbor.</h1>
        <Link to="/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg">Login</Link>
      </div>
    );
  }

  const enrolledCourses = courses.filter(c => c.progress < 100);
  const completedCourses = courses.filter(c => c.progress === 100);

  const UserProfile = {
    name: user.name,
    email: user.email || 'email@example.com',
    avatar: user.avatar || '/member1.jpeg',
    joinDate: user.joinDate || 'September 2025',
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Dasbor Saya</h1>
          <p className="text-lg text-slate-600 mt-2">
            Selamat datang kembali, {UserProfile.name}! Mari lanjutkan perjalanan belajarmu.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-2">
            {/* Enrolled Courses */}
            <section>
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Kursus yang Sedang Diikuti</h2>
              {enrolledCourses.length > 0 ? (
                <div className="space-y-6">
                  {enrolledCourses.map(course => (
                    <div key={course.id} className="bg-white p-4 rounded-2xl shadow-md flex items-center gap-6 hover:shadow-lg transition-shadow">
                      <img src={course.image} alt={course.title} className="w-32 h-20 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <h3 className="font-bold text-slate-800 text-lg">{course.title}</h3>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="w-full bg-slate-200 rounded-full h-2.5">
                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                          </div>
                          <span className="text-sm font-semibold text-slate-600">{course.progress.toFixed(0)}%</span>
                        </div>
                      </div>
                      <Link to={course.href} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        Lanjutkan
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Anda belum mendaftar kursus apa pun.</p>
              )}
            </section>

            {/* Completed Courses */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Kursus yang Telah Selesai</h2>
              {completedCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {completedCourses.map(course => (
                    <div key={course.id} className="bg-white p-4 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
                      <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                      <h3 className="font-bold text-slate-800 text-lg mb-4">{course.title}</h3>
                      <Link 
                        to={`/certificate/${course.href.split('/').pop()}`}
                        className="w-full text-center bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 flex items-center justify-center gap-2"
                      >
                        <Award className="w-5 h-5" />
                        Lihat Sertifikat
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Anda belum menyelesaikan kursus apa pun.</p>
              )}
            </section>
          </main>

          {/* Sidebar Profile */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24">
              <h2 className="text-xl font-bold text-slate-800 mb-6">Profil Saya</h2>
              <div className="flex items-center mb-6">
                <img src={UserProfile.avatar} alt={UserProfile.name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">{UserProfile.name}</h3>
                  <p className="text-slate-500 text-sm">{UserProfile.email}</p>
                </div>
              </div>
              <div className="space-y-4 text-slate-600">
                <div className="flex items-center">
                  <BookOpen className="w-5 h-5 mr-3 text-blue-500" />
                  <span>{courses.length} Total Kursus</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 mr-3 text-green-500" />
                  <span>{completedCourses.length} Sertifikat Diperoleh</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-slate-500" />
                  <span>Bergabung Sejak {UserProfile.joinDate}</span>
                </div>
              </div>
              <button className="w-full mt-8 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg font-semibold hover:bg-slate-200">
                Edit Profil
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;