import React from 'react';

const DashboardPage = () => {
  // Mock data - in a real app, this would come from an API after login
  const userData = {
    name: "Rizky 28 Eka",
    enrolledCourses: [
      {
        id: 1,
        title: "Mahir React & Next.js Tingkat Lanjut",
        progress: 75, // percentage
        image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
      },
      {
        id: 2,
        title: "Dasar-Dasar Desain UI/UX",
        progress: 30,
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop",
      },
    ]
  };

  return (
    <div className="bg-slate-50 min-h-screen py-32">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Selamat Datang, {userData.name}!</h1>
          <p className="text-lg text-slate-600 mt-2">Lanjutkan progres belajar Anda dan raih tujuan karir Anda.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Kursus Anda</h2>
          {userData.enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {userData.enrolledCourses.map(course => (
                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img src={course.image} alt={course.title} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-800 mb-4">{course.title}</h3>
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-slate-600">Progres</span>
                        <span className="text-sm font-semibold text-blue-600">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                    <button className="mt-6 w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors">
                      Lanjutkan Belajar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <p className="text-slate-600">Anda belum terdaftar di kursus manapun.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
