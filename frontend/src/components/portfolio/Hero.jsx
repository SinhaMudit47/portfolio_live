import React from "react";
import { profile, stats } from "../../mock/data";
import { Button } from "../ui/button";
import { ArrowDownToLine, MapPin, Mail, ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section id="top" className="relative min-h-screen pt-28 pb-20 overflow-hidden">
      {/* Animated grid + radial glow background */}
      <div className="absolute inset-0 bg-grid bg-radial-amber" />
      <div
        className="glow-blob"
        style={{ top: "-12%", left: "-10%", background: "rgba(212, 165, 116, 0.18)" }}
      />
      <div
        className="glow-blob"
        style={{
          top: "30%",
          right: "-15%",
          background: "rgba(120, 90, 60, 0.18)",
          animationDelay: "2s"
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        {/* Status pill */}
        <div className="flex items-center gap-2 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="font-mono text-[11.5px] tracking-wider uppercase text-stone-300/80">
            Available for select GenAI roles — {profile.location}
          </span>
        </div>

        {/* Big name + role */}
        <div className="max-w-5xl">
          <p className="font-mono text-xs tracking-[0.3em] text-amber-300/70 mb-6">
            {"// PORTFOLIO — "} <span className="text-stone-400">v1.0</span>
          </p>

          <h1 className="text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.98] tracking-[-0.03em] font-light text-stone-100">
            <span className="block">Mudit Sinha.</span>
            <span className="block text-stone-400">
              I build{" "}
              <span className="font-serif-display text-amber-200 italic">
                production-grade
              </span>{" "}
              <br className="hidden md:block" />
              GenAI products.
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-stone-300/80 text-base md:text-lg leading-relaxed">
            {profile.tagline} {profile.yearsExperience} years shipping LLM apps,
            RAG / GraphRAG pipelines, and agentic workflows for enterprise teams.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#projects">
              <Button className="h-11 px-6 rounded-full bg-amber-300 text-[#0a0a0c] hover:bg-amber-200 font-mono text-[12.5px] tracking-wide group">
                View Projects
                <ArrowRight className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </a>
            <a href={profile.resumeUrl} download>
              <Button
                variant="outline"
                className="h-11 px-6 rounded-full bg-transparent border-stone-600/50 text-stone-100 hover:bg-white/5 hover:text-stone-100 hover:border-stone-400 font-mono text-[12.5px] tracking-wide"
              >
                <ArrowDownToLine className="w-4 h-4 mr-1.5" />
                Download Resume
              </Button>
            </a>
            <a href="#contact">
              <Button
                variant="ghost"
                className="h-11 px-5 rounded-full text-stone-200 hover:text-amber-200 hover:bg-transparent font-mono text-[12.5px] tracking-wide"
              >
                <Mail className="w-4 h-4 mr-1.5" />
                Get in touch
              </Button>
            </a>
          </div>

          {/* Meta line */}
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[12px] text-stone-400">
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-amber-300/70" />
              {profile.location}
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-amber-300/70" />
              {profile.email}
            </span>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-200 transition-colors"
            >
              linkedin.com/in/mudit-sinha
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
          {stats.map((s) => (
            <div
              key={s.label}
              className="bg-[#0c0c10] px-6 py-7 hover:bg-[#101015] transition-colors"
            >
              <div className="tabular text-3xl md:text-4xl font-light text-stone-100">
                {s.value}
              </div>
              <div className="mt-1.5 font-mono text-[11.5px] tracking-wide text-stone-400 uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
