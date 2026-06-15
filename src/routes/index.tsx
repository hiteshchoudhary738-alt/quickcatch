import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, ArrowRight, ChevronDown, Github, Mail, MapPin, Clock, Sparkles, BookOpen, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "QuickCatch — Student-Run Academic Portal" },
      { name: "description", content: "Free, faculty-curated curriculums in CS, AI/ML, and engineering. Hands-on projects, GitHub-ready, taught alongside university advisors." },
      { property: "og:title", content: "QuickCatch — Student-Run Academic Portal" },
      { property: "og:description", content: "Free, faculty-curated curriculums in CS, AI/ML, and engineering." },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Faculty", id: "faculty" },
  { label: "Courses", id: "courses" },
  { label: "Contact", id: "contact" },
];

const STATS = [
  { value: "1,200+", label: "Active students" },
  { value: "6", label: "Curriculums" },
  { value: "12", label: "Faculty advisors" },
  { value: "100%", label: "Free to enroll" },
];

const PILLARS = [
  { n: "01", title: "Student-led", body: "Built and run by undergraduates who know the gap between lecture slides and shipping code. Peer mentorship is the default, not the exception.", icon: Users },
  { n: "02", title: "Faculty-curated", body: "Every syllabus is co-designed with department advisors. You learn what your professors would actually teach — without the bureaucracy.", icon: BookOpen },
  { n: "03", title: "Applied excellence", body: "Each track ends with a GitHub-ready project, a research write-up, or a deployable artifact. Theory, then proof.", icon: Award },
];

const FACULTY = [
  { name: "Dr. Evelyn Vance", title: "Associate Professor, Computer Science", field: "AI & Machine Learning", bio: "Published on transformer interpretability and small-model alignment. Leads the AI/ML curriculum review.", tags: ["Deep Learning", "NLP", "Alignment"], initials: "EV" },
  { name: "Prof. Marcus Chen", title: "Design Faculty, HCI Lab", field: "UI/UX & Interaction Design", bio: "Twenty years across IDEO and Adobe. Mentors students bridging design systems and front-end architecture.", tags: ["Design Systems", "Prototyping", "Accessibility"], initials: "MC" },
  { name: "Dr. Sarah Jenkins", title: "Senior Lecturer, Data Engineering", field: "Big Data & Analytics", bio: "Former staff engineer at Snowflake. Curates the data-pipeline and analytics modules end-to-end.", tags: ["Spark", "Warehousing", "ETL"], initials: "SJ" },
  { name: "Dr. Ravi Kumar", title: "Professor, Systems Engineering", field: "Distributed Systems", bio: "Researches consensus algorithms and edge compute. Advises the systems and infrastructure track.", tags: ["Distributed", "OS", "Performance"], initials: "RK" },
];

type Course = { id: string; code: string; title: string; duration: string; weeks: number; department: string; overview: string; syllabus: string[] };

const COURSES: Course[] = [
  { id: "dsa", code: "QC-101", title: "Data Structures & Algorithms", duration: "5 weeks", weeks: 5, department: "Computer Science",
    overview: "Build fluency in the algorithmic patterns that underpin every technical interview and production system. Weekly problem sets are graded by peers and reviewed by faculty TAs.",
    syllabus: ["Complexity, arrays, hashing", "Linked lists, stacks, queues, two-pointer technique", "Trees, graphs, BFS/DFS", "Dynamic programming & greedy strategies", "Capstone: interview-grade problem portfolio"] },
  { id: "ai", code: "QC-210", title: "Basic AI & Machine Learning", duration: "3 weeks", weeks: 3, department: "Artificial Intelligence",
    overview: "An applied introduction to supervised learning, neural networks, and modern LLM workflows — finishing with a deployed inference demo.",
    syllabus: ["Linear & logistic regression, gradient descent", "Neural nets, backprop, PyTorch fundamentals", "Capstone: fine-tune & deploy a small model"] },
  { id: "py", code: "QC-110", title: "Python Programming", duration: "3 weeks", weeks: 3, department: "Programming Languages",
    overview: "From syntax to idiomatic, testable Python. Designed for absolute beginners but paced so career-switchers stay engaged.",
    syllabus: ["Syntax, control flow, data structures", "Functions, modules, packaging, pytest", "Capstone: CLI tool published to PyPI"] },
  { id: "java", code: "QC-115", title: "Java Development", duration: "4 weeks", weeks: 4, department: "Programming Languages",
    overview: "OOP, the JVM, and the Spring ecosystem — taught through building a real REST API students can list on their resume.",
    syllabus: ["Core Java, collections, generics", "OOP & design patterns", "Spring Boot fundamentals", "Capstone: deploy a REST service"] },
  { id: "biz", code: "QC-320", title: "Business Analytics", duration: "3 weeks", weeks: 3, department: "Business & Data",
    overview: "SQL, dashboards, and the soft skill of telling a story with numbers. Built with our partner faculty in the business school.",
    syllabus: ["SQL for analysts, window functions", "Dashboarding with Looker / Metabase", "Capstone: stakeholder-ready insight report"] },
  { id: "ct", code: "QC-100", title: "Computational Thinking", duration: "3 weeks", weeks: 3, department: "Core Engineering",
    overview: "The pre-requisite no one assigns. Decomposition, abstraction, and pattern recognition — the operating system every engineer runs on.",
    syllabus: ["Decomposition & abstraction", "Pattern recognition & algorithmic thinking", "Capstone: model a real-world system"] },
];

