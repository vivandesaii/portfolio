"use client";

import { motion } from "framer-motion";
import FadeIn from "./FadeIn";
import { ABOUT, EXPERIENCE, LINKS, PROJECTS, SKILLS } from "@/lib/content";

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="mb-8 text-xl font-medium text-accent">
      <span className="mr-2 text-muted" aria-hidden>
        ❯
      </span>
      {children}
    </h2>
  );
}

const hoverCard =
  "rounded-md border border-fg/10 p-6 transition-colors duration-200 hover:border-accent/40";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-16">
      <FadeIn>
        <SectionHeading>about</SectionHeading>
        {ABOUT.map((p, i) => (
          <p key={i} className={`max-w-2xl ${i > 0 ? "mt-4 text-sm text-muted" : ""}`}>
            {p}
          </p>
        ))}
      </FadeIn>
    </section>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-16">
      <FadeIn>
        <SectionHeading>projects</SectionHeading>
      </FadeIn>
      <div className="grid gap-6">
        {PROJECTS.map((p, i) => (
          <FadeIn key={p.name} delay={i * 0.08}>
            <motion.article
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={hoverCard}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-medium text-fg">{p.name}</h3>
                <span className="text-xs text-accent">{p.metric}</span>
              </div>
              <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-fg/85">
                {p.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded border border-fg/10 px-2 py-0.5 text-xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {p.links && (
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1">
                  {p.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent underline-offset-4 transition-colors hover:underline"
                    >
                      {l.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </motion.article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-16">
      <FadeIn>
        <SectionHeading>experience</SectionHeading>
      </FadeIn>
      <ol className="grid gap-4">
        {EXPERIENCE.map((r, i) => (
          <FadeIn key={r.company} delay={i * 0.06}>
            <li className="flex flex-col gap-1 border-l border-fg/10 py-1 pl-4 transition-colors duration-200 hover:border-accent/50 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <span className="text-fg">{r.company}</span>
                <span className="text-muted"> — {r.title}</span>
              </div>
              {r.note && <span className="text-xs text-accent/80">{r.note}</span>}
            </li>
          </FadeIn>
        ))}
      </ol>
    </section>
  );
}

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-16">
      <FadeIn>
        <SectionHeading>skills</SectionHeading>
      </FadeIn>
      <div className="grid gap-6 sm:grid-cols-2">
        {SKILLS.map((group, i) => (
          <FadeIn key={group.category} delay={i * 0.06}>
            <div>
              <h3 className="mb-2 text-sm text-muted"># {group.category}</h3>
              <p className="text-sm text-fg/85">{group.items.join("  ·  ")}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const links = [
    { label: "email", href: `mailto:${LINKS.email}`, text: LINKS.email },
    { label: "linkedin", href: LINKS.linkedin, text: "linkedin.com/in/vivand" },
    { label: "github", href: LINKS.github, text: "github.com/vivandesaii" },
    { label: "resume", href: LINKS.resume, text: "resume.pdf ↓" },
  ];
  return (
    <section id="contact" className="scroll-mt-24 py-16 pb-40">
      <FadeIn>
        <SectionHeading>contact</SectionHeading>
        <ul className="grid gap-3 text-sm">
          {links.map((l) => (
            <li key={l.label}>
              <span className="inline-block w-24 text-muted">{l.label}</span>
              <a
                href={l.href}
                target={l.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-fg underline-offset-4 transition-colors duration-150 hover:text-accent hover:underline"
              >
                {l.text}
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
