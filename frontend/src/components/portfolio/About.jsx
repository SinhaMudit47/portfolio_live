import React from "react";
import { profile } from "../../mock/data";
import useReveal from "../../hooks/useReveal";
import { CheckCircle2, Sparkles } from "lucide-react";

export default function About() {
  const [ref, inView] = useReveal();
  return (
    <section id="about" ref={ref} className={"relative py-28 reveal " + (inView ? "in-view" : "")}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] tracking-[0.3em] text-amber-300/70 uppercase">
            01 — About
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-stone-100">
            A pragmatic engineer
            <br />
            for the{" "}
            <span className="font-serif-display text-amber-200 italic">GenAI</span> era.
          </h2>
          <div className="mt-8 hidden md:block w-16 h-[2px] bg-gradient-to-r from-amber-300/80 to-transparent" />
        </div>

        <div className="md:col-span-8">
          <p className="text-stone-300/85 text-[15.5px] md:text-base leading-[1.85]">
            {profile.about}
          </p>

          <div className="mt-10 grid sm:grid-cols-2 gap-3">
            {profile.highlights.map((h, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-amber-300/25 hover:bg-amber-300/[0.025] transition-colors"
              >
                <CheckCircle2 className="w-4 h-4 mt-1 text-amber-300/80 shrink-0" />
                <span className="text-[13.5px] leading-relaxed text-stone-300">{h}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-300/[0.06] border border-amber-300/20">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span className="font-mono text-[11.5px] text-amber-100/90">
              Currently — building enterprise GenAI copilots @ Solugenix
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
