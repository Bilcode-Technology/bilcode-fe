import React, { createContext, useState, useContext } from 'react';
import { courses as allCourses } from '../features/academy/data/courses.jsx';

const AuthContext = createContext(null);

// Initial user data with courses
const initialCourses = allCourses.map(course => ({ ...course, progress: 0, completedTopics: [] }));

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userCourses, setUserCourses] = useState([]);

  const login = (userData) => {
    setUser(userData);
    // Simulate fetching user's enrolled courses
    setUserCourses(initialCourses);
  };

  const logout = () => {
    setUser(null);
    setUserCourses([]);
  };

  const updateCourseProgress = (courseId, newProgress, newCompletedTopics) => {
    setUserCourses(prevCourses => 
      prevCourses.map(course => 
        course.id === courseId 
          ? { ...course, progress: newProgress, completedTopics: newCompletedTopics }
          : course
      )
    );
  };

  const addReview = (courseId, reviewData) => {
    setUserCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          const newReview = {
            id: (course.reviews?.length || 0) + 1,
            name: user.name, // Use the logged-in user's name
            ...reviewData,
          };
          const updatedReviews = course.reviews ? [...course.reviews, newReview] : [newReview];
          // Recalculate score
          const totalScore = updatedReviews.reduce((acc, rev) => acc + rev.rating, 0);
          const newScore = totalScore / updatedReviews.length;

          return { ...course, reviews: updatedReviews, score: newScore };
        }
        return course;
      })
    );
  };

  const value = {
    user,
    login,
    logout,
    courses: userCourses,
    updateCourseProgress,
    addReview, // Add the new function to the context value
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
