import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import { getBadges } from '../features/academy/api';

const AuthContext = createContext(null);


const calculateInitialProgress = (course) => {
  if (!course.curriculum) return { progress: 0, completedTopics: [] };

  const allTopics = course.curriculum.flatMap(section => section.topics.map(topic => topic.id));
  // Assuming some topics might be pre-completed in mock data
  const completedTopics = course.curriculum
    .flatMap(section => section.topics)
    .filter(topic => topic.completed)
    .map(topic => topic.id);
  
  const totalTopics = allTopics.length;
  const progress = totalTopics > 0 ? (completedTopics.length / totalTopics) * 100 : 0;

  return { progress, completedTopics };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userCourses, setUserCourses] = useState([]);
  const [badges, setBadges] = useState({});

  useEffect(() => {
    // Fetch badges when the provider mounts
    getBadges().then(setBadges);
  }, []);

  // The login function now expects a comprehensive data object from the backend
  // which includes user details and their specific enrolled courses.
  const login = (loginData) => {
    const { user, enrolledCourses } = loginData;

    // Set user data (e.g., name, email, and existing badges)
    setUser(user);
    
    // Calculate initial progress for each course before setting state
    const coursesWithProgress = (enrolledCourses || []).map(course => {
      const { progress, completedTopics } = calculateInitialProgress(course);
      return { ...course, progress, completedTopics };
    });

    setUserCourses(coursesWithProgress);
  };

  const logout = () => {
    setUser(null);
    setUserCourses([]);
  };

  const awardBadge = (badgeId) => {
    // If no user, or badge already earned, do nothing.
    if (!user || user.earnedBadges.includes(badgeId)) {
      return null;
    }

    const badge = badges[badgeId];
    if (!badge) {
      console.warn(`Attempted to award non-existent badge: ${badgeId}`);
      return null;
    }

    setUser(prevUser => ({
      ...prevUser,
      earnedBadges: [...prevUser.earnedBadges, badgeId],
    }));
    
    // Return the badge object so the UI can show a notification
    return badge;
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

  // --- REFACTORED: addReview with Data Normalization ---
  const addReview = (courseId, reviewData) => {
    if (!user) return; // Should not happen if form is only shown to logged-in users

    setUserCourses(prevCourses =>
      prevCourses.map(course => {
        if (course.id === courseId) {
          const newReview = {
            id: uuidv4(), // Generate a unique, stable ID
            userId: user.id, // Store user ID, not name
            createdAt: new Date().toISOString(), // Timestamp for sorting
            ...reviewData, // Contains rating and comment
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

  const toggleTopicCompletion = (courseId, topicId) => {
    let newlyAwardedBadge = null;
    let courseCompleted = false;

    setUserCourses(prevCourses => {
      const newCourses = prevCourses.map(course => {
        if (course.id === courseId) {
          const completedTopics = new Set(course.completedTopics || []);
          const totalTopics = course.curriculum.reduce((acc, section) => acc + section.topics.length, 0);

          // Toggle completion
          if (completedTopics.has(topicId)) {
            completedTopics.delete(topicId);
          } else {
            completedTopics.add(topicId);

            // Badge logic only runs on completion
            if (completedTopics.size === 1) {
              newlyAwardedBadge = awardBadge('FIRST_STEP');
            }
            if (completedTopics.size === 5) {
              newlyAwardedBadge = awardBadge('FIVE_TOPICS');
            }
            if (completedTopics.size === totalTopics) {
              newlyAwardedBadge = awardBadge('COURSE_COMPLETE');
              courseCompleted = true;
            }
          }

          const newProgress = totalTopics > 0 ? (completedTopics.size / totalTopics) * 100 : 0;
          return { ...course, completedTopics: Array.from(completedTopics), progress: newProgress, completed: courseCompleted };
        }
        return course;
      });
      return newCourses;
    });

    return newlyAwardedBadge; // Return badge to UI for notification
  };

  const value = {
    user,
    login,
    logout,
    courses: userCourses,
    updateCourseProgress,
    addReview,
    awardBadge,
    toggleTopicCompletion, // Expose the new master function
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
