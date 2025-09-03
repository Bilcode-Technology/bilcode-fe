import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, ExternalLink } from 'lucide-react';
import { getInstructors } from '../api';

const InstructorsPage = () => {
  const [instructors, setInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getInstructors().then(data => {
      setInstructors(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="text-center py-40">Memuat Instruktur...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 pt-32 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Belajar dari yang <span className="text-blue-600">Terbaik</span></h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">Instruktur kami adalah para profesional berpengalaman, siap membimbing Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {instructors.map((instructor) => (
            <Link 
              to={`/academy/instructors/${instructor.id}`}
              key={instructor.id} 
              className="block group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 overflow-hidden transform hover:-translate-y-3 transition-all duration-500 ease-out">
              <div className="relative overflow-hidden">
                <img src={instructor.image} alt={instructor.name} className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{instructor.name}</h3>
                <p className="text-blue-600 font-semibold mb-4">{instructor.title}</p>
                <div className="flex gap-3">
                  <a href={instructor.social.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-lg transition-all"><Twitter className="h-4 w-4" /></a>
                  <a href={instructor.social.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-100 hover:bg-blue-600 text-slate-600 hover:text-white rounded-lg transition-all"><Linkedin className="h-4 w-4" /></a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorsPage;