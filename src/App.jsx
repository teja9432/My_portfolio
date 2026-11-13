import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";

import { PortfolioProvider } from "./context/PortfolioContext";
import { useScrollReveal } from "./hooks/useScrollReveal";

// Portfolio sections
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Home/Hero";
import { About } from "./components/About/About";
import { Intern } from "./components/InternShips/Intern";
import { Skills } from "./components/Skills/Skills";
import { Certification } from "./components/Certifications/Certification";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";

// Admin
import { AdminLogin } from "./pages/AdminLogin";
import { AdminPanel } from "./pages/AdminPanel";

// Determine if we're on the admin route
const isAdminRoute = () => {
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  
  return (
    path.startsWith("/admin") || 
    hash.startsWith("#admin") || 
    search.includes("admin=1")
  );
};

const PortfolioApp = () => {
  useScrollReveal();
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "var(--navbar-height)" }}>
        <Hero />
        <About />
        <Intern />
        <Skills />
        <Certification />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

const AdminApp = () => {
  const [loggedIn, setLoggedIn] = useState(
    () => sessionStorage.getItem("admin_session") === "true"
  );

  const handleLogin = () => {
    sessionStorage.setItem("admin_session", "true");
    setLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_session");
    setLoggedIn(false);
  };

  if (!loggedIn) return <AdminLogin onLogin={handleLogin} />;
  return <AdminPanel onLogout={handleLogout} />;
};

function App() {
  const showAdmin = isAdminRoute();
  return (
    <PortfolioProvider>
      {showAdmin ? <AdminApp /> : <PortfolioApp />}
    </PortfolioProvider>
  );
}

export default App;
