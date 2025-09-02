import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./features/landing/pages/LandingPage";
import AcademyPage from "./features/academy/pages/AcademyPage";
import BlogPage from "./features/academy/pages/BlogPage";
import BlogPostPage from "./features/academy/pages/BlogPostPage";
import CourseDetailPage from "./features/academy/pages/CourseDetailPage";
import CommunityPage from "./features/academy/pages/CommunityPage";
import PricingPage from "./features/academy/pages/PricingPage";
import JokiPage from "./features/joki/pages/JokiPage.jsx";
import CareerPage from "./features/landing/pages/CareerPage.jsx";
import PricelistPage from "./features/landing/pages/PricelistPage.jsx";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import DashboardPage from "./features/auth/pages/DashboardPage";
import { navItems } from "./data/navItems.jsx";
import { academyNavItems } from "./features/academy/data/academyNavItems.js";

function App() {
  const location = useLocation();

  const currentNavItems = location.pathname.startsWith('/academy') || location.pathname.startsWith('/blog') ? academyNavItems : navItems;

  return (
    <Routes>
      <Route path="/" element={<MainLayout navItems={currentNavItems} />}>
        <Route index element={<LandingPage />} />
        <Route path="academy" element={<AcademyPage />} />
        <Route path="academy/community" element={<CommunityPage />} />
        <Route path="academy/pricing" element={<PricingPage />} />
        <Route path="academy/course/:courseId" element={<CourseDetailPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:postId" element={<BlogPostPage />} />
        <Route path="joki" element={<JokiPage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="pricelist" element={<PricelistPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
    </Routes>
  );
}

export default App;
