import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCourseData } from '../hooks/useCourseData';
import { useCourseAccess, CourseAccessLevel } from '../hooks/useCourseAccess';
import { getInstructorById, getCoursesByAuthorName } from '../api';
import StarRating from '../components/StarRating';
import Reviews from '../components/Reviews';
import { Check, Play, BookOpen, Users, Award, Clock, ChevronDown, ChevronUp } from 'lucide-react';

const CourseLandingPage = () => {
  const { courseSlug } = useParams();
  const { course, isLoading, error } = useCourseData(courseSlug);
  const { level: accessLevel } = useCourseAccess(course?.id);
  const [instructor, setInstructor] = useState(null);
  const [otherCourses, setOtherCourses] = useState([]);
  const [openSections, setOpenSections] = useState({});

  useEffect(() => {
    if (course?.authorId) {
      getInstructorById(course.authorId).then(inst => {
        setInstructor(inst);
        if (inst) {
          getCoursesByAuthorName(inst.name).then(allAuthorCourses => {
            const filteredCourses = allAuthorCourses.filter(c => c.id !== course.id);
            setOtherCourses(filteredCourses);
          });
        }
      });
    }
    if (course?.curriculum) {
      setOpenSections({ 0: true });
    }
  }, [course]);

  const toggleSection = (index) => {
    setOpenSections(prev => ({ ...prev, [index]: !prev[index] }));
  };

  if (isLoading) {
    return <div className="text-center py-40">Memuat Detail Kursus...</div>;
  }

  if (error || !course) {
    return <div className="text-center py-40 text-red-500">{error || 'Kursus tidak ditemukan.'}</div>;
  }

  const stats = [
    { icon: Users, label: 'Siswa', value: `${course.students.toLocaleString('id-ID')}` },
    { icon: Clock, label: 'Durasi', value: course.duration },
    { icon: BookOpen, label: 'Pelajaran', value: `${course.curriculum.reduce((acc, s) => acc + s.topics.length, 0)}` },
    { icon: Award, label: 'Sertifikat', value: course.certificationIncluded ? 'Termasuk' : 'Tidak' },
  ];

  const renderCTAButton = () => {
    if (accessLevel === CourseAccessLevel.FULL_ACCESS) {
      return (
        <Link to={`/academy/learn/${course.slug}`} className="block w-full text-center bg-blue-600 text-white font-bold py-4 rounded-lg text-lg hover:bg-blue-700 transition">
          Lanjutkan Belajar
        </Link>
      );
    }
    return (
      <Link to={`/academy/pricing?course_slug=${course.slug}`} className="block w-full text-center bg-blue-600 text-white font-bold py-4 rounded-lg text-lg hover:bg-blue-700 transition">
        Daftar Kursus Ini
      </Link>
    );
  };

  return (
    <div className="bg-slate-50">
      {/* Hero Section */}
      <div className="bg-slate-900 text-white pt-40 pb-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">{course.title}</h1>
            <p className="text-xl text-slate-300 mt-4">{course.description}</p>
            <div className="flex items-center gap-4 mt-6">
              <StarRating rating={course.score} />
              <span className="font-bold">{course.score}</span>
              <span className="text-slate-400">({course.reviews.length} ulasan)</span>
            </div>
            {instructor && <p className="mt-4 text-slate-300">Dibuat oleh <Link to={`/academy/instructors/${instructor.id}`} className="font-bold text-white hover:underline">{instructor.name}</Link></p>}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <h2 className="text-2xl font-bold mb-4">Apa yang akan Anda Pelajari</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {course.learningOutcomes.map((outcome, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Curriculum */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Kurikulum Kursus</h2>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                {course.curriculum.map((section, index) => (
                  <div key={index} className="border-b last:border-b-0">
                    <button onClick={() => toggleSection(index)} className="w-full flex justify-between items-center p-6 text-left">
                      <h3 className="text-lg font-bold">{section.section}</h3>
                      {openSections[index] ? <ChevronUp /> : <ChevronDown />}
                    </button>
                    {openSections[index] && (
                      <ul className="px-6 pb-6 space-y-3">
                        {section.topics.map((topic, tIndex) => (
                          <li key={tIndex} className="flex items-center gap-3 text-slate-600">
                            <Play className="w-5 h-5 text-blue-500 flex-shrink-0" />
                            <span>{topic.title}</span>
                            <span className="ml-auto text-sm text-slate-500">{topic.duration}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Ulasan Siswa</h2>
              <Reviews reviews={course.reviews} />
            </div>

            {/* More from instructor */}
            {otherCourses.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Kursus Lain dari {instructor.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {otherCourses.map(otherCourse => (
                    <Link to={`/academy/course/${otherCourse.slug}`} key={otherCourse.id} className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group">
                      <img src={otherCourse.image} alt={otherCourse.title} className="w-full h-40 object-cover" />
                      <div className="p-4">
                        <h3 className="font-bold text-lg group-hover:text-blue-600 transition-colors">{otherCourse.title}</h3>
                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <StarRating rating={otherCourse.score} />
                          <span>{otherCourse.score}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:sticky top-28 self-start">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <img src={course.image} alt={course.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold">${course.price}</span>
                  {course.originalPrice && <span className="text-xl text-slate-500 line-through">${course.originalPrice}</span>}
                </div>
                {renderCTAButton()}
                <div className="grid grid-cols-2 gap-4 mt-6 text-center">
                  {stats.map(stat => (
                    <div key={stat.label}>
                      <stat.icon className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                      <p className="font-bold text-sm">{stat.value}</p>
                      <p className="text-xs text-slate-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseLandingPage;