import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <ScrollProgress />
      <Navbar />
      <main id="main" className="pt-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
