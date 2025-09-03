import * as db from './mockData.jsx';

/**
 * ============================================================================
 * --- API UTILITIES ---
 * Core helpers for simulating network requests and handling data processing.
 * ============================================================================
 */

/**
 * Simulates a network request with a configurable delay and a chance of failure.
 * This enhances realism by mimicking real-world network conditions.
 *
 * @param {Function} dataProducer - A function that synchronously returns the desired data.
 *   This function can throw an error to simulate a server-side processing failure.
 * @param {number} [delay=500] - The delay in milliseconds to simulate network latency.
 * @returns {Promise<any>} A promise that resolves with the produced data or rejects with an error.
 */
const simulateNetworkRequest = (dataProducer, delay = 500) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const data = dataProducer();
        // 5% chance of a random network error
        if (Math.random() < 0.05) {
          reject(new Error("Gagal mengambil data dari server. Silakan coba lagi."));
        } else {
          resolve(data);
        }
      } catch (error) {
        console.error("API Simulation Error:", error);
        reject(error);
      }
    }, delay);
  });

/**
 * A simplified network simulator for operations that are expected to always succeed,
 * like updating local state that mimics a backend call.
 *
 * @param {any} data - The data to be returned upon success.
 * @param {number} [delay=300] - The simulation delay.
 * @returns {Promise<{success: boolean, ...data: any}>} A promise that resolves with a success status and data.
 */
const simulateSuccessfulMutation = (data, delay = 300) =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve({ success: true, ...data });
    }, delay);
  });


/**
 * ============================================================================
 * --- COURSE-RELATED APIs ---
 * Functions for fetching and managing course data.
 * ============================================================================
 */

/**
 * Fetches a list of courses with advanced filtering and sorting.
 * @param {object} [filters={}] - Filtering and sorting options.
 * @returns {Promise<object[]>} A promise resolving to an array of course objects.
 */
export const getCourses = (filters = {}) => {
  return simulateNetworkRequest(() => {
    let result = [...db.COURSES];
    const { level, category, price, search, tags, sortBy } = filters;

    if (level && level !== 'Semua') {
      result = result.filter(c => c.level === level);
    }
    if (category && category !== 'all') {
      result = result.filter(c => c.category.toLowerCase() === category.toLowerCase());
    }
    if (price && price !== 'all') {
      result = result.filter(c => (price === 'free' ? c.price === 0 : c.price > 0));
    }
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.description.toLowerCase().includes(term) ||
        c.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    if (tags?.length > 0) {
      result = result.filter(c => tags.some(tag => c.tags.includes(tag)));
    }

    const sortFunctions = {
      rating: (a, b) => b.score - a.score,
      newest: (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate),
      price_low: (a, b) => a.price - b.price,
      price_high: (a, b) => b.price - a.price,
      default: (a, b) => b.students - a.students,
    };

    result.sort(sortFunctions[sortBy] || sortFunctions.default);
    return result;
  });
};

/**
 * Fetches a single course by its unique slug.
 * @param {string} slug - The slug of the course.
 * @returns {Promise<object>} A promise resolving to the course object.
 * @throws {Error} If the course is not found.
 */
export const getCourseBySlug = (slug) => {
  return simulateNetworkRequest(() => {
    const course = db.COURSES.find(c => c.slug === slug);
    if (!course) throw new Error(`Course with slug "${slug}" not found.`);
    return course;
  });
};

/**
 * Fetches courses marked as "special offer".
 * @returns {Promise<object[]>} A promise resolving to an array of featured courses.
 */
export const getFeaturedCourses = () => {
  return simulateNetworkRequest(() => db.COURSES.filter(c => c.specialOffer).slice(0, 3));
};

/**
 * Fetches the most popular courses based on student count.
 * @returns {Promise<object[]>} A promise resolving to an array of popular courses.
 */
export const getPopularCourses = () => {
  return simulateNetworkRequest(() =>
    [...db.COURSES].sort((a, b) => b.students - a.students).slice(0, 6)
  );
};

/**
 * Fetches the newest courses based on release date.
 * @returns {Promise<object[]>} A promise resolving to an array of new courses.
 */
export const getNewCourses = () => {
  return simulateNetworkRequest(() =>
    [...db.COURSES].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)).slice(0, 4)
  );
};


/**
 * ============================================================================
 * --- INSTRUCTOR-RELATED APIs ---
 * ============================================================================
 */

/**
 * Fetches all instructors.
 * @returns {Promise<object[]>} A promise resolving to an array of instructors.
 */
export const getInstructors = () => simulateNetworkRequest(() => db.INSTRUCTORS);

