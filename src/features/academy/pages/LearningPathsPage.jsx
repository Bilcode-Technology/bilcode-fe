import React from 'react';
import { Link } from 'react-router-dom';
import { learningPaths } from '../data/learningPaths';
import { courses } from '../data/courses';
import { ArrowRight, Book, CheckCircle } from 'lucide-react';

const LearningPathsPage = () => {
  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-slate-900 tracking-tight">Jalur Belajar</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-3xl mx-auto">
            Pilih peta jalan yang telah disusun oleh para ahli untuk mencapai tujuan karir Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learningPaths.map(path => {
            const pathCourses = courses.filter(c => path.courses.includes(c.id));
            const totalDuration = pathCourses.reduce((acc, course) => acc + parseInt(course.duration), 0);

            return (
              <Link 
                to={`/academy/paths/${path.id}`}
                key={path.id}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group p-8 flex flex-col"
              >
                <h2 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">{path.title}</h2>
                <p className="text-slate-600 mb-6 flex-grow">{path.description}</p>
                
                <div className="space-y-4 mb-6">
                    <div className="flex items-center text-slate-500">
                        <Book className="w-5 h-5 mr-3 text-blue-500" />
                        <span>{path.courses.length} Kursus</span>
                    </div>
                    <div className="flex items-center text-slate-500">
                        <CheckCircle className="w-5 h-5 mr-3 text-green-500" />
                        <span>Estimasi {totalDuration} jam belajar</span>
                    </div>
                </div>

                <div className="flex items-center font-semibold text-blue-600">
                  Lihat Detail Jalur
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearningPathsPage;