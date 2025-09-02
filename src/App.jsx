import { Routes, Route, useLocation } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Landing Features
import LandingPage from "./features/landing/pages/LandingPage";
import CareerPage from "./features/landing/pages/CareerPage.jsx";
import PricelistPage from "./features/landing/pages/PricelistPage.jsx";

// Academy Features
import AcademyPage from "./features/academy/pages/AcademyPage";
import BlogPage from "./features/academy/pages/BlogPage";
import BlogPostPage from "./features/academy/pages/BlogPostPage";
import CourseDetailPage from "./features/academy/pages/CourseDetailPage";
import CommunityPage from "./features/academy/pages/CommunityPage";
import PricingPage from "./features/academy/pages/PricingPage";
import InstructorsPage from "./features/academy/pages/InstructorsPage";

// Joki Features
import JokiPage from "./features/joki/pages/JokiPage.jsx";

// Auth Features
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import DashboardPage from "./features/auth/pages/DashboardPage";

// Data
import { navItems } from "./data/navItems.jsx";
import { academyNavItems } from "./features/academy/data/academyNavItems.js";

function App() {
  const location = useLocation();

  // Tentukan navItems berdasarkan path
  const isAcademyRoute =
    location.pathname.startsWith("/academy") ||
    location.pathname.startsWith("/blog");

  const currentNavItems = isAcademyRoute ? academyNavItems : navItems;

  return (
    <Routes>
      <Route path="/" element={<MainLayout navItems={currentNavItems} />}>
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
        <Route path="academy/pricing" element={<PricingPage />} />

        {/* Blog Standalone Routes */}
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:postId" element={<BlogPostPage />} />
        
        {/* Joki Routes */}
        <Route path="joki" element={<JokiPage />} />

        {/* Auth Routes */}
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>

      {/* Course Detail (di luar MainLayout) */}
      <Route path="/academy/course/:courseId" element={<CourseDetailPage />} />
    </Routes>
  );
}

export default App;