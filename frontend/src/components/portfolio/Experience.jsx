import React from "react";
import { experiences } from "../../mock/data";
import useReveal from "../../hooks/useReveal";
import { Briefcase, MapPin } from "lucide-react";

export default function Experience() {
  const [ref, inView] = useReveal();
  return (
    <section id="experience" ref={ref} className={"relative py-28 reveal " + (inView ? "in-view" : "")}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-300/70 uppercase">
              02 — Experience
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-stone-100">
              Where I’ve shipped
              <span className="font-serif-display text-amber-200 italic"> impact</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-stone-400 max-w-sm">
            From research prototypes to production AI systems serving enterprise platforms.
          </p>
        </div>

        <div className="relative">
          {/* timeline rail */}
          <div className="absolute left-[15px] md:left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-300/40 via-white/10 to-transparent" />

          <ol className="space-y-10">
            {experiences.map((e) => (
              <li key={e.id} className="relative pl-12 md:pl-16">
                {/* node */}
                <span className="absolute left-0 top-2 flex items-center justify-center w-[34px] h-[34px] md:w-[38px] md:h-[38px] rounded-full bg-[#0a0a0c] border border-amber-300/40">
                  <Briefcase className="w-3.5 h-3.5 text-amber-300" />
                </span>
                {e.current && (
                  <span className="absolute left-[34px] md:left-[42px] top-3 ml-2 font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                    Current
                  </span>
                )}

                <div className="p-6 md:p-7 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.025] to-transparent hover:border-amber-300/25 hover-lift">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-xl md:text-[22px] text-stone-100 font-medium">
                      {e.role}
                    </h3>
                    <span className="text-amber-300/80">·</span>
                    <span className="text-stone-300/90">{e.company}</span>
                  </div>
                  <div className="mt-1.5 flex flex-wrap items-center gap-3 font-mono text-[11.5px] text-stone-400">
                    <span>{e.start} — {e.end}</span>
                    <span className="opacity-60">|</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {e.location}</span>
                  </div>

                  <p className="mt-4 text-[14.5px] text-stone-300/85 leading-relaxed">
                    {e.summary}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {e.achievements.map((a, i) => (
                      <li key={i} className="flex gap-3 text-[13.5px] text-stone-300/85 leading-relaxed">
                        <span className="font-mono text-amber-300/70 mt-1">→</span>
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10.5px] tracking-wide px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-stone-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
