import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Users, Award } from "lucide-react";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — QuickCatch" },
      {
        name: "description",
        content:
          "Three commitments that make QuickCatch different: student-led, faculty-curated, and applied excellence.",
      },
      { property: "og:title", content: "About — QuickCatch" },
      { property: "og:description", content: "Student-led, faculty-curated, applied excellence." },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    n: "01",
    title: "Student-led",
    body: "Built and run by undergraduates who know the gap between lecture slides and shipping code. Peer mentorship is the default, not the exception.",
    icon: Users,
  },
  {
    n: "02",
    title: "Faculty-curated",
    body: "Every syllabus is co-designed with department advisors. You learn what your professors would actually teach — without the bureaucracy.",
    icon: BookOpen,
  },
  {
    n: "03",
    title: "Applied excellence",
    body: "Each track ends with a GitHub-ready project, a research write-up, or a deployable artifact. Theory, then proof.",
    icon: Award,
  },
];

function About() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionLabel>About</SectionLabel>
        <div className="mt-6 grid gap-12 md:grid-cols-12">
          <h1 className="font-display text-4xl font-medium leading-tight md:col-span-7 md:text-6xl">
            Three commitments that make
            <span className="italic text-marigold"> QuickCatch </span>
            different from every other online "academy."
          </h1>
          <p className="text-muted-foreground md:col-span-5 md:pt-4 md:text-lg">
            We're not a content farm and we're not a bootcamp. QuickCatch is a collaboration:
            students design the experience, faculty validate the depth, and every cohort ships
            something real.
          </p>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.n} className="group bg-card p-8 transition-colors hover:bg-accent/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {p.n}
                </span>
                <p.icon className="h-5 w-5 text-marigold" />
              </div>
              <h2 className="mt-8 font-display text-2xl font-medium">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
