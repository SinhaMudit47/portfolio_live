import React from "react";
import Header from "../components/portfolio/Header";
import Hero from "../components/portfolio/Hero";
import About from "../components/portfolio/About";
import Experience from "../components/portfolio/Experience";
import Projects from "../components/portfolio/Projects";
import Skills from "../components/portfolio/Skills";
import EducationAndAwards from "../components/portfolio/EducationAndAwards";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";
import { Toaster } from "../components/ui/toaster";

export default function Portfolio() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0c] text-stone-100 overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <EducationAndAwards />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
