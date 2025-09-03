import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Twitter, Linkedin, ExternalLink, BookOpen, Clock, Star } from 'lucide-react';
import { instructors } from '../data/instructors';
import { courses } from '../data/courses';
import StarRating from '../components/StarRating';

const InstructorDetailPage = () => {
  const { instructorId } = useParams();
  const instructor = instructors.find(inst => inst.id === parseInt(instructorId));
  const instructorCourses = courses.filter(course => course.author === instructor?.name);

  if (!instructor) {
    return (
      <div className="bg-white pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold text-slate-800">404 - Instruktur Tidak Ditemukan</h1>
        <Link to="/academy/instructors" className="mt-8 inline-block text-blue-600 hover:underline">
          &larr; Kembali ke Daftar Instruktur
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Instructor Profile Header */}
        <header className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 mb-12">
          <img 
            src={instructor.image} 
            alt={instructor.name} 
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-slate-900">{instructor.name}</h1>
            <p className="text-xl text-blue-600 font-semibold mt-1">{instructor.title}</p>
            <p className="text-slate-600 mt-4 max-w-xl">{instructor.subtitle}</p>
            <div className="flex items-center justify-center md:justify-start gap-4 mt-6">
              <a href={instructor.social.twitter} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500"><Twitter /></a>
              <a href={instructor.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-blue-500"><Linkedin /></a>
              <a href={instructor.portfolio} target="_blank" rel="noopener noreferrer" className="flex items-center text-sm font-semibold text-slate-600 hover:text-blue-600">
                <ExternalLink className="w-4 h-4 mr-1" />
                Portofolio
              </a>
            </div>
          </div>
        </header>

        {/* Courses by Instructor */}
        <main>
          <h2 className="text-3xl font-bold text-slate-800 mb-8">Kursus oleh {instructor.name}</h2>
          {instructorCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {instructorCourses.map((course) => (
                <Link to={course.href} key={course.id} className="block bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-200 transition-all duration-300 hover:-translate-y-2 group">
                  <div className="relative overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${ 
                        course.level === 'Pemula' ? 'bg-blue-100 text-blue-800' :
                        course.level === 'Menengah' ? 'bg-sky-100 text-sky-800' :
                        'bg-indigo-100 text-indigo-800'
                      }`}>
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1">
                        <StarRating rating={course.score} />
                        <span className="text-sm font-semibold text-slate-700 ml-1">{course.score}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight">{course.title}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 text-sm text-slate-500">
                      <div className="flex items-center gap-1"><Clock className="w-4 h-4" />{course.duration}</div>
                      <div className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{course.students} Siswa</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="bg-white p-8 rounded-2xl shadow-md text-center text-slate-600">{instructor.name} belum memiliki kursus saat ini.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default InstructorDetailPage;