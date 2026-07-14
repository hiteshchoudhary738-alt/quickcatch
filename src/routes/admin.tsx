import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { fetchAdminEnrollments } from "@/lib/api/auth.functions";
import { COURSES } from "./courses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Download,
  Copy,
  Search,
  Mail,
  Phone,
  Users,
  BookOpen,
  Calendar,
  Lock,
  ArrowRight,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — QuickCatch" },
      { name: "description", content: "View student enrollments and export registration lists." },
    ],
  }),
  component: AdminPortal,
});

interface AdminEnrollment {
  id: string;
  courseId: string;
  createdAt: string;
  studentName: string;
  studentEmail: string;
  studentPhone: string;
}

function AdminPortal() {
  const { user, openAuthModal } = useAuth();
  const [data, setData] = useState<AdminEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseFilter, setSelectedCourseFilter] = useState("all");

  useEffect(() => {
    if (!user) return;
    
    setLoading(true);
    fetchAdminEnrollments()
      .then((res) => {
        setData(res.enrollments);
      })
      .catch((err) => {
        console.error("Failed to load admin enrollments:", err);
        toast.error("Could not load registration data.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <section className="bg-secondary/40 min-h-[85vh] flex items-center justify-center py-16">
        <div className="mx-auto max-w-md px-5 text-center">
          <div className="bg-card border border-border/80 rounded-2xl p-8 shadow-xl">
            <Lock className="mx-auto h-16 w-16 text-marigold" />
            <h1 className="mt-4 font-display text-2xl font-bold text-foreground">Access Restricted</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Please sign in or register to access the enrollment dashboard.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <Button 
                onClick={() => openAuthModal("signin")} 
                className="w-full bg-marigold text-marigold-foreground hover:bg-marigold/90 font-semibold"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Filtered dataset
  const filteredData = data.filter((e) => {
    const course = COURSES.find((c) => c.id === e.courseId);
    const courseTitle = course?.title || "";
    const courseCode = course?.code || "";
    
    const query = searchQuery.toLowerCase();
    const matchesSearch = 
      e.studentName.toLowerCase().includes(query) ||
      e.studentEmail.toLowerCase().includes(query) ||
      e.studentPhone.toLowerCase().includes(query) ||
      courseTitle.toLowerCase().includes(query) ||
      courseCode.toLowerCase().includes(query);

    const matchesCourse = selectedCourseFilter === "all" || e.courseId === selectedCourseFilter;

    return matchesSearch && matchesCourse;
  });

  // Calculate unique students
  const uniqueStudentEmails = Array.from(new Set(data.map((d) => d.studentEmail)));

  // Export to CSV Function
  const exportToCSV = () => {
    if (filteredData.length === 0) {
      toast.info("No enrollment data to export.");
      return;
    }
    const headers = ["Student Name", "Email Address", "Phone Number", "Course ID", "Course Title", "Enrollment Date"];
    
    const rows = filteredData.map((e) => {
      const course = COURSES.find((c) => c.id === e.courseId);
      return [
        `"${e.studentName.replace(/"/g, '""')}"`,
        `"${e.studentEmail.replace(/"/g, '""')}"`,
        `"${e.studentPhone.replace(/"/g, '""')}"`,
        `"${e.courseId}"`,
        `"${course?.title || e.courseId}"`,
        `"${new Date(e.createdAt).toLocaleDateString()}"`
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `quickcatch_enrollments_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("CSV file exported successfully!");
  };

  // Copy Bulk Emails list
  const copyEmailsList = () => {
    const emails = Array.from(new Set(filteredData.map((e) => e.studentEmail))).join(", ");
    if (!emails) {
      toast.info("No emails to copy.");
      return;
    }
    navigator.clipboard.writeText(emails);
    toast.success("Copied all unique emails to clipboard! (Ready to paste in Mail client)");
  };

  // Copy Bulk Phone Numbers list
  const copyPhoneList = () => {
    const phones = Array.from(new Set(filteredData.map((e) => e.studentPhone))).filter(p => p !== "N/A").join(", ");
    if (!phones) {
      toast.info("No phone numbers to copy.");
      return;
    }
    navigator.clipboard.writeText(phones);
    toast.success("Copied all unique phone numbers to clipboard!");
  };

  return (
    <section className="bg-secondary/40 min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="font-display text-3xl font-semibold text-foreground tracking-tight sm:text-4xl">
              Student Enrollments Portal
            </h1>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-2xl">
              Real-time directory of all course signups. Search students, filter by cohort, and download connection sheets.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Button
              onClick={exportToCSV}
              className="bg-marigold text-marigold-foreground hover:bg-marigold/90 font-medium flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              <span>Export to Excel/CSV</span>
            </Button>

            <Button
              variant="outline"
              onClick={copyEmailsList}
              className="flex items-center gap-2 border-border/80 bg-background"
            >
              <Copy className="h-4 w-4 text-marigold" />
              <span>Copy Email List</span>
            </Button>

            <Button
              variant="outline"
              onClick={copyPhoneList}
              className="flex items-center gap-2 border-border/80 bg-background"
            >
              <Phone className="h-4 w-4 text-marigold" />
              <span>Copy Phone List</span>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="bg-marigold/10 text-marigold p-3.5 rounded-xl">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Enrollments</p>
              <h3 className="text-2xl font-bold mt-1 text-foreground">{data.length}</h3>
            </div>
          </div>
          
          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-3.5 rounded-xl">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Unique Students</p>
              <h3 className="text-2xl font-bold mt-1 text-foreground">{uniqueStudentEmails.length}</h3>
            </div>
          </div>

          <div className="bg-card border border-border/80 rounded-2xl p-6 shadow-sm flex items-center gap-4">
            <div className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 p-3.5 rounded-xl">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active Classes</p>
              <h3 className="text-2xl font-bold mt-1 text-foreground">
                {Array.from(new Set(data.map((d) => d.courseId))).length}
              </h3>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-card border border-border/80 rounded-2xl p-5 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by student name, email, number, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background border-border/80 focus:border-marigold focus:ring-1 focus:ring-marigold"
            />
          </div>

          {/* Course filter select */}
          <div className="flex items-center gap-2 min-w-[200px]">
            <Label htmlFor="courseFilter" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">Filter by Course:</Label>
            <select
              id="courseFilter"
              value={selectedCourseFilter}
              onChange={(e) => setSelectedCourseFilter(e.target.value)}
              className="flex h-9 w-full rounded-md border border-border/80 bg-background px-3 py-1 text-sm shadow-sm transition-all focus:border-marigold focus:ring-1 focus:ring-marigold outline-none cursor-pointer"
            >
              <option value="all">All Courses</option>
              {COURSES.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.code} - {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-card border border-border/80 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-background/50 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  <th className="px-6 py-4 font-semibold">Student Name</th>
                  <th className="px-6 py-4 font-semibold">Email ID</th>
                  <th className="px-6 py-4 font-semibold">Phone Number</th>
                  <th className="px-6 py-4 font-semibold">Enrolled Course</th>
                  <th className="px-6 py-4 font-semibold">Date Enrolled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-muted-foreground text-sm">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-marigold border-t-transparent" />
                        <span>Fetching local database records...</span>
                      </div>
                    </td>
                  </tr>
                ) : filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-20 text-muted-foreground text-sm">
                      No matching student registrations found.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => {
                    const course = COURSES.find((c) => c.id === row.courseId);
                    return (
                      <tr key={row.id} className="hover:bg-accent/25 transition-colors text-sm">
                        <td className="px-6 py-4 font-semibold text-foreground">
                          {row.studentName}
                        </td>
                        <td className="px-6 py-4 text-muted-foreground flex items-center gap-1.5">
                          <Mail className="h-3.5 w-3.5 text-marigold" />
                          <span>{row.studentEmail}</span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-marigold" />
                            <span>{row.studentPhone}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-accent/80 px-2.5 py-0.5 text-xs font-semibold text-foreground border border-border">
                            {course ? `${course.code} • ${course.title}` : row.courseId}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
                            <span>{new Date(row.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {/* Table Footer Summary */}
          <div className="border-t border-border bg-background/50 px-6 py-4 text-xs text-muted-foreground flex items-center justify-between">
            <span>Showing {filteredData.length} of {data.length} total entries</span>
            <span>Local PostgreSQL Database connected</span>
          </div>
        </div>

      </div>
    </section>
  );
}
