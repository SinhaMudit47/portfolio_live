import React, { useState } from "react";
import axios from "axios";
import { profile } from "../../mock/data";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../../hooks/use-toast";
import useReveal from "../../hooks/useReveal";
import { Mail, MapPin, Linkedin, Phone, Send } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Contact() {
  const [ref, inView] = useReveal();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Missing fields",
        description: "Please add your name, email and a message."
      });
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        subject: form.subject || "",
        message: form.message
      });
      const delivered = res?.data?.email_delivered;
      toast({
        title: delivered ? "Message sent" : "Message received",
        description: delivered
          ? "Thanks for reaching out — Mudit will reply soon."
          : "Saved safely. Mudit will get back to you over email shortly."
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const detail =
        err?.response?.data?.detail ||
        err?.message ||
        "Something went wrong sending your message.";
      toast({
        title: "Couldn't send message",
        description: typeof detail === "string" ? detail : "Please try again in a moment."
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={ref} className={"relative py-28 reveal " + (inView ? "in-view" : "")}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl">
          <p className="font-mono text-[11px] tracking-[0.3em] text-amber-300/70 uppercase">
            07 — Contact
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl font-light tracking-tight text-stone-100">
            Let’s build something
            <span className="font-serif-display text-amber-200 italic"> intelligent</span>.
          </h2>
          <p className="mt-5 text-stone-300/80 text-base leading-relaxed">
            Open to GenAI / LLM engineering roles, freelance collaborations, and interesting problem statements.
            Drop a note — I read every message.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-12 gap-8">
          {/* Info side */}
          <div className="md:col-span-5 space-y-3">
            {[
              { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
              { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
              { icon: Linkedin, label: "LinkedIn", value: "mudit-sinha", href: profile.linkedin },
              { icon: MapPin, label: "Location", value: profile.location, href: null }
            ].map((c) => {
              const Icon = c.icon;
              const inner = (
                <div className="flex items-center gap-4 p-5 rounded-xl border border-white/[0.07] bg-white/[0.02] hover:border-amber-300/30 hover:bg-amber-300/[0.04] transition-colors">
                  <span className="w-10 h-10 rounded-lg bg-amber-300/10 border border-amber-300/20 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-amber-300" />
                  </span>
                  <div>
                    <p className="font-mono text-[10.5px] uppercase tracking-wider text-stone-500">
                      {c.label}
                    </p>
                    <p className="text-stone-200 text-[14px] mt-0.5">{c.value}</p>
                  </div>
                </div>
              );
              return c.href ? (
                <a key={c.label} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={c.label}>{inner}</div>
              );
            })}
          </div>

          {/* Form side */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-7 p-6 md:p-8 rounded-2xl border border-white/[0.07] bg-gradient-to-br from-white/[0.025] to-transparent"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-stone-400">Name</label>
                <Input
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Your name"
                  className="mt-2 bg-[#0d0d11] border-white/[0.08] text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-300/40 focus-visible:border-amber-300/40"
                />
              </div>
              <div>
                <label className="font-mono text-[11px] uppercase tracking-wider text-stone-400">Email</label>
                <Input
                  type="email"
                  value={form.email}
                  onChange={update("email")}
                  placeholder="you@company.com"
                  className="mt-2 bg-[#0d0d11] border-white/[0.08] text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-300/40 focus-visible:border-amber-300/40"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="font-mono text-[11px] uppercase tracking-wider text-stone-400">Subject</label>
              <Input
                value={form.subject}
                onChange={update("subject")}
                placeholder="What’s this about?"
                className="mt-2 bg-[#0d0d11] border-white/[0.08] text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-300/40 focus-visible:border-amber-300/40"
              />
            </div>
            <div className="mt-4">
              <label className="font-mono text-[11px] uppercase tracking-wider text-stone-400">Message</label>
              <Textarea
                value={form.message}
                onChange={update("message")}
                placeholder="Tell me a bit about the role or project..."
                rows={5}
                className="mt-2 bg-[#0d0d11] border-white/[0.08] text-stone-100 placeholder:text-stone-600 focus-visible:ring-amber-300/40 focus-visible:border-amber-300/40 resize-none"
              />
            </div>

            <div className="mt-6 flex items-center justify-between flex-wrap gap-3">
              <p className="font-mono text-[11px] text-stone-500">
                * Replies go straight to Mudit's inbox — typically within 1–2 days.
              </p>
              <Button
                type="submit"
                disabled={loading}
                className="h-11 px-6 rounded-full bg-amber-300 text-[#0a0a0c] hover:bg-amber-200 font-mono text-[12.5px] tracking-wide disabled:opacity-70"
              >
                {loading ? "Sending..." : (
                  <>
                    <Send className="w-4 h-4 mr-1.5" /> Send message
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
