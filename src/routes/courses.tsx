import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ChevronDown, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — QuickCatch" },
      { name: "description", content: "Six faculty-curated curriculums in CS, AI/ML, programming languages, and analytics. Zero filler." },
      { property: "og:title", content: "Courses — QuickCatch" },
      { property: "og:description", content: "Six curriculums. Zero filler. Free to enroll." },
    ],
  }),
  component: Courses,
});

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

function Courses() {
  const [selected, setSelected] = useState<Course | null>(null);
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Catalog · Fall</SectionLabel>
            <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Six curriculums.<br />
              <span className="italic text-marigold">Zero filler.</span>
            </h1>
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
