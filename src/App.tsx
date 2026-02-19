// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import PageShell from "./components/PageShell";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import BrandsPage from "./pages/BrandsPage";
import BrandDetailPage from "./pages/BrandDetailPage";
import ServicesPage from "./pages/ServicesPage";
import ActivitiesPage from "./pages/ActivitiesPage";
import CareersPage from "./pages/CareersPage";
import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <PageShell>
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
