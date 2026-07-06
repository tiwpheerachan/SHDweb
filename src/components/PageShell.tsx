import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Navbar />
      <main id="main" className="pt-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