/**
 * Fetches a single instructor by their ID.
 * @param {string|number} id - The ID of the instructor.
 * @returns {Promise<object>} A promise resolving to the instructor object.
 */
export const getInstructorById = (id) => {
  return simulateNetworkRequest(() => {
    const instructor = db.INSTRUCTORS.find(i => i.id === parseInt(id));
    if (!instructor) throw new Error(`Instructor with id "${id}" not found.`);
    return instructor;
  });
};

/**
 * Fetches courses by a specific author name.
 * @param {string} authorName - The name of the author.
 * @returns {Promise<object[]>} A promise resolving to an array of courses by the author.
 */
export const getCoursesByAuthorName = (authorName) => {
  return simulateNetworkRequest(() => db.COURSES.filter(c => c.author === authorName));
};

/**
 * Fetches the top-rated instructors.
 * @returns {Promise<object[]>} A promise resolving to an array of featured instructors.
 */
export const getFeaturedInstructors = () => {
  return simulateNetworkRequest(() => 
    [...db.INSTRUCTORS].sort((a, b) => b.rating - a.rating).slice(0, 3)
  );
};


/**
 * ============================================================================
 * --- LEARNING PATH APIs ---
 * ============================================================================
 */

/**
 * Fetches all learning paths.
 * @returns {Promise<object[]>} A promise resolving to an array of learning paths.
 */
export const getLearningPaths = () => simulateNetworkRequest(() => db.LEARNING_PATHS);

/**
 * Fetches a single learning path by its ID, with course details populated.
 * @param {string} id - The ID of the learning path.
 * @returns {Promise<object>} A promise resolving to the populated learning path object.
 */
export const getLearningPathById = (id) => {
  return simulateNetworkRequest(() => {
    const path = db.LEARNING_PATHS.find(p => p.id === id);
    if (!path) throw new Error(`Learning path with id "${id}" not found.`);
    
    const populatedCourses = path.courses.map(courseId => 
      db.COURSES.find(c => c.id === courseId)
    ).filter(Boolean); // Filter out any undefined courses

    return { ...path, courses: populatedCourses };
  });
};

/**
 * Fetches the most popular learning paths based on student count.
 * @returns {Promise<object[]>} A promise resolving to an array of popular learning paths.
 */
export const getPopularLearningPaths = () => {
  return simulateNetworkRequest(() => 
    [...db.LEARNING_PATHS].sort((a, b) => b.students - a.students).slice(0, 3)
  );
};


/**
 * ============================================================================
 * --- BLOG & CONTENT APIs ---
 * ============================================================================
 */

/**
 * Fetches blog posts with filtering and sorting.
 * @param {object} [filters={}] - Filtering and sorting options.
 * @returns {Promise<object[]>} A promise resolving to an array of blog posts.
 */
