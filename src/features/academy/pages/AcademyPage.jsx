import React from 'react';
import { Link } from 'react-router-dom';
import { courses } from '../data/courses.jsx';
import Testimonials from "../../../components/Testimonials";
import Subscription from '../components/Subscription';

import { ArrowRight } from 'lucide-react';

const AcademyPage = () => {
  const featuredCourses = courses.slice(0, 3);

  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border border-gray-200';
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-white pt-40 pb-20 text-gray-900 text-center border-b border-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            Future-Proof Your Skills
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Join Bilcode Academy and learn the most in-demand tech skills from industry experts.
          </p>
          <Link
            to="/academy/courses"
            className="mt-8 inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Explore All Courses
          </Link>
        </div>
      </div>

      {/* Featured Courses Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Featured Courses
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Get started with our most popular courses.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCourses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden transform hover:-translate-y-2 transition-all duration-300 ease-in-out group hover:shadow-xl"
              >
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-gray-700">
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
                    className="inline-flex items-center font-semibold text-gray-700 hover:text-gray-900 group-hover:text-gray-900 transition-colors duration-300"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </a>
                </div>
                <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-2">
                      {course.type === 'video' ? 'Video Course' : 'Reading Material'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-16">
            <Link
              to="/academy/courses"
              className="inline-block bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-3 px-6 rounded-full text-lg transition-colors border border-gray-200 hover:border-gray-300"
            >
              View All Courses
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Subscription Section */}
      <Subscription 
        title="Ready to Start Learning?"
        description="Sign up for our newsletter to get the latest updates on new courses and promotions."
      />
    </div>
  );
};

export default AcademyPage;