import React from "react";
import { profile } from "../../mock/data";
import { ArrowUp, Mail, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] mt-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-amber-300/70">
            Designed &amp; built by Mudit Sinha
          </p>
          <h3 className="mt-3 text-3xl md:text-4xl font-light tracking-tight text-stone-100">
            Thanks for scrolling. <span className="font-serif-display text-amber-200 italic">Let’s talk.</span>
          </h3>
          <div className="mt-5 flex flex-wrap gap-4 font-mono text-[12px] text-stone-400">
            <a href={`mailto:${profile.email}`} className="flex items-center gap-1.5 hover:text-amber-200 transition-colors">
              <Mail className="w-3.5 h-3.5" /> {profile.email}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-amber-200 transition-colors">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-3">
          <a
            href="#top"
            className="group inline-flex items-center gap-2 font-mono text-[12px] text-stone-300 hover:text-amber-200 transition-colors"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <p className="font-mono text-[11px] text-stone-600">
            © {new Date().getFullYear()} Mudit Sinha — All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
