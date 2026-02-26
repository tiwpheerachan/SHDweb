// src/App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageShell from "./components/PageShell";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BrandsPage from "./pages/BrandsPage";
import BrandDetailPage from "./pages/BrandDetailPage";
import ServicesPage from "./pages/ServicesPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";

/**
 * ✅ Scroll to top on route change (React Router doesn't do this by default)
 * - default: scroll to top
 * - if url has #hash and element exists -> scroll to that element
 */
function ScrollToTop() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // ถ้ามี #hash ให้เลื่อนไปยัง element นั้นก่อน
    if (hash) {
      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "auto", block: "start" });
        return;
      }
    }

    // ค่าเริ่มต้น: กลับไปบนสุดเมื่อเปลี่ยนหน้า
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return null;
}

export default function App() {
  return (
    <PageShell>
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        {/* ✅ NEW: brand detail */}
        <Route path="/brands/:slug" element={<BrandDetailPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/activities" element={<ActivitiesPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </PageShell>
  );
}