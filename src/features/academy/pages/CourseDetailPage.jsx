import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/courses.jsx';

const CourseDetailPage = () => {
  const { courseId } = useParams();
  // This is a simple way to find the course. In a real app, you might fetch by ID.
  const course = courses.find(c => c.href.endsWith(courseId));

  if (!course) {
    return (
      <div className="bg-white pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold text-slate-800">404 - Course Not Found</h1>
        <p className="text-lg text-slate-600 mt-4">The course you are looking for does not exist.</p>
        <Link to="/academy" className="mt-8 inline-block text-blue-600 hover:underline">
          &larr; Back to Academy
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-40 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <article>
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">{course.title}</h1>
            <p className="text-slate-500">
              By {course.author} | Level: {course.level}
            </p>
          </header>

          <img
            src={course.image}
            alt={course.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg mb-12"
          />

          <div className="prose prose-lg max-w-none mx-auto text-slate-800 mb-12">
            <p>{course.description}</p>
          </div>

          <div className="text-center">
            <button className="bg-blue-600 text-white font-bold text-lg px-12 py-4 rounded-full hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105">
              Enroll Now for ${course.price}
            </button>
          </div>

          <div className="text-center mt-16">
            <Link to="/academy" className="text-blue-600 hover:underline font-semibold">
              &larr; Back to All Courses
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default CourseDetailPage;
