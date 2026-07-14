import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { z } from "zod";
import { ChevronDown, Clock, ArrowRight, Sparkles, Lock, Unlock, Play, FileText, Code2, CheckCircle, Trophy } from "lucide-react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { useAuth } from "@/lib/auth-context";
import { fetchCourseProgress, updateCourseProgress } from "@/lib/api/auth.functions";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const courseSearchSchema = z.object({
  select: z.string().optional(),
});

export const Route = createFileRoute("/courses")({
  validateSearch: (search) => courseSearchSchema.parse(search),
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

export type Course = {
  id: string;
  code: string;
  title: string;
  duration: string;
  weeks: number;
  department: string;
  overview: string;
  syllabus: string[];
};

export const COURSES: Course[] = [
  {
    id: "dsa",
    code: "QC-101",
    title: "Data Structures & Algorithms",
    duration: "5 weeks",
    weeks: 5,
    department: "Computer Science",
    overview: "Build fluency in the algorithmic patterns that underpin every technical interview and production system. Weekly problem sets are graded by peers and reviewed by faculty TAs.",
    syllabus: [
      "Complexity, arrays, hashing",
      "Linked lists, stacks, queues, two-pointer technique",
      "Trees, graphs, BFS/DFS",
      "Dynamic programming & greedy strategies",
      "Capstone: interview-grade problem portfolio"
    ]
  },
  {
    id: "ai",
    code: "QC-210",
    title: "Basic AI & Machine Learning",
    duration: "3 weeks",
    weeks: 3,
    department: "Artificial Intelligence",
    overview: "An applied introduction to supervised learning, neural networks, and modern LLM workflows — finishing with a deployed inference demo.",
    syllabus: [
      "Linear & logistic regression, gradient descent",
      "Neural nets, backprop, PyTorch fundamentals",
      "Capstone: fine-tune & deploy a small model"
    ]
  },
  {
    id: "py",
    code: "QC-110",
    title: "Python Programming",
    duration: "3 weeks",
    weeks: 3,
    department: "Programming Languages",
    overview: "From syntax to idiomatic, testable Python. Designed for absolute beginners but paced so career-switchers stay engaged.",
    syllabus: [
      "Syntax, control flow, data structures",
      "Functions, modules, packaging, pytest",
      "Capstone: CLI tool published to PyPI"
    ]
  },
  {
    id: "java",
    code: "QC-115",
    title: "Java Development",
    duration: "4 weeks",
    weeks: 4,
    department: "Programming Languages",
    overview: "OOP, the JVM, and the Spring ecosystem — taught through building a real REST API students can list on their resume.",
    syllabus: [
      "Core Java, collections, generics",
      "OOP & design patterns",
      "Spring Boot fundamentals",
      "Capstone: deploy a REST service"
    ]
  },
  {
    id: "biz",
    code: "QC-320",
    title: "Business Analytics",
    duration: "3 weeks",
    weeks: 3,
    department: "Business & Data",
    overview: "SQL, dashboards, and the soft skill of telling a story with numbers. Built with our partner faculty in the business school.",
    syllabus: [
      "SQL for analysts, window functions",
      "Dashboarding with Looker / Metabase",
      "Capstone: stakeholder-ready insight report"
    ]
  },
  {
    id: "ct",
    code: "QC-100",
    title: "Computational Thinking",
    duration: "3 weeks",
    weeks: 3,
    department: "Core Engineering",
    overview: "The pre-requisite no one assigns. Decomposition, abstraction, and pattern recognition — the operating system every engineer runs on.",
    syllabus: [
      "Decomposition & abstraction",
      "Pattern recognition & algorithmic thinking",
      "Capstone: model a real-world system"
    ]
  },
  {
    id: "web-dev",
    code: "QC-120",
    title: "Web Development",
    duration: "5 weeks",
    weeks: 5,
    department: "Computer Science",
    overview: "Build modern, responsive web applications using HTML, CSS, JavaScript, React, and modern frontend development best practices.",
    syllabus: [
      "HTML and Basic CSS",
      "Advanced CSS",
      "JavaScript",
      "React",
      "Frontend Projects & Deployment"
    ]
  },
  {
    id: "data-analytics",
    code: "QC-130",
    title: "Data Analytics",
    duration: "4 weeks",
    weeks: 4,
    department: "Business & Data",
    overview: "Build practical data skills using Python, SQL, and modern BI tools to turn raw data into business impact.",
    syllabus: [
      "Python basics and data manipulation",
      "SQL fundamentals and database querying",
      "Data visualization and reporting",
      "Capstone: end-to-end analytics project"
    ]
  }
];

function Courses() {
  const { select } = Route.useSearch();
  const [selected, setSelected] = useState<Course | null>(null);
  const [openInConfirmMode, setOpenInConfirmMode] = useState(false);
  const { enrolledCourses } = useAuth();

  // Auto-select course drawer if it's passed as a search param
  useEffect(() => {
    if (select) {
      const found = COURSES.find((c) => c.id === select);
      if (found) {
        setSelected(found);
      }
    }
  }, [select]);

  const handleRowEnrollClick = (course: Course) => {
    setOpenInConfirmMode(true);
    setSelected(course);
  };

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
            Tap any row to view the weekly syllabus, complete exercises, and enroll.
          </p>
        </div>
        <div className="mt-12 overflow-hidden rounded-2xl border border-border bg-card">
          <div className="hidden grid-cols-12 gap-4 border-b border-border bg-background/50 px-6 py-4 text-xs uppercase tracking-[0.18em] text-muted-foreground md:grid">
            <div className="col-span-1">Code</div>
            <div className="col-span-4">Curriculum</div>
            <div className="col-span-3">Department</div>
            <div className="col-span-2">Duration</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>
          {COURSES.map((c, i) => {
            const isEnrolled = enrolledCourses.includes(c.id);
            return (
              <div
                key={c.id}
                className={`group grid grid-cols-12 items-center gap-4 px-6 py-5 transition-colors hover:bg-accent/40 ${i !== COURSES.length - 1 ? "border-b border-border" : ""
                  }`}
              >
                {/* Clickable details area */}
                <div
                  onClick={() => setSelected(c)}
                  className="col-span-9 md:col-span-10 grid grid-cols-10 items-center gap-4 cursor-pointer"
                >
                  <div className="col-span-10 md:col-span-1 font-mono text-xs text-muted-foreground">
                    {c.code}
                  </div>
                  <div className="col-span-10 md:col-span-4">
                    <div className="flex items-center gap-3">
                      <span className="font-display text-lg font-medium leading-snug group-hover:text-marigold transition-colors">
                        {c.title}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground md:hidden">
                      {c.department} · {c.duration}
                    </div>
                  </div>
                  <div className="col-span-5 hidden text-sm text-foreground md:col-span-3 md:block">
                    {c.department}
                  </div>
                  <div className="col-span-5 hidden items-center gap-2 text-sm text-foreground md:col-span-2 md:flex">
                    <Clock className="h-4 w-4 text-muted-foreground" /> {c.duration}
                  </div>
                </div>

                {/* Explicit action buttons on the right */}
                <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
                  {isEnrolled ? (
                    <Button
                      size="sm"
                      onClick={() => setSelected(c)}
                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-3 py-1.5 h-8 rounded-full transition-all"
                    >
                      Enrolled ✓
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleRowEnrollClick(c)}
                      className="bg-marigold text-marigold-foreground hover:bg-marigold/90 text-xs font-semibold px-4 py-1.5 h-8 rounded-full shadow-sm transition-all"
                    >
                      Enroll
                    </Button>
                  )}
                  <button
                    onClick={() => setSelected(c)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background transition-all group-hover:border-marigold group-hover:bg-marigold group-hover:text-marigold-foreground cursor-pointer"
                    title="View syllabus"
                  >
                    <ChevronDown className="h-3.5 w-3.5 -rotate-90" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CourseDrawer
        course={selected}
        onClose={() => {
          setSelected(null);
          setOpenInConfirmMode(false);
        }}
        openInConfirmMode={openInConfirmMode}
      />
    </section>
  );
}

function CourseDrawer({
  course,
  onClose,
  openInConfirmMode
}: {
  course: Course | null;
  onClose: () => void;
  openInConfirmMode: boolean;
}) {
  const { enrolledCourses, enrollCourse, unenrollCourse, user, openAuthModal } = useAuth();
  const isEnrolled = course ? enrolledCourses.includes(course.id) : false;

  const [expandedWeek, setExpandedWeek] = useState<number | null>(null);
  const [completedWeeks, setCompletedWeeks] = useState<string[]>([]);

  // Confirmation form state
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmName, setConfirmName] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmPhone, setConfirmPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load completed weeks from database when active course or user changes
  useEffect(() => {
    let active = true;
    if (user && course) {
      fetchCourseProgress({ data: { userId: user.id, courseId: course.id } })
        .then((res) => {
          if (active) {
            setCompletedWeeks(res.completedWeeks);
          }
        })
        .catch((err) => {
          console.error("Failed to load course progress from database:", err);
          if (active) {
            setCompletedWeeks([]);
          }
        });
    } else {
      setCompletedWeeks([]);
    }
    setExpandedWeek(null); // Reset expanded week when switching courses

    return () => {
      active = false;
    };
  }, [course, user]);

  // Set confirm mode based on prop
  useEffect(() => {
    if (openInConfirmMode) {
      if (!user) {
        openAuthModal("register");
        onClose();
        toast.info("Please create a student account to enroll in courses.");
      } else {
        setShowConfirm(true);
      }
    } else {
      setShowConfirm(false);
    }
  }, [course, user, openInConfirmMode]);

  // Prefill confirmation inputs when confirmation form opens
  useEffect(() => {
    if (showConfirm && user) {
      setConfirmName(user.name);
      setConfirmEmail(user.email);
      setConfirmPhone(user.phone || "");
    }
  }, [showConfirm, user]);

  if (!course) return null;

  const handleWeekClick = (index: number) => {
    if (!isEnrolled) {
      toast.info("Please enroll in this course to unlock detailed resources and track progress!");
      return;
    }
    setExpandedWeek(expandedWeek === index ? null : index);
  };

  const toggleWeekCompleted = async (weekIndex: number) => {
    if (!user || !course) return;
    const weekId = `${course.id}-w${weekIndex}`;
    let updated: string[];
    if (completedWeeks.includes(weekId)) {
      updated = completedWeeks.filter((id) => id !== weekId);
      toast.info(`Marked Week ${weekIndex + 1} as incomplete.`);
    } else {
      updated = [...completedWeeks, weekId];
      toast.success(`Great job! Completed Week ${weekIndex + 1}.`);
    }
    
    // Optimistic UI update
    setCompletedWeeks(updated);

    try {
      await updateCourseProgress({
        data: {
          userId: user.id,
          courseId: course.id,
          completedWeeks: updated,
        },
      });
    } catch (err) {
      console.error("Failed to save course progress to database:", err);
      toast.error("Could not sync progress with the database. Please try again.");
    }
  };

  const handleEnrollClick = () => {
    if (!user) {
      openAuthModal("register");
      onClose();
      toast.info("Please create a student account to enroll in courses.");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirmEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmName.trim()) {
      toast.error("Please provide your name.");
      return;
    }
    if (!confirmEmail.trim()) {
      toast.error("Please provide your email.");
      return;
    }
    if (!confirmPhone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    setIsSubmitting(true);
    try {
      await enrollCourse(course.id, confirmName, confirmEmail, confirmPhone);
      setShowConfirm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const percentComplete = course.syllabus.length > 0
    ? Math.round((completedWeeks.length / course.syllabus.length) * 100)
    : 0;

  return (
    <Drawer open={!!course} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="bg-background border-t border-border max-h-[90vh] overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-5 pb-8 sm:px-8">
          <DrawerHeader className="px-0 text-left">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span className="font-mono bg-accent/60 px-2 py-0.5 rounded">{course.code}</span>
              <span>·</span>
              <span>{course.department}</span>
            </div>
            <DrawerTitle className="mt-3 font-display text-3xl font-medium leading-tight sm:text-4xl">
              {course.title}
            </DrawerTitle>
            <DrawerDescription className="text-base text-muted-foreground mt-2 leading-relaxed">
              {course.overview}
            </DrawerDescription>
          </DrawerHeader>

          {showConfirm ? (
            /* Enrollment Confirmation Form */
            <form onSubmit={handleConfirmEnrollment} className="mt-2 p-5 border border-border bg-card rounded-xl space-y-4">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-marigold font-semibold">
                <Sparkles className="h-4 w-4" /> Finalize Enrollment
              </div>
              <h4 className="text-lg font-semibold text-foreground mt-1">Confirm Student Details</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Confirm your student details to enroll. These will be used for coordinating future announcements, notifications, and coursework.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="confirmName">Full Name</Label>
                  <Input
                    id="confirmName"
                    value={confirmName}
                    onChange={(e) => setConfirmName(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-background border-border/80 focus:border-marigold focus:ring-1 focus:ring-marigold"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="confirmEmail">Email Address</Label>
                  <Input
                    id="confirmEmail"
                    type="email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-background border-border/80 focus:border-marigold focus:ring-1 focus:ring-marigold"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="confirmPhone">Phone Number</Label>
                <Input
                  id="confirmPhone"
                  type="tel"
                  placeholder="+1 (555) 012-3456"
                  value={confirmPhone}
                  onChange={(e) => setConfirmPhone(e.target.value)}
                  required
                  disabled={isSubmitting}
                  className="bg-background border-border/80 focus:border-marigold focus:ring-1 focus:ring-marigold"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowConfirm(false)}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-marigold text-marigold-foreground hover:bg-marigold/90 font-semibold"
                >
                  {isSubmitting ? "Enrolling..." : "Confirm & Enroll"}
                </Button>
              </div>
            </form>
          ) : (
            <>
              {/* Progress dashboard (if enrolled) */}
              {isEnrolled && (
                <div className="bg-emerald-500/[0.04] border border-emerald-500/10 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-5 w-5 text-emerald-500" />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Cohort Progress</h4>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {completedWeeks.length} of {course.syllabus.length} weeks finished ({percentComplete}%)
                      </p>
                    </div>
                  </div>
                  <div className="w-full sm:w-48">
                    <Progress value={percentComplete} className="h-2 bg-secondary" />
                  </div>
                </div>
              )}

              {/* Syllabus Outline */}
              <div className="mt-2">
                <h4 className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  <span className="flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-marigold" /> Weekly Outline
                  </span>
                  <span className="text-[10px] font-sans tracking-normal capitalize font-normal">
                    {isEnrolled ? "Click a week to view lessons" : "Enroll to unlock tasks"}
                  </span>
                </h4>

                <div className="space-y-3">
                  {course.syllabus.map((topic, i) => {
                    const isExpanded = expandedWeek === i;
                    const isWeekDone = completedWeeks.includes(`${course.id}-w${i}`);

                    return (
                      <div
                        key={i}
                        className={`rounded-xl border transition-all ${isEnrolled
                            ? "bg-card border-border/80 hover:border-marigold/30"
                            : "bg-card/40 border-border/40 opacity-80"
                          }`}
                      >
                        <button
                          onClick={() => handleWeekClick(i)}
                          className="w-full flex items-center justify-between p-4 text-left focus:outline-none"
                        >
                          <div className="flex gap-3 items-start flex-1 pr-4">
                            <div className="mt-0.5 flex-shrink-0">
                              {isEnrolled ? (
                                isWeekDone ? (
                                  <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                                ) : (
                                  <Unlock className="h-4.5 w-4.5 text-marigold" />
                                )
                              ) : (
                                <Lock className="h-4 w-4 text-muted-foreground/60 mt-0.5" />
                              )}
                            </div>
                            <div>
                              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                <span className="font-mono">W{String(i + 1).padStart(2, "0")}</span>
                                <span>•</span>
                                <span>Week {i + 1}</span>
                              </div>
                              <h5 className="text-sm font-semibold text-foreground mt-0.5">
                                {topic}
                              </h5>
                            </div>
                          </div>

                          {isEnrolled && (
                            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${isExpanded ? "transform rotate-180" : ""
                              }`} />
                          )}
                        </button>

                        {isEnrolled && isExpanded && (
                          <div className="px-4 pb-4 border-t border-border/60 pt-4 space-y-3 bg-accent/5 rounded-b-xl animate-in slide-in-from-top-1 duration-150">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <button
                                onClick={() => toast.success("Loading recorded lecture... 📽️")}
                                className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border/80 hover:border-marigold/40 hover:bg-accent/40 text-left transition-all text-xs font-medium"
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded bg-marigold/10 text-marigold">
                                  <Play className="h-3.5 w-3.5 fill-current" />
                                </span>
                                <div>
                                  <p className="font-semibold text-foreground">Lecture Recording</p>
                                  <p className="text-[9px] text-muted-foreground">Video lesson (45 mins)</p>
                                </div>
                              </button>

                              <button
                                onClick={() => toast.success("Opening course reader... 📄")}
                                className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border/80 hover:border-marigold/40 hover:bg-accent/40 text-left transition-all text-xs font-medium"
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded bg-marigold/10 text-marigold">
                                  <FileText className="h-3.5 w-3.5" />
                                </span>
                                <div>
                                  <p className="font-semibold text-foreground">Study Material</p>
                                  <p className="text-[9px] text-muted-foreground">PDF notes & reading assignments</p>
                                </div>
                              </button>

                              <button
                                onClick={() => toast.success("Launching coding workspace... 💻")}
                                className="flex items-center gap-3 p-2.5 rounded-lg bg-card border border-border/80 hover:border-marigold/40 hover:bg-accent/40 text-left transition-all text-xs font-medium"
                              >
                                <span className="flex h-7 w-7 items-center justify-center rounded bg-marigold/10 text-marigold">
                                  <Code2 className="h-3.5 w-3.5" />
                                </span>
                                <div>
                                  <p className="font-semibold text-foreground">Coding Assignment</p>
                                  <p className="text-[9px] text-muted-foreground">Submit homework exercises</p>
                                </div>
                              </button>

                              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-500/[0.02] border border-emerald-500/10 text-xs">
                                <div className="flex items-center gap-3">
                                  <span className="flex h-7 w-7 items-center justify-center rounded bg-emerald-500/10 text-emerald-500 font-bold">
                                    ✓
                                  </span>
                                  <div>
                                    <p className="font-semibold text-foreground">Status</p>
                                    <p className="text-[9px] text-muted-foreground">
                                      {isWeekDone ? "Completed" : "In Progress"}
                                    </p>
                                  </div>
                                </div>
                                <input
                                  type="checkbox"
                                  checked={isWeekDone}
                                  onChange={() => toggleWeekCompleted(i)}
                                  className="h-4 w-4 rounded border-border bg-card text-emerald-500 focus:ring-emerald-500 cursor-pointer"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {!showConfirm && (
            <DrawerFooter className="px-0 mt-8">
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-between w-full">
                <DrawerClose asChild>
                  <Button variant="outline">Close Details</Button>
                </DrawerClose>

                {user ? (
                  isEnrolled ? (
                    <Button
                      onClick={() => { unenrollCourse(course.id); onClose(); }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-1.5"
                    >
                      Enrolled ✓ <span className="text-xs opacity-85">(Leave Course)</span>
                    </Button>
                  ) : (
                    <Button
                      onClick={handleEnrollClick}
                      className="bg-marigold text-marigold-foreground hover:bg-marigold/90"
                    >
                      Enroll — Free <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  )
                ) : (
                  <Button
                    onClick={() => { openAuthModal("register"); onClose(); }}
                    className="bg-ink text-parchment hover:bg-ink/90"
                  >
                    Register to Enroll <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                )}
              </div>
            </DrawerFooter>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
