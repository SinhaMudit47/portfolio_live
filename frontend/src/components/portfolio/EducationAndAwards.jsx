import React from "react";
import { education, achievements } from "../../mock/data";
import useReveal from "../../hooks/useReveal";
import { GraduationCap, Trophy } from "lucide-react";

export default function EducationAndAwards() {
  const [ref, inView] = useReveal();
  return (
    <section id="education" ref={ref} className={"relative py-28 reveal " + (inView ? "in-view" : "")}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <p className="font-mono text-[11px] tracking-[0.3em] text-amber-300/70 uppercase">
            05 — Education
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-stone-100">
            Foundation in
            <span className="font-serif-display text-amber-200 italic"> Computer Science</span>.
          </h2>

          <div className="mt-8 space-y-4">
            {education.map((ed) => (
              <div
                key={ed.school}
                className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02]"
              >
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-10 h-10 rounded-lg bg-amber-300/10 border border-amber-300/20 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-amber-300" />
                  </span>
                  <div>
                    <h3 className="text-stone-100 text-lg font-medium">{ed.degree}</h3>
                    <p className="text-stone-300/80 text-sm mt-0.5">{ed.school}</p>
                    <div className="mt-3 flex items-center gap-3 font-mono text-[11.5px] text-stone-400">
                      <span>{ed.period}</span>
                      <span className="text-stone-700">|</span>
                      <span className="text-amber-200/90">{ed.score}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7">
          <p className="font-mono text-[11px] tracking-[0.3em] text-amber-300/70 uppercase">
            06 — Achievements
          </p>
          <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-stone-100">
            Recognition &amp;
            <span className="font-serif-display text-amber-200 italic"> impact</span>.
          </h2>

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {achievements.map((a, i) => (
              <div
                key={i}
                className="relative overflow-hidden p-6 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.025] to-transparent hover:border-amber-300/25 hover-lift"
              >
                <Trophy className="absolute top-5 right-5 w-4 h-4 text-amber-300/60" />
                <h3 className="text-stone-100 text-[15.5px] font-medium pr-8">{a.title}</h3>
                <p className="mt-1 font-mono text-[11.5px] text-amber-200/80">{a.org}</p>
                <p className="mt-3 text-[13px] text-stone-300/80 leading-relaxed">
                  {a.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
