import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MouseFollower from "./MouseFollower";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <MouseFollower />
      <Navbar />
      <main id="main" className="containerX pt-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
