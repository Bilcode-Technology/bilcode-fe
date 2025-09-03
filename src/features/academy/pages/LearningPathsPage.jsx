
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLearningPaths } from '../api';
import { ArrowRight, Book, CheckCircle } from 'lucide-react';

const LearningPathsPage = () => {
  const [paths, setPaths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLearningPaths().then(data => {
      setPaths(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="text-center py-40">Memuat Jalur Belajar...</div>;
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Jalur Belajar</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">Peta jalan yang disusun oleh para ahli untuk mencapai tujuan karir Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {paths.map(path => {
            const totalDuration = path.courses.reduce((acc, course) => acc + parseInt(course.duration), 0);
            return (
              <Link 
                to={`/academy/paths/${path.id}`}
                key={path.id}
                className="block bg-white rounded-2xl shadow-lg p-8 flex flex-col group"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600">{path.title}</h2>
                <p className="text-slate-600 mb-6 flex-grow">{path.description}</p>
                <div className="space-y-4 mb-6">
                    <div className="flex items-center text-slate-500"><Book className="w-5 h-5 mr-3 text-blue-500" /><span>{path.courses.length} Kursus</span></div>
                    <div className="flex items-center text-slate-500"><CheckCircle className="w-5 h-5 mr-3 text-green-500" /><span>Estimasi {totalDuration} jam</span></div>
                </div>
                <div className="flex items-center font-semibold text-blue-600">Lihat Detail <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" /></div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPathsPage;
