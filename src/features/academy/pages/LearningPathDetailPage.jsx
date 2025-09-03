
import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getLearningPathById } from '../api';
import { useAuth } from '../../../context/AuthContext';
import { ArrowLeft, CheckCircle } from 'lucide-react';

const LearningPathDetailPage = () => {
  const { pathId } = useParams();
  const { courses: userCourses } = useAuth();
  const [path, setPath] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLearningPathById(pathId).then(data => {
      setPath(data);
      setIsLoading(false);
    });
  }, [pathId]);

  const pathCourses = useMemo(() => {
    if (!path) return [];
    return path.courses.map(courseInfo => {
      const userCourseData = userCourses.find(uc => uc.id === courseInfo.id);
      return { ...courseInfo, ...userCourseData };
    });
  }, [path, userCourses]);

  const totalProgress = useMemo(() => {
    if (pathCourses.length === 0) return 0;
    const total = pathCourses.reduce((acc, course) => acc + (course.progress || 0), 0);
    return total / pathCourses.length;
  }, [pathCourses]);

  if (isLoading) {
    return <div className="text-center py-40">Memuat...</div>;
  }

  if (!path) {
    return (
      <div className="bg-white pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold text-slate-800">404 - Jalur Belajar Tidak Ditemukan</h1>
        <Link to="/academy/paths" className="mt-8 inline-block text-blue-600 hover:underline">&larr; Kembali</Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="mb-12">
          <Link to="/academy/paths" className="flex items-center text-blue-600 hover:underline mb-4"><ArrowLeft className="w-4 h-4 mr-2" /> Kembali</Link>
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">{path.title}</h1>
          <p className="mt-4 text-xl text-slate-600">{path.description}</p>
          <div className="mt-6">
            <p className="font-semibold text-slate-700">Progres Keseluruhan:</p>
            <div className="w-full bg-slate-200 rounded-full h-4 mt-2">
              <div className="bg-blue-600 h-4 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ width: `${totalProgress.toFixed(0)}%` }}>
                {totalProgress.toFixed(0)}%
              </div>
            </div>
          </div>
        </header>

        <main className="space-y-6">
          {pathCourses.map((course, index) => (
            <Link to={course.href} key={course.id} className="block bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow flex items-center gap-6">
              <div className="text-3xl font-bold text-slate-300">{index + 1}</div>
              <img src={course.image} alt={course.title} className="w-32 h-20 object-cover rounded-lg" />
              <div className="flex-grow">
                <h3 className="font-bold text-slate-800 text-lg">{course.title}</h3>
                <div className="w-full bg-slate-200 rounded-full h-2.5 mt-2">
                  <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${course.progress || 0}%` }}></div>
                </div>
              </div>
              {course.progress === 100 && <CheckCircle className="w-8 h-8 text-green-500 flex-shrink-0" />}
            </Link>
          ))}
        </main>
      </div>
    </div>
  );
};

export default LearningPathDetailPage;