function Index() {
  return (
    <div className="min-h-screen text-foreground">
      <Header />
      <main>
        <Hero />
        <About />
        <Faculty />
        <Courses />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2"><Logo /></a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{n.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <Button variant="ghost" size="sm">Sign in</Button>
          <Button size="sm" className="bg-ink text-parchment hover:bg-ink/90">Register</Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] max-w-sm bg-background">
            <div className="mt-8 flex flex-col gap-1">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={() => setOpen(false)} className="rule-line py-4 font-display text-2xl text-foreground">{n.label}</a>
              ))}
              <div className="mt-6 flex flex-col gap-2">
                <Button variant="outline">Sign in</Button>
                <Button className="bg-ink text-parchment hover:bg-ink/90">Register</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-parchment">
        <span className="font-display text-lg font-bold leading-none">Q</span>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Quick<span className="text-marigold">Catch</span>
      </span>
    </span>
  );
}

function Hero() {
  return (
    <section id="home" className="paper-grain relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-foreground/40" />
          <span>Volume 01 · Fall Cohort Open</span>
        </div>
        <h1 className="mt-6 max-w-5xl font-display text-5xl font-medium leading-[0.95] sm:text-7xl md:text-[5.5rem]">
          A student-run academy,<br />
          <span className="italic text-marigold">curated by the faculty</span><br />
          you wish you had.
        </h1>
        <p className="mt-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          QuickCatch bridges classroom theory and shipped work. Free, department-backed
          curriculums in CS, AI/ML, and engineering — taught alongside the professors
          who'd otherwise gatekeep them.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" className="bg-ink text-parchment hover:bg-ink/90" asChild>
            <a href="#courses">Browse courses <ArrowRight className="ml-1 h-4 w-4" /></a>
          </Button>
          <Button size="lg" variant="outline" className="border-ink/30 bg-transparent" asChild>
            <a href="#faculty">Meet the faculty</a>
          </Button>
        </div>
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-card p-6 sm:p-8">
              <div className="font-display text-4xl font-medium tracking-tight sm:text-5xl">{s.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute -right-20 -top-10 select-none font-display text-[28rem] leading-none text-marigold/10 sm:-right-10">Q</div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionLabel>About</SectionLabel>
        <div className="mt-6 grid gap-12 md:grid-cols-12">
          <h2 className="font-display text-4xl font-medium leading-tight md:col-span-7 md:text-6xl">
            Three commitments that make
            <span className="italic text-marigold"> QuickCatch </span>
            different from every other online "academy."
          </h2>
          <p className="text-muted-foreground md:col-span-5 md:pt-4 md:text-lg">
            We're not a content farm and we're not a bootcamp. QuickCatch is a
            collaboration: students design the experience, faculty validate the
            depth, and every cohort ships something real.
          </p>
        </div>
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {PILLARS.map((p) => (
            <article key={p.n} className="group bg-card p-8 transition-colors hover:bg-accent/40">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">{p.n}</span>
                <p.icon className="h-5 w-5 text-marigold" />
              </div>
              <h3 className="mt-8 font-display text-2xl font-medium">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faculty() {
  return (
    <section id="faculty" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Faculty advisors</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
              The professors who actually
              <span className="italic text-marigold"> review the work.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Each curriculum is shaped, sequenced, and signed off by a department advisor
            with a research and industry track record. No ghost names. No affiliate logos.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {FACULTY.map((f) => (
            <article key={f.name} className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-marigold/40 hover:shadow-[0_20px_50px_-30px_oklch(0.22_0.04_250)]">
              <div className="flex items-start gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink font-display text-xl font-semibold text-parchment ring-4 ring-marigold/20">{f.initials}</div>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl font-medium">{f.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{f.title}</p>
                  <p className="mt-1 text-sm font-medium text-marigold">{f.field}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
              <div className="flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <Badge key={t} variant="outline" className="border-ink/15 bg-background font-normal text-foreground">{t}</Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Courses() {
  const [selected, setSelected] = useState<Course | null>(null);
  return (
    <section id="courses" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Catalog · Fall</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Six curriculums.<br />
              <span className="italic text-marigold">Zero filler.</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            Tap any row to expand the full weekly syllabus, capstone, and enrollment details.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="hidden grid-cols-12 gap-4 border-b border-border bg-background/50 px-6 py-4 text-xs uppercase tracking-[0.18em] text-muted-foreground md:grid">
            <div className="col-span-1">Code</div>
            <div className="col-span-5">Curriculum</div>
            <div className="col-span-3">Department</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-1 text-right">Open</div>
          </div>
          {COURSES.map((c, i) => (
            <button key={c.id} onClick={() => setSelected(c)} className={`group grid w-full grid-cols-12 items-center gap-4 px-6 py-6 text-left transition-colors hover:bg-accent/40 ${i !== COURSES.length - 1 ? "border-b border-border" : ""}`}>
              <div className="col-span-12 font-mono text-xs text-muted-foreground md:col-span-1">{c.code}</div>
              <div className="col-span-12 md:col-span-5">
                <div className="font-display text-xl font-medium leading-snug">{c.title}</div>
                <div className="mt-1 text-sm text-muted-foreground md:hidden">{c.department} · {c.duration}</div>
              </div>
              <div className="col-span-6 hidden text-sm text-foreground md:col-span-3 md:block">{c.department}</div>
              <div className="col-span-6 hidden items-center gap-2 text-sm text-foreground md:col-span-2 md:flex">
                <Clock className="h-4 w-4 text-muted-foreground" /> {c.duration}
              </div>
              <div className="col-span-12 flex justify-end md:col-span-1">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background transition-all group-hover:border-marigold group-hover:bg-marigold group-hover:text-marigold-foreground">
                  <ChevronDown className="h-4 w-4 -rotate-90" />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
      <CourseDrawer course={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

function CourseDrawer({ course, onClose }: { course: Course | null; onClose: () => void }) {
  return (
    <Drawer open={!!course} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-background">
        {course && (
          <div className="mx-auto w-full max-w-3xl px-5 pb-2 sm:px-8">
            <DrawerHeader className="px-0">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="font-mono">{course.code}</span><span>·</span><span>{course.department}</span>
              </div>
              <DrawerTitle className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">{course.title}</DrawerTitle>
              <DrawerDescription className="text-base text-muted-foreground">{course.overview}</DrawerDescription>
            </DrawerHeader>
            <div className="mt-2">
              <h4 className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-marigold" /> Weekly outline
              </h4>
              <ol className="mt-4 space-y-3">
                {course.syllabus.map((w, i) => (
                  <li key={i} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                    <span className="font-mono text-xs text-muted-foreground">W{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-sm text-foreground">{w}</span>
                  </li>
                ))}
              </ol>
            </div>
            <DrawerFooter className="px-0">
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
                <DrawerClose asChild><Button variant="outline">Close</Button></DrawerClose>
                <Button className="bg-marigold text-marigold-foreground hover:bg-marigold/90">
                  Enroll — Free <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </DrawerFooter>
          </div>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Contact</SectionLabel>
            <h2 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Questions, partnerships,
              <span className="italic text-marigold"> or a syllabus </span>
              you'd like us to teach?
            </h2>
            <p className="mt-6 text-muted-foreground">
              The student board reviews messages weekly. Faculty inquiries are routed
              directly to the appropriate department advisor.
            </p>
            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                <div>
                  <div className="font-medium">academic@quickcatch.edu</div>
                  <div className="text-muted-foreground">Faculty & curriculum partnerships</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                <div>
                  <div className="font-medium">hello@quickcatch.edu</div>
                  <div className="text-muted-foreground">Student support & general inquiries</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                <div>
                  <div className="font-medium">Block C, Innovation Hall</div>
                  <div className="text-muted-foreground">Open hours: Tue & Thu, 4–6pm</div>
                </div>
              </li>
            </ul>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks — the student board will be in touch within a week."); }}
            className="rounded-2xl border border-border bg-card p-8 md:col-span-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name"><Input required placeholder="Alex" /></Field>
              <Field label="Last name"><Input required placeholder="Ramirez" /></Field>
              <Field label="Email" className="sm:col-span-2"><Input required type="email" placeholder="you@university.edu" /></Field>
              <Field label="I'm reaching out as" className="sm:col-span-2">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option>A prospective student</option>
                  <option>A faculty advisor</option>
                  <option>A university partner</option>
                  <option>A collaborator / sponsor</option>
                </select>
              </Field>
              <Field label="Message" className="sm:col-span-2">
                <Textarea required rows={5} placeholder="Tell us what you'd like to learn, teach, or build with us." />
              </Field>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">We typically respond within 5 business days.</p>
              <Button type="submit" className="bg-ink text-parchment hover:bg-ink/90">Send message <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-px w-8 bg-foreground/40" />
      <span>{children}</span>
    </div>
  );
}

function Footer() {
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
            <a href="#contact" className="hover:text-parchment">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
