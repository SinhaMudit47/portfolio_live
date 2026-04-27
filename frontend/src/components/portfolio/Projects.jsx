import React from "react";
import { projects } from "../../mock/data";
import useReveal from "../../hooks/useReveal";
import { ArrowUpRight } from "lucide-react";

const accentClass = {
  amber: "from-amber-300/30 to-amber-700/0",
  emerald: "from-emerald-300/25 to-emerald-700/0",
  sky: "from-sky-300/25 to-sky-700/0",
  rose: "from-rose-300/25 to-rose-700/0"
};

export default function Projects() {
  const [ref, inView] = useReveal();
  return (
    <section id="projects" ref={ref} className={"relative py-28 reveal " + (inView ? "in-view" : "")}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-300/70 uppercase">
              03 — Selected Projects
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-stone-100">
              Things I’ve
              <span className="font-serif-display text-amber-200 italic"> built</span>.
            </h2>
          </div>
          <p className="font-mono text-xs text-stone-400 max-w-sm">
            A focused selection of production systems, agent frameworks, and adapters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {projects.map((p, idx) => (
            <article
              key={p.id}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.025] to-transparent hover:border-amber-300/25 hover-lift"
            >
              <div
                className={
                  "absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gradient-radial blur-3xl opacity-50 bg-gradient-to-br " +
                  (accentClass[p.accent] || accentClass.amber)
                }
              />

              <div className="relative p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-stone-500">
                    {String(idx + 1).padStart(2, "0")} — Project
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-stone-500 group-hover:text-amber-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="mt-5 text-2xl md:text-[26px] text-stone-100 font-medium tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-1 text-amber-200/80 font-mono text-[12.5px]">
                  {p.subtitle}
                </p>

                <p className="mt-5 text-[14px] leading-[1.8] text-stone-300/85">
                  {p.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.metrics.map((m) => (
                    <span
                      key={m}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-full bg-amber-300/[0.07] border border-amber-300/20 text-amber-100/95"
                    >
                      {m}
                    </span>
                  ))}
                </div>

                <div className="mt-5 pt-5 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-mono text-[10.5px] tracking-wide text-stone-400"
                    >
                      {s}
                      <span className="text-stone-700 mx-1.5">/</span>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
