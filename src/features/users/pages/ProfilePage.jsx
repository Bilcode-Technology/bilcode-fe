import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Award, BookOpen, Mail, User } from 'lucide-react';

// In a real app, you would fetch user data based on username param
// For this example, we'll just display the currently logged-in user's profile.

const ProfilePage = () => {
  const { username } = useParams();
  const { user, courses: enrolledCourses, badges } = useAuth();

  // This is where you would fetch the profile data, e.g.:
  // const { data: profile, isLoading } = useProfile(username);
  // For now, we use the authenticated user.
  const profile = user;
  const isLoading = false; // a

  if (isLoading) {
    return <div className="text-center py-40">Memuat Profil...</div>;
  }

  if (!profile) {
    return (
      <div className="text-center py-40">
        <h1 className="text-3xl font-bold">Profil tidak ditemukan.</h1>
        <Link to="/" className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg">Kembali ke Beranda</Link>
      </div>
    );
  }

  const completedCourses = enrolledCourses.filter(c => c.progress === 100);

  return (
    <div className="bg-slate-100 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        
        <header className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
          <img src={profile.avatar} alt={profile.name} className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-md" />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900">{profile.name}</h1>
            <p className="text-xl text-slate-600 font-semibold mt-1">Siswa di Bilcode Academy</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
              <div className="flex items-center text-slate-600"><Mail className="w-5 h-5 mr-2" /> {profile.email}</div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Badges */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><Award className="w-6 h-6 mr-3 text-yellow-500" /> Lencana</h2>
              {badges.length > 0 ? (
                <div className="grid grid-cols-3 gap-4">
                  {badges.map(badge => (
                    <div key={badge.id} className="text-center group">
                      <div className="w-20 h-20 mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <badge.Icon className="w-full h-full" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">{badge.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Belum ada lencana yang didapat.</p>
              )}
            </div>
          </div>

          {/* Right Column: Completed Courses */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BookOpen className="w-6 h-6 mr-3 text-blue-500" /> Kursus Selesai</h2>
              {completedCourses.length > 0 ? (
                <div className="space-y-4">
                  {completedCourses.map(course => (
                    <Link to={course.href} key={course.id} className="block bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
                      <h3 className="font-semibold text-slate-800">{course.title}</h3>
                      <p className="text-sm text-slate-500">Oleh {course.author}</p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500">Belum ada kursus yang selesai. Teruslah belajar!</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
