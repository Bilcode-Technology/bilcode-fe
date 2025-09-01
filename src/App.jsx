import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./features/landing/pages/LandingPage";
import AcademyPage from "./features/academy/pages/AcademyPage";
import BlogPage from "./features/academy/pages/BlogPage";
import SubscriptionPage from "./features/academy/pages/SubscriptionPage";
import CoursesPage from "./features/academy/pages/CoursesPage";
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
        <Route path="academy/courses" element={<CoursesPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="subscribe" element={<SubscriptionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
