import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Menu, PlayCircle, Lock, Command, Search, MessageSquare } from 'lucide-react';

import { useAuth } from '../../../context/AuthContext';
import { useCourseAccess, CourseAccessLevel } from '../hooks/useCourseAccess';
import { useCourseData } from '../hooks/useCourseData';

import Quiz from '../components/Quiz';
import Reviews from '../components/Reviews';
import ReviewForm from '../components/ReviewForm';
import QnASection from '../components/QnASection';
import BadgeNotification from '../components/BadgeNotification';
import { getQnaData } from '../api'; // Assuming QnA data might be course-specific later

// Reusable Loading/Error/Access components
const PageState = ({ message, link, linkText }) => (
  <div className="bg-white text-black pt-40 pb-20 text-center">
    <h1 className="text-4xl font-bold">{message}</h1>
    {link && linkText &&
      <Link to={link} className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
        {linkText}
      </Link>
    }
  </div>
);

const CourseSidebar = ({ course, user, activeTopic, setActiveTopic, completedTopics, onToggleComplete, isOpen }) => {
  if (!isOpen) return null;

  return (
    <aside className="bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col w-80 p-6">
      <div className="w-68 flex-grow overflow-y-auto">
        <div className="flex items-center mb-8">
          <img src={user?.avatar || 'https://i.pravatar.cc/150?u=guest'} alt={user?.name || 'Guest'} className="w-10 h-10 rounded-full mr-3" />
          <span className="font-semibold text-gray-900">{user?.name || 'Guest'}</span>
        </div>
        <nav>
          <ul>
            {course.curriculum.map((section, sectionIndex) => (
              <li key={sectionIndex} className="mb-6">
                <h3 className="text-gray-500 text-sm font-bold mb-3 px-3">{section.section}</h3>
                <ul>
                  {section.topics.map((topic, topicIndex) => {
                    const topicId = `${sectionIndex}-${topicIndex}`;
                    const isCompleted = completedTopics.has(topicId);
                    const isActive = activeTopic.sectionIndex === sectionIndex && activeTopic.topicIndex === topicIndex;
                    return (
                      <li key={topicIndex}>
                        <div
                          onClick={() => setActiveTopic({ sectionIndex, topicIndex })}
                          className={`flex items-center justify-between py-2 px-3 rounded-lg cursor-pointer transition-colors duration-200 whitespace-nowrap ${isActive ? 'bg-blue-100 text-blue-700' : 'hover:bg-blue-50'}`}>
                          <span className={`mr-2 ${isCompleted ? 'line-through text-gray-500' : ''}`}>{topic.title}</span>
                          <input 
                            type="checkbox" 
                            checked={isCompleted}
                            onChange={() => onToggleComplete(sectionIndex, topicIndex)}
                            className="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            onClick={(e) => e.stopPropagation()}
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
  );
};

const CourseContent = ({ course, activeTopic, progress, onNavigate, onToggleComplete }) => {
  const { user, addReview } = useAuth();
  const [qna, setQna] = useState([]);

  useEffect(() => {
    getQnaData().then(setQna);
  }, []);

  const currentTopic = course.curriculum[activeTopic.sectionIndex]?.topics[activeTopic.topicIndex];
  const isFirstTopic = activeTopic.sectionIndex === 0 && activeTopic.topicIndex === 0;
  const isLastTopic = activeTopic.sectionIndex === course.curriculum.length - 1 && activeTopic.topicIndex === course.curriculum[activeTopic.sectionIndex].topics.length - 1;

  return (
    <div className="p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        {currentTopic.type === 'quiz' ? (
          <Quiz quizData={currentTopic.quizData} />
        ) : (
          <>
            <div className="bg-gray-900 aspect-video rounded-2xl mb-6 flex items-center justify-center">
              <PlayCircle className="w-20 h-20 text-white/70" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{currentTopic.title}</h1>
            <p className="text-lg text-gray-700 mb-8">Ini adalah deskripsi untuk pelajaran "{currentTopic.title}".</p>
          </>
        )}
        
        <div className="flex justify-between items-center mt-12 border-t pt-6">
           <button onClick={() => onNavigate('prev')} disabled={isFirstTopic} className="bg-gray-200 text-gray-800 font-semibold px-6 py-3 rounded-lg hover:bg-gray-300 disabled:opacity-50">Pelajaran Sebelumnya</button>
           <button onClick={() => onNavigate('next')} disabled={isLastTopic} className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50">Pelajaran Selanjutnya</button>
        </div>

        <section className="mt-16 pt-8 border-t">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ulasan Siswa ({course.reviews?.length || 0})</h2>
          <Reviews reviews={course.reviews} />
          {progress === 100 && !course.reviews?.some(r => r.name === user.name) && (
            <ReviewForm onSubmit={(reviewData) => addReview(course.id, reviewData)} />
          )}
        </section>

        <section className="mt-16 pt-8 border-t">
          <QnASection qnaData={qna} />
        </section>

        <section className="mt-16 pt-8 border-t text-center bg-slate-50 p-8 rounded-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Masih Punya Pertanyaan?</h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">Kunjungi forum komunitas kami untuk berdiskusi dengan ribuan siswa dan instruktur lainnya.</p>
          <Link to="/academy/community" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors">
            <MessageSquare className="w-5 h-5 mr-2" />
            Buka Forum Komunitas
          </Link>
        </section>
      </div>
    </div>
  );
};

const PreviewOverlay = ({ message, courseSlug }) => (
  <div className="relative p-6 md:p-12">
    <div className="max-w-4xl mx-auto filter blur-sm pointer-events-none">
      <div className="bg-gray-900 aspect-video rounded-2xl mb-6 flex items-center justify-center"><PlayCircle className="w-20 h-20 text-white/70" /></div>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Konten Terkunci</h1>
    </div>
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
      <div className="text-center bg-white p-10 rounded-2xl shadow-2xl border max-w-md">
        <Lock className="w-12 h-12 mx-auto text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-slate-800 mb-3">Akses Konten Eksklusif</h2>
        <p className="text-slate-600 mb-8">{message}</p>
        <div className="flex gap-4">
          <Link to={`/academy/pricing?course_slug=${courseSlug}`} className="flex-1 bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition">Beli Kursus</Link>
          <Link to="/register" className="flex-1 bg-slate-200 text-slate-800 font-semibold px-6 py-3 rounded-lg hover:bg-slate-300 transition">Buat Akun</Link>
        </div>
      </div>
    </div>
  </div>
);

const CourseDetailPage = () => {
  const { courseSlug } = useParams();
  const navigate = useNavigate();
  const { user, toggleTopicCompletion } = useAuth();
  
  const { course, isLoading, error, progress, completedTopics } = useCourseData(courseSlug);
  const { level, message, redirectPath } = useCourseAccess(course?.id);

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTopic, setActiveTopic] = useState({ sectionIndex: 0, topicIndex: 0 });
  const [newlyAwardedBadge, setNewlyAwardedBadge] = useState(null);

  useEffect(() => {
    if (redirectPath) navigate(redirectPath);
  }, [redirectPath, navigate]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1024px)');
    setIsSidebarOpen(mediaQuery.matches);
    const handler = (e) => setIsSidebarOpen(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleToggleComplete = (sectionIndex, topicIndex) => {
    if (level !== CourseAccessLevel.FULL_ACCESS || !course) return;
    const topicId = `${sectionIndex}-${topicIndex}`;
    const awardedBadge = toggleTopicCompletion(course.id, topicId);
    if (awardedBadge) setNewlyAwardedBadge(awardedBadge);
  };

  const handleNavigation = (direction) => {
    let { sectionIndex, topicIndex } = activeTopic;
    const curriculum = course.curriculum;
    if (direction === 'next') {
      topicIndex++;
      if (topicIndex >= curriculum[sectionIndex].topics.length) { topicIndex = 0; sectionIndex++; }
    } else { // prev
      topicIndex--;
      if (topicIndex < 0) { sectionIndex--; if (sectionIndex >= 0) { topicIndex = curriculum[sectionIndex].topics.length - 1; } }
    }
    if (sectionIndex >= 0 && sectionIndex < curriculum.length) setActiveTopic({ sectionIndex, topicIndex });
  };

  if (isLoading) return <PageState message="Memuat Kursus..." />;
  if (error) return <PageState message={error} link="/academy" linkText="Kembali ke Akademi" />;
  if (level === CourseAccessLevel.NO_ACCESS) return <PageState message={message} link={redirectPath} linkText="Login" />;
  if (!course) return <PageState message="Kursus tidak ditemukan" link="/academy" linkText="Kembali ke Akademi" />;

  // Handle courses with no curriculum
  if (!course.curriculum || course.curriculum.length === 0) {
    return <PageState message="Materi untuk kursus ini belum tersedia." link="/academy" linkText="Kembali ke Akademi" />;
  }

  return (
    <div className="bg-white text-gray-800 font-sans">
      <BadgeNotification badge={newlyAwardedBadge} />
      <div className="flex min-h-screen">
        <CourseSidebar 
          isOpen={isSidebarOpen}
          course={course}
          user={user}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          completedTopics={completedTopics}
          onToggleComplete={handleToggleComplete}
        />

        <main className="flex-1 bg-white">
          <header className="flex items-center justify-between p-4 border-b border-gray-200 bg-white sticky top-0 z-20">
            <div className="flex items-center">
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="mr-4 p-2 rounded-full hover:bg-gray-100"><Menu size={20} /></button>
              <Link to="/academy" className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft size={20} /></Link>
              <div className="ml-4">
                <span className="font-semibold hidden md:block text-gray-900">{course.title}</span>
                <span className="text-sm text-gray-500">Progres: {progress.toFixed(0)}%</span>
              </div>
            </div>
          </header>
          
          <div className="w-full bg-gray-200 h-2">
            <div className="bg-blue-600 h-2" style={{ width: `${progress}%` }}></div>
          </div>

          {level === CourseAccessLevel.FULL_ACCESS ? (
            <CourseContent 
              course={course}
              activeTopic={activeTopic}
              progress={progress}
              onNavigate={handleNavigation}
              onToggleComplete={handleToggleComplete}
            />
          ) : (
            <PreviewOverlay message={message} courseSlug={courseSlug} />
          )}
        </main>
      </div>
    </div>
  );
};

export default CourseDetailPage;