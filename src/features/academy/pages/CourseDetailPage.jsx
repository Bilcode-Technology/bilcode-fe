import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, Menu, BookOpen, Clock, BarChart, CheckCircle, Search, Command, PlayCircle, Lock } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { courses as allCoursesData } from '../data/courses'; // Assuming this is the source of all courses
import Quiz from '../components/Quiz'; // Import the Quiz component
import Reviews from '../components/Reviews'; // Import the Reviews component
import ReviewForm from '../components/ReviewForm'; // Import the ReviewForm component
import QnASection from '../components/QnASection';
import { qnaData } from '../data/qnaData';
import BadgeNotification from '../components/BadgeNotification';

// Mock Quiz Data
const quizData = {
  title: "Kuis Singkat: Fundamental React Router",
  questions: [
    {
      question: "Manakah hook yang digunakan untuk navigasi programmatic di React Router?",
      choices: ["useState", "useEffect", "useNavigate", "useContext"],
      correctAnswer: 2
    },
    {
      question: "Komponen apa yang digunakan untuk merender UI dari sebuah rute yang cocok?",
      choices: ["<Route>", "<Link>", "<Outlet>", "<Switch>"],
      correctAnswer: 0
    },
    {
      question: "Bagaimana cara menangkap segmen dinamis dari URL, seperti ID produk?",
      choices: ["useParams()", "useLocation()", "useHistory()", "useRouteMatch()"],
      correctAnswer: 0
    }
  ]
};

// This page now gets course data from router params and context

