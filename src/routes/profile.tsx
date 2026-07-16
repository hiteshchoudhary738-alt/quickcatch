import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  GraduationCap,
  Mail,
  User as UserIcon,
  LogOut,
  ArrowRight,
  ExternalLink,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { COURSES } from "./courses";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My Profile — QuickCatch" },
      {
        name: "description",
        content: "View your student profile, academic standing, and enrolled courses.",
      },
    ],
  }),
  component: Profile,
});

function Profile() {
  const { user, enrolledCourses, logout, openAuthModal, unenrollCourse } = useAuth();
  const navigate = useNavigate();

  // Filter courses that user is enrolled in
  const userCourses = COURSES.filter((course) => enrolledCourses.includes(course.id));

  if (!user) {
    return (
      <section className="bg-secondary/40 min-h-[80vh] flex items-center justify-center py-16">
        <div className="mx-auto max-w-md px-5 text-center">
          <div className="bg-card border border-border/80 rounded-2xl p-8 shadow-xl">
            <GraduationCap className="mx-auto h-16 w-16 text-marigold" />
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">
              Sign in to view your profile
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please log in or register a student account to view your enrollments, syllabus, and
              track progress.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button
                onClick={() => openAuthModal("signin")}
                className="w-full bg-marigold text-marigold-foreground hover:bg-marigold/90 font-semibold"
              >
                Sign In
              </Button>
              <Button
                onClick={() => openAuthModal("register")}
                variant="outline"
                className="w-full"
              >
                Create Student Account
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-secondary/40 min-h-screen py-16">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        {/* Profile Card Header */}
        <div className="bg-card border border-border/80 rounded-3xl p-6 sm:p-10 shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-marigold/5 rounded-full blur-3xl -z-10" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-20 w-20 border-2 border-marigold">
              <AvatarFallback className="bg-marigold text-marigold-foreground text-2xl font-semibold">
                {user.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display text-3xl font-semibold text-foreground tracking-tight">
                {user.name}
              </h1>
              <div className="mt-2 space-y-1.5 flex flex-col items-center sm:items-start text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-marigold" /> {user.email}
                </span>
                <span className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4 text-marigold" /> Academic Status: Active Student
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                logout();
                navigate({ to: "/" });
              }}
              className="flex items-center gap-2 border-border/80 text-destructive hover:bg-destructive/5 hover:text-destructive self-center sm:self-start"
            >
              <LogOut className="h-4 w-4" />
              <span>Sign out</span>
            </Button>
          </div>
        </div>

        {/* Course Catalog Title */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-display text-2xl font-medium text-foreground flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-marigold" /> My Cohorts ({userCourses.length})
          </h2>
          {userCourses.length > 0 && (
            <Link
              to="/courses"
              className="text-sm text-marigold hover:underline flex items-center gap-1"
            >
              Browse More <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {/* User Enrolled Courses */}
        {userCourses.length === 0 ? (
          <div className="bg-card border border-border/80 rounded-2xl p-10 text-center shadow-md">
            <GraduationCap className="mx-auto h-12 w-12 text-muted-foreground/60" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              Not Enrolled in Any Courses
            </h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">
              You haven't enrolled in any courses yet. QuickCatch offers free, faculty-curated
              curriculums.
            </p>
            <Button
              asChild
              className="mt-6 bg-marigold text-marigold-foreground hover:bg-marigold/90 font-semibold"
            >
              <Link to="/courses">Explore Course Catalog</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userCourses.map((course) => (
              <div
                key={course.id}
                className="bg-card border border-border/80 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs text-muted-foreground bg-accent/60 px-2 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {course.duration}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    {course.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                    {course.overview}
                  </p>
                </div>

                <div className="flex items-center gap-2 border-t border-border/50 pt-4 mt-auto">
                  <Button
                    asChild
                    className="flex-1 bg-ink text-parchment hover:bg-ink/90 font-medium text-xs flex items-center justify-center gap-1.5"
                  >
                    <Link to="/courses" search={{ select: course.id }}>
                      <span>View Course Material</span>
                      <ExternalLink className="h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => unenrollCourse(course.id)}
                    className="text-destructive hover:bg-destructive/5"
                    title="Leave course"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
