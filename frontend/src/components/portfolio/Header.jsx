import React, { useEffect, useState } from "react";
import { navLinks, profile } from "../../mock/data";
import { Menu, X, Download } from "lucide-react";
import { Button } from "../ui/button";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 " +
        (scrolled
          ? "backdrop-blur-xl bg-[#0a0a0c]/75 border-b border-white/5"
          : "bg-transparent")
      }
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-md bg-gradient-to-br from-amber-300/90 to-amber-600/80 flex items-center justify-center font-mono text-[11px] font-bold text-[#0a0a0c]">
            MS
          </span>
          <span className="font-mono text-sm tracking-tight text-stone-200/90 group-hover:text-amber-200 transition-colors">
            mudit<span className="text-amber-300/80">.</span>sinha
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12.5px] text-stone-300/75 hover:text-amber-200 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href={profile.resumeUrl} download>
            <Button
              variant="outline"
              className="h-9 px-4 rounded-full bg-transparent border-amber-300/30 text-amber-100 hover:bg-amber-300/10 hover:text-amber-100 hover:border-amber-300/50 font-mono text-[12px]"
            >
              <Download className="w-3.5 h-3.5 mr-1.5" /> Resume
            </Button>
          </a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-stone-200 p-2"
          aria-label="toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0a0c]/95 backdrop-blur-xl">
          <div className="px-6 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm text-stone-300/85 hover:text-amber-200"
              >
                {l.label}
              </a>
            ))}
            <a href={profile.resumeUrl} download onClick={() => setOpen(false)}>
              <Button className="w-full bg-amber-300 text-[#0a0a0c] hover:bg-amber-200 font-mono text-[12px]">
                <Download className="w-3.5 h-3.5 mr-1.5" /> Download Resume
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
