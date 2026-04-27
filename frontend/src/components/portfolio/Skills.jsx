import React from "react";
import { skills } from "../../mock/data";
import useReveal from "../../hooks/useReveal";

export default function Skills() {
  const [ref, inView] = useReveal();

  // marquee items duplicated for seamless loop
  const marqueeItems = [
    ...skills.flatMap((c) => c.items),
    ...skills.flatMap((c) => c.items)
  ];

  return (
    <section id="skills" ref={ref} className={"relative py-28 reveal " + (inView ? "in-view" : "")}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-amber-300/70 uppercase">
              04 — Stack & Skills
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl font-light tracking-tight text-stone-100">
              The toolkit I
              <span className="font-serif-display text-amber-200 italic"> reach for</span>.
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((cat) => (
            <div
              key={cat.category}
              className="p-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:border-amber-300/25 transition-colors"
            >
              <p className="font-mono text-[10.5px] tracking-[0.25em] uppercase text-amber-300/70">
                {cat.category}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.items.map((it) => (
                  <span
                    key={it}
                    className="px-3 py-1.5 rounded-full text-[12.5px] text-stone-200 bg-white/[0.035] border border-white/[0.08] hover:bg-amber-300/[0.08] hover:border-amber-300/30 hover:text-amber-100 transition-colors"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee strip */}
        <div className="relative mt-14 overflow-hidden border-y border-white/[0.06] py-5">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {marqueeItems.map((it, i) => (
              <span
                key={i}
                className="font-mono text-[13.5px] text-stone-500 hover:text-amber-200 transition-colors"
              >
                {it}
                <span className="mx-6 text-stone-700">——</span>
              </span>
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#0a0a0c] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#0a0a0c] to-transparent" />
        </div>
      </div>
    </section>
  );
}
