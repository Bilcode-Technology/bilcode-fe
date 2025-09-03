import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import React, { useState, useEffect } from 'react';

// Layouts
import MainLayout from "./layouts/MainLayout.jsx";

// Landing Features
import LandingPage from "./features/landing/pages/LandingPage.jsx";
import CareerPage from "./features/landing/pages/CareerPage.jsx";
import PricelistPage from "./features/landing/pages/PricelistPage.jsx";

// Academy Features
import AcademyPage from "./features/academy/pages/AcademyPage.jsx";
import BlogPage from "./features/academy/pages/BlogPage.jsx";
import BlogPostPage from "./features/academy/pages/BlogPostPage.jsx";
import CourseLandingPage from "./features/academy/pages/CourseLandingPage.jsx";
import CourseLearningPage from "./features/academy/pages/CourseLearningPage.jsx";
import CommunityPage from "./features/academy/pages/CommunityPage.jsx";
import PricingPage from "./features/academy/pages/PricingPage.jsx";
import InstructorsPage from "./features/academy/pages/InstructorsPage.jsx";
import InstructorDetailPage from "./features/academy/pages/InstructorDetailPage.jsx";
import LearningPathsPage from "./features/academy/pages/LearningPathsPage.jsx";
import LearningPathDetailPage from "./features/academy/pages/LearningPathDetailPage.jsx";
import LeaderboardPage from "./features/academy/pages/LeaderboardPage.jsx";
import EventsPage from "./features/academy/pages/EventsPage.jsx";
import EventDetailPage from "./features/academy/pages/EventDetailPage.jsx";

// Joki Features
import JokiPage from "./features/joki/pages/JokiPage.jsx";
import OrderPage from "./features/joki/pages/OrderPage.jsx";
import OrderSuccessPage from "./features/joki/pages/OrderSuccessPage.jsx";

// Auth Features
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import DashboardPage from "./features/auth/pages/DashboardPage.jsx";
import MyCoursesPage from "./features/auth/pages/MyCoursesPage.jsx";
import ProfilePage from "./features/users/pages/ProfilePage.jsx";
import CertificatePage from "./features/academy/pages/CertificatePage.jsx";
import NotificationsPage from "./features/users/pages/NotificationsPage.jsx";
import BadgesPage from "./features/users/pages/BadgesPage.jsx";

// Data
import { navItems as landingNavItems } from "./data/navItems.jsx";
import { getAcademyNavItems } from "./features/academy/api";

function App() {
  const location = useLocation();
  const [mainNavItems, setMainNavItems] = useState([]);
  const [userNavItems, setUserNavItems] = useState([]);

  useEffect(() => {
    getAcademyNavItems().then(navs => {
      setMainNavItems(navs.main);
      setUserNavItems(navs.user);
    });
  }, []);

  // Tentukan navItems berdasarkan path
  const isAcademyRoute = location.pathname.startsWith("/academy") || location.pathname.startsWith("/blog") || location.pathname.startsWith("/profile");

  const currentNavItems = isAcademyRoute ? mainNavItems : landingNavItems;
  const currentUserNavItems = isAcademyRoute ? userNavItems : [];

  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<MainLayout navItems={currentNavItems} userNavItems={currentUserNavItems} />}>
          {/* Landing Routes */}
          <Route index element={<LandingPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="pricelist" element={<PricelistPage />} />

          {/* Academy Routes */}
          <Route path="academy" element={<AcademyPage />} />
          <Route path="academy/blog" element={<BlogPage />} />
          <Route path="academy/blog/:postId" element={<BlogPostPage />} />

          <Route path="academy/community" element={<CommunityPage />} />
          <Route path="academy/instructors" element={<InstructorsPage />} />
          <Route path="academy/instructors/:instructorId" element={<InstructorDetailPage />} />

          {/* Learning Path Routes */}
          <Route path="academy/paths" element={<LearningPathsPage />} />
          <Route path="academy/paths/:pathId" element={<LearningPathDetailPage />} />
          <Route path="academy/leaderboard" element={<LeaderboardPage />} />
          <Route path="academy/pricing" element={<PricingPage />} />

          {/* Event Routes */}
          <Route path="academy/events" element={<EventsPage />} />
          <Route path="academy/events/:eventId" element={<EventDetailPage />} />

          {/* Blog Standalone Routes */}
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:postId" element={<BlogPostPage />} />

          {/* Joki Routes */}
          <Route path="joki" element={<JokiPage />} />
          <Route path="joki/order" element={<OrderPage />} />
          <Route path="joki/order-success" element={<OrderSuccessPage />} />

          {/* Auth Routes */}
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="dashboard/my-courses" element={<MyCoursesPage />} />
          <Route path="profile/:username" element={<ProfilePage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="dashboard/badges" element={<BadgesPage />} />
        </Route>

        {/* Routes outside MainLayout */}
        <Route path="/academy/course/:courseSlug" element={<CourseLandingPage />} />
        <Route path="/academy/learn/:courseSlug" element={<CourseLearningPage />} />
        <Route path="/certificate/:courseSlug" element={<CertificatePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
