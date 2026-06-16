import { Link } from "@tanstack/react-router";
import { Github } from "lucide-react";

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-parchment/50">{title}</div>
      <ul className="mt-4 space-y-2">
        {items.map((i) => (<li key={i}><a href="#" className="text-parchment/80 hover:text-parchment">{i}</a></li>))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-parchment">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-sm">
            <span className="font-display text-2xl font-semibold tracking-tight">
              Quick<span className="text-marigold">Catch</span>
            </span>
            <p className="mt-3 text-sm text-parchment/60">A student-run academic portal. Faculty-curated. Free, forever.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <FooterCol title="Platform" items={["Courses", "Faculty", "Cohorts", "Open syllabus"]} />
            <FooterCol title="Community" items={["Student board", "Mentorship", "Alumni", "Discord"]} />
            <FooterCol title="Legal" items={["Privacy", "Terms", "Code of conduct"]} />
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-parchment/15 pt-6 text-xs text-parchment/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} QuickCatch Collective. Built by students.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="inline-flex items-center gap-1.5 hover:text-parchment"><Github className="h-3.5 w-3.5" /> Open source</a>
            <Link to="/contact" className="hover:text-parchment">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