export const getBlogPosts = (filters = {}) => {
  return simulateNetworkRequest(() => {
    let result = [...db.BLOG_POSTS];
    const { tag, search, author, sortBy } = filters;

    if (tag && tag !== 'All') {
      result = result.filter(p => p.tags.includes(tag));
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.summary.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    if (author) {
      result = result.filter(p => p.author === author);
    }

    const sortFunctions = {
      newest: (a, b) => new Date(b.date) - new Date(a.date),
      oldest: (a, b) => new Date(a.date) - new Date(b.date),
      popular: (a, b) => b.views - a.views,
      likes: (a, b) => b.likes - a.likes,
    };

    if (sortBy) {
      result.sort(sortFunctions[sortBy]);
    }
    return result;
  });
};

/**
 * Fetches a single blog post by its slug.
 * @param {string} slug - The slug of the blog post.
 * @returns {Promise<object>} A promise resolving to the blog post object.
 */
export const getBlogPostBySlug = (slug) => {
  return simulateNetworkRequest(() => {
    const post = db.BLOG_POSTS.find(p => p.slug === slug);
    if (!post) throw new Error(`Blog post with slug "${slug}" not found.`);
    return post;
  });
};

/**
 * Fetches featured blog posts.
 * @returns {Promise<object[]>} A promise resolving to an array of featured posts.
 */
export const getFeaturedBlogPosts = () => {
  return simulateNetworkRequest(() => db.BLOG_POSTS.filter(p => p.featured));
};

/**
 * Fetches the most recent blog posts.
 * @returns {Promise<object[]>} A promise resolving to an array of recent posts.
 */
export const getRecentBlogPosts = () => {
  return simulateNetworkRequest(() => 
    [...db.BLOG_POSTS].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
  );
};

/**
 * Fetches all unique tags from blog posts.
 * @returns {Promise<string[]>} A promise resolving to an array of tag strings.
 */
export const getAllTags = () => {
  return simulateNetworkRequest(() => {
    const allTags = db.BLOG_POSTS.reduce((acc, post) => {
      post.tags.forEach(tag => {
        if (!acc.includes(tag)) acc.push(tag);
      });
      return acc;
    }, []);
    return ['All', ...allTags];
  });
};

/**
 * Fetches the most popular tags based on their occurrence count.
 * @returns {Promise<object[]>} A promise resolving to an array of {tag, count} objects.
 */
export const getPopularTags = () => {
  return simulateNetworkRequest(() => {
    const tagCount = {};
    db.BLOG_POSTS.forEach(post => {
      post.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    });
    return Object.entries(tagCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([tag, count]) => ({ tag, count }));
  });
};


/**
 * ============================================================================
 * --- COMMUNITY & Q&A APIs ---
 * ============================================================================
 */

/**
 * Fetches Q&A data with filtering and sorting.
 * @param {object} [filters={}] - Filtering and sorting options.
 * @returns {Promise<object[]>} A promise resolving to an array of Q&A objects.
 */
export const getQnaData = (filters = {}) => {
  return simulateNetworkRequest(() => {
    let result = [...db.QNA_DATA];
    const { tag, search, sortBy } = filters;

    if (tag) {
      result = result.filter(q => q.tags.includes(tag));
    }
    if (search) {
      const term = search.toLowerCase();
      result = result.filter(q => 
        q.question.toLowerCase().includes(term) ||
        q.tags.some(t => t.toLowerCase().includes(term))
      );
    }

    const sortFunctions = {
      newest: (a, b) => b.id - a.id, // Assuming higher ID is newer
      popular: (a, b) => b.votes - a.votes,
    };

    if (sortBy) {
      result.sort(sortFunctions[sortBy]);
    }
    if (filters.sortBy === 'unanswered') {
      result = result.filter(q => q.answers.length === 0);
    }

    return result;
  });
};

/**
 * Fetches a single Q&A thread by its ID.
 * @param {string|number} id - The ID of the Q&A thread.
 * @returns {Promise<object>} A promise resolving to the Q&A object.
 */
export const getQnaById = (id) => {
  return simulateNetworkRequest(() => {
    const qna = db.QNA_DATA.find(q => q.id === parseInt(id));
    if (!qna) throw new Error(`Q&A with id "${id}" not found.`);
    return qna;
  });
};

/**
 * Fetches the most popular questions based on votes.
 * @returns {Promise<object[]>} A promise resolving to an array of popular questions.
 */
export const getPopularQuestions = () => {
  return simulateNetworkRequest(() => 
    [...db.QNA_DATA].sort((a, b) => b.votes - a.votes).slice(0, 5)
  );
};


/**
 * ============================================================================
 * --- GAMIFICATION & PROGRESS APIs (Badges, Leaderboard, etc.) ---
 * ============================================================================
 */

/**
 * Fetches all available badge definitions.
 * @returns {Promise<object>} A promise resolving to the BADGES object.
 */
export const getBadges = () => simulateNetworkRequest(() => db.BADGES);

/**
 * Fetches all available badge definitions as an array.
 * @returns {Promise<object[]>} A promise resolving to an array of badge objects.
 */
export const getAllBadges = () => simulateNetworkRequest(() => Object.values(db.BADGES));

/**
 * Fetches a single badge definition by its ID.
 * @param {string} id - The ID of the badge.
 * @returns {Promise<object>} A promise resolving to the badge object.
 */
export const getBadgeById = (id) => simulateNetworkRequest(() => db.BADGES[id]);

/**
 * Fetches the badges earned by a specific user.
 * @param {string|number} userId - The ID of the user.
 * @returns {Promise<object[]>} A promise resolving to an array of badge objects.
 */
export const getUserBadges = (_userId) => {
  return simulateNetworkRequest(() => {
    // Mock: In a real app, this would be a user-specific lookup.
    const userBadgeIds = ['FIRST_STEP', 'FIVE_TOPICS', 'COURSE_COMPLETE', 'STREAK_7'];
    return userBadgeIds.map(badgeId => db.BADGES[badgeId]).filter(Boolean);
  });
};

/**
 * Fetches leaderboard data with filtering.
 * @param {object} [filters={}] - Filtering options (e.g., timeframe).
 * @returns {Promise<object[]>} A promise resolving to an array of leaderboard entries.
 */
export const getLeaderboard = (filters = {}) => {
  return simulateNetworkRequest(() => {
    let result = [...db.LEADERBOARD_DATA];
    // Mock filtering for demonstration
    if (filters.timeframe === 'weekly') {
      return result.map(user => ({ ...user, points: Math.floor(user.points * 0.3) }));
    } 
    if (filters.timeframe === 'monthly') {
      return result.map(user => ({ ...user, points: Math.floor(user.points * 0.7) }));
    }
    return result;
  });
};

/**
 * Fetches the rank of a specific user.
 * @param {string|number} userId - The ID of the user.
 * @returns {Promise<object>} A promise resolving to the user's rank object.
 */
export const getUserRank = (_userId) => {
  return simulateNetworkRequest(() => {
    // Mock: Find a specific user or return a default object.
    return db.LEADERBOARD_DATA.find(user => user.name === 'Current User') || 
           { rank: 156, name: 'You', points: 2450, level: 'Intermediate' };
  });
};


/**
 * ============================================================================
 * --- METADATA APIs (Categories, Skills, etc.) ---
 * ============================================================================
 */

/**
 * Fetches all course categories.
 * @returns {Promise<object[]>} A promise resolving to an array of category objects.
 */
export const getCategories = () => simulateNetworkRequest(() => db.CATEGORIES);

/**
 * Fetches skills with optional filtering.
 * @param {object} [filters={}] - Filtering options (e.g., category, level).
 * @returns {Promise<object[]>} A promise resolving to an array of skill objects.
 */
export const getSkills = (filters = {}) => {
  return simulateNetworkRequest(() => {
    let result = [...db.SKILLS];
    if (filters.category) {
      result = result.filter(skill => skill.category === filters.category);
    }
    if (filters.level) {
      result = result.filter(skill => skill.level === filters.level);
    }
    return result;
  });
};


/**
 * ============================================================================
 * --- EVENT APIs ---
 * ============================================================================
 */

/**
 * Fetches events with filtering.
 * @param {object} [filters={}] - Filtering options.
 * @returns {Promise<object[]>} A promise resolving to an array of event objects.
 */
export const getEvents = (filters = {}) => {
  return simulateNetworkRequest(() => {
    let result = [...db.EVENTS];
    const now = new Date();

    if (filters.type) {
      result = result.filter(event => event.type === filters.type);
    }
    if (filters.upcoming) {
      result = result.filter(event => new Date(event.date) > now);
    }
    if (filters.search) {
      const term = filters.search.toLowerCase();
      result = result.filter(event => 
        event.title.toLowerCase().includes(term) ||
        event.description.toLowerCase().includes(term) ||
        event.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    return result;
  });
};

/**
 * Fetches a single event by its ID.
 * @param {string|number} id - The ID of the event.
 * @returns {Promise<object>} A promise resolving to the event object.
 */
export const getEventById = (id) => {
  return simulateNetworkRequest(() => {
    const event = db.EVENTS.find(e => e.id === parseInt(id));
    if (!event) throw new Error(`Event with id "${id}" not found.`);
    return event;
  });
};

/**
 * Fetches upcoming events.
 * @returns {Promise<object[]>} A promise resolving to an array of upcoming events.
 */
export const getUpcomingEvents = () => {
  return simulateNetworkRequest(() => {
    const now = new Date();
    return db.EVENTS
      .filter(event => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  });
};

/**
 * Fetches events that are currently live.
 * @returns {Promise<object[]>} A promise resolving to an array of live events.
 */
export const getLiveEvents = () => {
  return simulateNetworkRequest(() => db.EVENTS.filter(event => event.isLive));
};


/**
 * ============================================================================
 * --- USER-SPECIFIC APIs (Notifications, Progress, etc.) ---
 * ============================================================================
 */

/**
 * Fetches user notifications with filtering.
 * @param {object} [filters={}] - Filtering options (e.g., unread, type).
 * @returns {Promise<object[]>} A promise resolving to an array of notifications.
 */
export const getNotifications = (filters = {}) => {
  return simulateNetworkRequest(() => {
    let result = [...db.NOTIFICATIONS];
    if (filters.unread) {
      result = result.filter(n => !n.isRead);
    }
    if (filters.type) {
      result = result.filter(n => n.type === filters.type);
    }
    return result;
  });
};

/**
 * Fetches the count of unread notifications.
 * @returns {Promise<number>} A promise resolving to the count.
 */
export const getUnreadNotificationCount = () => {
  return simulateNetworkRequest(() => db.NOTIFICATIONS.filter(n => !n.isRead).length);
};

/**
 * Marks a notification as read.
 * @param {string|number} notificationId - The ID of the notification.
 * @returns {Promise<{success: boolean}>} A promise indicating success.
 */
export const markNotificationAsRead = (notificationId) => {
  return simulateSuccessfulMutation({}, 300).then(response => {
    const notification = db.NOTIFICATIONS.find(n => n.id === notificationId);
    if (notification) {
      notification.isRead = true;
    }
    return response;
  });
};

/**
 * Fetches overall progress for a user.
 * @param {string|number} userId - The ID of the user.
 * @returns {Promise<object>} A promise resolving to the user's progress data.
 */
export const getUserProgress = (_userId) => simulateNetworkRequest(() => db.PROGRESS_DATA);

/**
 * Fetches a user's study streak data.
 * @param {string|number} userId - The ID of the user.
 * @returns {Promise<object>} A promise resolving to the streak data.
 */
export const getStudyStreak = (_userId) => {
  return simulateNetworkRequest(() => ({
    currentStreak: 12,
    longestStreak: 28,
    studyDays: ['2025-09-01', '2025-09-02', '2025-09-03', '2025-09-04', '2025-08-28', '2025-08-29', '2025-08-30', '2025-08-31'],
    weeklyGoal: 5, // days per week
    weeklyProgress: 4 // current week
  }));
};


/**
 * ============================================================================
 * --- MISCELLANEOUS APIs (Pricing, Nav, Search, etc.) ---
 * ============================================================================
 */

/**
 * Fetches academy-wide statistics.
 * @returns {Promise<object>} A promise resolving to the stats object.
 */
export const getAcademyStats = () => {
  return simulateNetworkRequest(() => {
    const totalCourses = db.COURSES.length;
    const totalStudents = db.COURSES.reduce((sum, course) => sum + course.students, 0);
    const totalReviews = db.COURSES.reduce((sum, course) => sum + (course.reviews?.length || 0), 0);
    const averageRating = db.COURSES.reduce((sum, course) => sum + course.score, 0) / totalCourses;

    return {
      courses: totalCourses,
      students: totalStudents,
      reviews: totalReviews,
      rating: averageRating.toFixed(1),
    };
  });
};

/**
 * Fetches all pricing plans.
 * @returns {Promise<object[]>} A promise resolving to an array of pricing plans.
 */
export const getPricingPlans = () => simulateNetworkRequest(() => db.PRICING_PLANS);

/**
 * Fetches academy navigation items.
 * @returns {Promise<{main: object[], user: object[]}>} A promise resolving to nav items.
 */
export const getAcademyNavItems = () => {
  return simulateNetworkRequest(() => ({ 
    main: db.ACADEMY_NAV_ITEMS, 
    user: db.ACADEMY_USER_NAV_ITEMS 
  }));
};

/**
 * Performs a global search across multiple data types.
 * @param {string} query - The search query.
 * @returns {Promise<object>} A promise resolving to an object with search results.
 */
export const globalSearch = (query) => {
  return simulateNetworkRequest(() => {
    const term = query.toLowerCase();
    if (!term) return { courses: [], instructors: [], blogPosts: [], learningPaths: [] };

    const results = {
      courses: db.COURSES.filter(c => 
        c.title.toLowerCase().includes(term) ||
        c.tags.some(tag => tag.toLowerCase().includes(term))
      ).slice(0, 5),
      
      instructors: db.INSTRUCTORS.filter(i =>
        i.name.toLowerCase().includes(term) ||
        i.expertise.some(skill => skill.toLowerCase().includes(term))
      ).slice(0, 3),
      
      blogPosts: db.BLOG_POSTS.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.tags.some(tag => tag.toLowerCase().includes(term))
      ).slice(0, 3),
      
      learningPaths: db.LEARNING_PATHS.filter(lp =>
        lp.title.toLowerCase().includes(term) ||
        lp.skills.some(skill => skill.toLowerCase().includes(term))
      ).slice(0, 3)
    };
    return results;
  });
};

/**
 * Enrolls a user in a course.
 * @param {string|number} userId - The ID of the user.
 * @param {string|number} courseId - The ID of the course.
 * @returns {Promise<{success: boolean, message: string, enrollmentId: string}>} A promise indicating success.
 */
export const enrollInCourse = (_userId, _courseId) => {
  return simulateSuccessfulMutation({ 
    message: 'Successfully enrolled in course',
    enrollmentId: Math.random().toString(36).substr(2, 9)
  });
};

// Export all data for easier access if needed elsewhere (though direct API calls are preferred)
export {
    db
};