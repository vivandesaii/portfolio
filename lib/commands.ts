import { EXPERIENCE, LINKS, PROJECTS } from "./content";

export interface CommandResult {
  lines: { text: string; tone?: "normal" | "accent" | "error" | "muted" }[];
  action?:
    | { type: "scroll"; target: string }
    | { type: "open"; url: string }
    | { type: "clear" }
    | { type: "now-playing" };
}

const HELP: CommandResult = {
  lines: [
    { text: "available commands:", tone: "muted" },
    { text: "  help        list available commands" },
    { text: "  about       who I am" },
    { text: "  projects    Finsnap · Smart SIP Engine" },
    { text: "  experience  work history" },
    { text: "  contact     email · linkedin · github" },
    { text: "  resume      open resume (pdf)" },
    { text: "  clear       clear terminal output" },
  ],
};

export function runCommand(raw: string): CommandResult {
  const cmd = raw.trim().toLowerCase();
  switch (cmd) {
    case "help":
      return HELP;
    case "about":
      return {
        lines: [
          {
            text: "CS Specialist (Computer Systems) @ UofT · backend + fintech. Scrolling to about…",
            tone: "muted",
          },
        ],
        action: { type: "scroll", target: "about" },
      };
    case "projects":
      return {
        lines: PROJECTS.map((p) => ({
          text: `  ${p.name.toLowerCase().replace(/\s+/g, "-")}  —  ${p.tagline}`,
        })),
        action: { type: "scroll", target: "projects" },
      };
    case "experience":
      return {
        lines: EXPERIENCE.map((r) => ({
          text: `  ${r.company}  —  ${r.title}`,
        })),
        action: { type: "scroll", target: "experience" },
      };
    case "contact":
      return {
        lines: [
          { text: `  email     ${LINKS.email}`, tone: "accent" },
          { text: `  linkedin  ${LINKS.linkedin}` },
          { text: `  github    ${LINKS.github}` },
        ],
        action: { type: "scroll", target: "contact" },
      };
    case "resume":
      return {
        lines: [{ text: "opening resume.pdf…", tone: "muted" }],
        action: { type: "open", url: LINKS.resume },
      };
    case "clear":
      return { lines: [], action: { type: "clear" } };
    case "whoami":
      return {
        lines: [
          { text: "software-engineering-intern (target: summer 2027, fintech)", tone: "accent" },
        ],
      };
    case "sudo hire-me":
      return {
        lines: [
          { text: "[sudo] password for recruiter: ********", tone: "muted" },
          { text: "permission granted. escalating to inbox…", tone: "accent" },
          { text: `  → ${LINKS.email} · resume at /resume.pdf` },
        ],
      };
    case "now-playing":
    case "now playing":
    case "spotify":
    case "wait for u":
      return {
        lines: [{ text: "♫ checking spotify…", tone: "muted" }],
        action: { type: "now-playing" },
      };
    case "":
      return { lines: [] };
    default:
      return {
        lines: [
          {
            text: `command not found: ${cmd}. Type 'help' to see available commands.`,
            tone: "error",
          },
        ],
      };
  }
}