const CourseDetailPage = () => {
  const { courseId } = useParams();
  // Get awardBadge function from context
  const { user, courses, updateCourseProgress, addReview, isAuthenticated, awardBadge, login, logout } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTopic, setActiveTopic] = useState({ sectionIndex: 0, topicIndex: 0 });
  // State to hold the badge for the notification
  const [newlyAwardedBadge, setNewlyAwardedBadge] = useState(null);

  // Find the specific course from the context or all courses data
  const course = useMemo(() => 
    courses.find(c => c.href.endsWith(courseId)) || allCoursesData.find(c => c.href.endsWith(courseId)), 
    [courses, courseId]
  );

  // Mock curriculum if not present in course data
  const curriculum = useMemo(() => course?.curriculum || [
    { section: '00 Prolog', topics: ['Pendahuluan', 'Kenapa React Router v7?'] },
    { section: 'Kuis Bab 1', topics: [{ type: 'quiz', title: 'Kuis Prolog' }] },
    { section: '01 Pembahasan', topics: ['Instalasi', 'Pengenalan Direktori', 'Routing Basic', 'Routing Nested', 'Routing Dynamic Segments', 'Routing Prefix', 'Routing Layout', 'Styling', 'Meta Tags', 'Navigasi', 'Data Loading', 'Actions', 'Autentikasi', 'Resource Routes', 'Streaming', 'Error Handling'] },
  ], [course]);

  const completedTopics = useMemo(() => new Set(course?.completedTopics || []), [course]);

  const totalTopics = useMemo(() => 
    curriculum.reduce((acc, section) => acc + section.topics.length, 0),
    [curriculum]
  );

  const progress = useMemo(() => 
    totalTopics > 0 ? (completedTopics.size / totalTopics) * 100 : 0,
    [completedTopics.size, totalTopics]
  );

  const handleToggleComplete = (sectionIndex, topicIndex) => {
    if (!isAuthenticated || !awardBadge) return; // Or prompt to login
    const topicId = `${sectionIndex}-${topicIndex}`;
    const newCompleted = new Set(completedTopics);

    // Only award badges when completing a topic, not un-completing
    if (!newCompleted.has(topicId)) {
      newCompleted.add(topicId);

      // Check for badge criteria
      if (newCompleted.size === 1) {
        const badge = awardBadge('FIRST_STEP');
        if (badge) setNewlyAwardedBadge(badge);
      }
      if (newCompleted.size === 5) {
        const badge = awardBadge('FIVE_TOPICS');
        if (badge) setNewlyAwardedBadge(badge);
      }
      
      const newProgress = totalTopics > 0 ? (newCompleted.size / totalTopics) * 100 : 0;
      if (newProgress >= 100) {
        const badge = awardBadge('COURSE_COMPLETE');
        if (badge) setNewlyAwardedBadge(badge);
      }
      
      updateCourseProgress(course.id, newProgress, Array.from(newCompleted));

    } else {
      // Logic for un-completing a topic
      newCompleted.delete(topicId);
      const newProgress = totalTopics > 0 ? (newCompleted.size / totalTopics) * 100 : 0;
      updateCourseProgress(course.id, newProgress, Array.from(newCompleted));
    }
  };

  const handleNavigation = (direction) => {
    let { sectionIndex, topicIndex } = activeTopic;
    if (direction === 'next') {
      topicIndex++;
      if (topicIndex >= curriculum[sectionIndex].topics.length) {
        topicIndex = 0;
        sectionIndex++;
      }
    } else { // prev
      topicIndex--;
      if (topicIndex < 0) {
        sectionIndex--;
        if (sectionIndex >= 0) {
          topicIndex = curriculum[sectionIndex].topics.length - 1;
        }
      }
    }
    if (sectionIndex >= 0 && sectionIndex < curriculum.length) {
      setActiveTopic({ sectionIndex, topicIndex });
    }
  };

  const isFirstTopic = activeTopic.sectionIndex === 0 && activeTopic.topicIndex === 0;
  const isLastTopic = activeTopic.sectionIndex === curriculum.length - 1 && activeTopic.topicIndex === curriculum[activeTopic.sectionIndex].topics.length - 1;

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsSidebarOpen(mediaQuery.matches);
    const handler = (e) => setIsSidebarOpen(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // If course data is not found
  if (!course) {
    return (
      <div className="bg-white text-black pt-40 pb-20 text-center">
        <h1 className="text-4xl font-bold">404 - Course Not Found</h1>
        <Link to="/academy" className="mt-8 inline-block text-blue-600 hover:underline">
          &larr; Back to Academy
        </Link>
      </div>
    );
  }

  const currentTopicObject = curriculum[activeTopic.sectionIndex].topics[activeTopic.topicIndex];
  const currentTopic = typeof currentTopicObject === 'object' ? currentTopicObject.title : currentTopicObject;
  const isQuiz = typeof currentTopicObject === 'object' && currentTopicObject.type === 'quiz';

  return (
    <div className="bg-white text-gray-800 font-sans">
      <BadgeNotification badge={newlyAwardedBadge} />
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col ${isSidebarOpen ? 'w-80 p-6' : 'w-0 p-0'}`}
        >
          <div className={`w-68 flex-grow overflow-y-auto ${!isSidebarOpen && 'hidden'}`}>
            <div className="flex items-center mb-8">
              <img src={user?.avatar || 'https://i.pravatar.cc/150?u=guest'} alt={user?.name || 'Guest'} className="w-10 h-10 rounded-full mr-3" />
              <span className="font-semibold text-gray-900">{user?.name || 'Guest'}</span>
            </div>
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari pelajaran"
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs flex items-center">
                <Command size={12} className="mr-1" /> K
              </div>
            </div>
            <nav>
              <ul>
                {curriculum.map((item, sectionIndex) => (
                  <li key={sectionIndex} className="mb-6">
                    <h3 className="text-gray-500 text-sm font-bold mb-3 px-3">{item.section}</h3>
                    <ul>
                      {item.topics.map((topic, topicIndex) => {
                        const topicId = `${sectionIndex}-${topicIndex}`;
                        const isCompleted = completedTopics.has(topicId);
                        const isActive = activeTopic.sectionIndex === sectionIndex && activeTopic.topicIndex === topicIndex;
                        const topicTitle = typeof topic === 'object' ? topic.title : topic;
                        return (
                          <li key={topicIndex}>
                            <div
                              onClick={() => setActiveTopic({ sectionIndex, topicIndex })}
                              className={`flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 whitespace-nowrap ${
                                isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'
                              }`}
                            >
                              <span className={`mr-2 ${isCompleted ? 'line-through text-gray-500' : ''}`}>{topicTitle}</span>
                              <input 
                                type="checkbox" 
                                checked={isCompleted}
                                onChange={() => handleToggleComplete(sectionIndex, topicIndex)}
                                className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                                onClick={(e) => e.stopPropagation()} // Prevent topic selection when clicking checkbox
                              />
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white">
          {/* Header */}
          <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-20">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
              <Link to="/academy" className="p-2 rounded-full hover:bg-gray-100">
                <ChevronLeft size={20} />
              </Link>
              <div className="ml-4">
                <span className="font-semibold hidden md:block text-gray-900">{course.title}</span>
                <span className="text-sm text-gray-500">Progres: {progress.toFixed(0)}%</span>
              </div>
            </div>
            
          </header>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 h-2">
            <div className="bg-blue-600 h-2" style={{ width: `${progress}%` }}></div>
          </div>

          {isAuthenticated ? (
            <div className="p-6 md:p-12">
              <div className="max-w-4xl mx-auto">
                {isQuiz ? (
                  <Quiz quizData={quizData} />
                ) : (
                  <>
                    <div className="bg-gray-900 aspect-video rounded-2xl mb-6 flex items-center justify-center">
                      <PlayCircle className="w-20 h-20 text-white/70" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentTopic}</h1>
                    <p className="text-lg text-gray-700 mb-8">
                      Ini adalah deskripsi untuk pelajaran \"{currentTopic}\". Konten video dan materi pendukung akan ditampilkan di sini.
                    </p>
                  </>
                )}
                
                <div className="flex justify-between items-center mt-12 border-t pt-6">
                   <button 
                     onClick={() => handleNavigation('prev')} 
                     disabled={isFirstTopic}
                     className="bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     Pelajaran Sebelumnya
                   </button>
                   <button 
                     onClick={() => handleNavigation('next')} 
                     disabled={isLastTopic}
                     className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     Pelajaran Selanjutnya
                   </button>
                </div>

                <section className="mt-16 pt-8 border-t">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Ulasan Siswa ({course.reviews?.length || 0})</h2>
                  <Reviews reviews={course.reviews} />
                  {isAuthenticated && progress === 100 && !course.reviews?.some(r => r.name === user.name) && (
                    <ReviewForm onSubmit={(reviewData) => addReview(course.id, reviewData)} />
                  )}
                </section>

                <section className="mt-16 pt-8 border-t">
                  <QnASection qnaData={qnaData} />
                </section>
              </div>
            </div>
          ) : (
            <div className="relative p-6 md:p-12">
              <div className="max-w-4xl mx-auto filter blur-sm pointer-events-none">
                <div className="bg-gray-900 aspect-video rounded-2xl mb-6 flex items-center justify-center">
                  <PlayCircle className="w-20 h-20 text-white/70" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentTopic}</h1>
                <p className="text-lg text-gray-700 mb-8">
                  Konten pelajaran hanya tersedia untuk anggota terdaftar.
                </p>
              </div>
              <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border max-w-md">
                  <Lock className="w-12 h-12 mx-auto text-blue-500 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-800 mb-3">Akses Konten Eksklusif</h2>
                  <p className="text-slate-600 mb-8">Untuk melanjutkan pembelajaran dan mengakses semua fitur, silakan masuk atau daftar terlebih dahulu.</p>
                  <div className="flex gap-4">
                    <Link to="/login" className="flex-1 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">
                      Masuk
                    </Link>
                    <Link to="/register" className="flex-1 bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-lg hover:bg-slate-300 transition">
                      Daftar Sekarang
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseDetailPage;