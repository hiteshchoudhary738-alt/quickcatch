import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuickCatch — Student-Run Academic Portal" },
      {
        name: "description",
        content:
          "Free, faculty-curated curriculums in CS, AI/ML, and engineering. Hands-on projects, GitHub-ready, taught alongside university advisors.",
      },
      { property: "og:title", content: "QuickCatch — Student-Run Academic Portal" },
      {
        property: "og:description",
        content: "Free, faculty-curated curriculums in CS, AI/ML, and engineering.",
      },
    ],
  }),
  component: Home,
});

const STATS = [
  { value: "1,200+", label: "Active students" },
  { value: "8", label: "Curriculums" },
  { value: "12", label: "Faculty advisors" },
  { value: "100%", label: "Free to enroll" },
];

function Home() {
  return (
    <section className="paper-grain relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-foreground/40" />
          <span>Volume 01 · Fall Cohort Open</span>
        </div>
        <h1 className="mt-6 max-w-5xl font-display text-5xl font-medium leading-[0.95] sm:text-7xl md:text-[5.5rem]">
          A student-run academy,
          <br />
          <span className="italic text-marigold">curated by the faculty</span>
          <br />
          you wish you had.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          QuickCatch bridges classroom theory and shipped work. Department-backed curriculums
          in CS, AI/ML, and engineering — taught alongside the professors who'd otherwise gatekeep
          them.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" className="bg-ink text-parchment hover:bg-ink/90" asChild>
            <Link to="/courses">
              Browse courses <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="border-ink/30 bg-transparent" asChild>
            <Link to="/faculty">Meet the faculty</Link>
          </Button>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card p-6 sm:p-8">
              <div className="font-display text-4xl font-medium tracking-tight sm:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-10 select-none font-display text-[28rem] leading-none text-marigold/10 sm:-right-10">
        Q
      </div>
    </section>
  );
}
