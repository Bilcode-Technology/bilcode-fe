import { Routes, Route, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import LandingPage from "./pages/LandingPage";
import Academy from "./pages/Academy";
import BlogPage from "./pages/BlogPage";
import SubscriptionPage from "./pages/SubscriptionPage";
import CoursesPage from "./pages/CoursesPage";
import { navItems } from "./data/navItems.jsx";
import { academyNavItems } from "./data/academyNavItems.js";

function App() {
  const location = useLocation();

  const currentNavItems = location.pathname.startsWith('/academy') || location.pathname.startsWith('/blog') ? academyNavItems : navItems;

  return (
    <Routes>
      <Route path="/" element={<MainLayout navItems={currentNavItems} />}>
        <Route index element={<LandingPage />} />
        <Route path="academy" element={<Academy />} />
        <Route path="academy/courses" element={<CoursesPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="subscribe" element={<SubscriptionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
