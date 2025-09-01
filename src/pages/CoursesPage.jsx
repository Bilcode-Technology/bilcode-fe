import React from 'react';
import { courses } from '../data/courses.jsx';
import { ArrowRight } from 'lucide-react';

const CoursesPage = () => {
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-50 text-green-700';
      case 'intermediate':
        return 'bg-yellow-50 text-yellow-700';
      case 'advanced':
        return 'bg-red-50 text-red-700';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-gray-50 pt-40 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">
            All Courses
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our comprehensive list of courses and find the perfect one for you.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out group"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-blue-500">
                    {React.cloneElement(course.icon, { size: 40, strokeWidth: 1.5 })}
                  </div>
                  <span
                    className={`px-3 py-1 text-sm font-semibold rounded-full ${getLevelColor(course.level)}`}
                  >
                    {course.level}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{course.title}</h3>
                <p className="text-gray-600 mb-6 h-24">{course.description}</p>
                <a
                  href={course.href}
                  className="inline-flex items-center font-semibold text-blue-600 hover:text-blue-800 group-hover:text-blue-800 transition-colors duration-300"
                >
                  <span>Learn More</span>
                  <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
              <div className="bg-gray-50 px-8 py-4">
                <div className="flex items-center text-sm text-gray-500">
                  <span className="mr-2">
                    {course.type === 'video' ? 'Video Course' : 'Reading Material'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
