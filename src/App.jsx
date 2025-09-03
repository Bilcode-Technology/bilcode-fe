import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";

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
import CourseDetailPage from "./features/academy/pages/CourseDetailPage.jsx";
import CommunityPage from "./features/academy/pages/CommunityPage.jsx";
import PricingPage from "./features/academy/pages/PricingPage.jsx";
import InstructorsPage from "./features/academy/pages/InstructorsPage.jsx";
import InstructorDetailPage from "./features/academy/pages/InstructorDetailPage.jsx";
import LearningPathsPage from "./features/academy/pages/LearningPathsPage.jsx";
import LearningPathDetailPage from "./features/academy/pages/LearningPathDetailPage.jsx";

// Joki Features
import JokiPage from "./features/joki/pages/JokiPage.jsx";

// Auth Features
import LoginPage from "./features/auth/pages/LoginPage.jsx";
import RegisterPage from "./features/auth/pages/RegisterPage.jsx";
import DashboardPage from "./features/auth/pages/DashboardPage.jsx";
import CertificatePage from "./features/academy/pages/CertificatePage.jsx";

// Data
import { navItems } from "./data/navItems.jsx";
import { academyNavItems } from "./features/academy/data/academyNavItems.jsx";

function App() {
  const location = useLocation();

  // Tentukan navItems berdasarkan path
  const isAcademyRoute =
    location.pathname.startsWith("/academy") ||
    location.pathname.startsWith("/blog");

  const currentNavItems = isAcademyRoute ? academyNavItems : navItems;

  return (
    <AuthProvider>
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
          <Route path="academy/instructors/:instructorId" element={<InstructorDetailPage />} />

          {/* Learning Path Routes */}
          <Route path="academy/paths" element={<LearningPathsPage />} />
          <Route path="academy/paths/:pathId" element={<LearningPathDetailPage />} />
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
        <Route path="/certificate/:courseId" element={<CertificatePage />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;