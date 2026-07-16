import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  registerUser,
  loginUser,
  fetchUserEnrollments,
  enrollInCourse,
  unenrollFromCourse,
} from "./api/auth.functions";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  enrolledCourses: string[];
  isAuthModalOpen: boolean;
  authModalTab: "signin" | "register";
  openAuthModal: (tab?: "signin" | "register") => void;
  closeAuthModal: () => void;
  login: (email: string, password?: string) => Promise<void>;
  register: (name: string, email: string, password?: string, phone?: string) => Promise<void>;
  logout: () => void;
  enrollCourse: (courseId: string, name?: string, email?: string, phone?: string) => Promise<void>;
  unenrollCourse: (courseId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<"signin" | "register">("signin");
  const [isLoading, setIsLoading] = useState(false);

  // Initialize from LocalStorage and sync with database if logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("qc_user");
    const savedEnrolled = localStorage.getItem("qc_enrolled");

    if (savedUser) {
      const parsedUser = JSON.parse(savedUser) as User;
      setUser(parsedUser);

      // Sync enrollments from SQLite database
      fetchUserEnrollments({ data: { userId: parsedUser.id } })
        .then((res) => {
          setEnrolledCourses(res.courseIds);
          localStorage.setItem("qc_enrolled", JSON.stringify(res.courseIds));
        })
        .catch((err) => {
          console.error("Error syncing enrollments from database:", err);
        });
    }

    if (savedEnrolled) {
      setEnrolledCourses(JSON.parse(savedEnrolled));
    }
  }, []);

  const openAuthModal = (tab: "signin" | "register" = "signin") => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await loginUser({ data: { email, password: password || "" } });
      const loggedInUser = res.user;

      setUser(loggedInUser);
      localStorage.setItem("qc_user", JSON.stringify(loggedInUser));

      // Fetch user's enrollments
      const enrollRes = await fetchUserEnrollments({ data: { userId: loggedInUser.id } });
      setEnrolledCourses(enrollRes.courseIds);
      localStorage.setItem("qc_enrolled", JSON.stringify(enrollRes.courseIds));

      closeAuthModal();
      toast.success(`Welcome back, ${loggedInUser.name}!`);
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password?: string, phone?: string) => {
    setIsLoading(true);
    try {
      const res = await registerUser({ data: { name, email, password: password || "", phone } });
      const newUser = res.user;

      setUser(newUser);
      localStorage.setItem("qc_user", JSON.stringify(newUser));
      setEnrolledCourses([]);
      localStorage.setItem("qc_enrolled", JSON.stringify([]));

      closeAuthModal();
      toast.success(`Account created! Welcome to QuickCatch, ${name}.`);
    } catch (err: any) {
      console.error("Registration error:", err);
      toast.error(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setEnrolledCourses([]);
    localStorage.removeItem("qc_user");
    localStorage.removeItem("qc_enrolled");
    toast.info("You have signed out successfully.");
  };

  const enrollCourse = async (courseId: string, name?: string, email?: string, phone?: string) => {
    if (!user) {
      openAuthModal("register");
      toast.info("Please sign in or register to enroll in courses.");
      return;
    }

    try {
      const res = await enrollInCourse({
        data: {
          userId: user.id,
          courseId,
          name,
          email,
          phone,
        },
      });

      const updated = [...enrolledCourses, courseId];
      setEnrolledCourses(updated);
      localStorage.setItem("qc_enrolled", JSON.stringify(updated));

      // Update local storage user state with any returned updated details (e.g. name, phone)
      if (res.user) {
        setUser(res.user);
        localStorage.setItem("qc_user", JSON.stringify(res.user));
      }

      toast.success("Enrolled successfully! Welcome to the cohort.");
    } catch (err: any) {
      console.error("Enrollment error:", err);
      toast.error("Could not enroll you in this course. Please try again.");
    }
  };

  const unenrollCourse = async (courseId: string) => {
    if (!user) return;

    try {
      await unenrollFromCourse({ data: { userId: user.id, courseId } });
      const updated = enrolledCourses.filter((id) => id !== courseId);
      setEnrolledCourses(updated);
      localStorage.setItem("qc_enrolled", JSON.stringify(updated));
      toast.success("Unenrolled successfully.");
    } catch (err: any) {
      console.error("Unenrollment error:", err);
      toast.error("Could not unenroll you from this course. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        enrolledCourses,
        isAuthModalOpen,
        authModalTab,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        logout,
        enrollCourse,
        unenrollCourse,
      }}
    >
      {children}
      <AuthDialog
        open={isAuthModalOpen}
        tab={authModalTab}
        setTab={setAuthModalTab}
        isLoading={isLoading}
        onClose={closeAuthModal}
        onLogin={login}
        onRegister={register}
      />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthDialogProps {
  open: boolean;
  tab: "signin" | "register";
  setTab: (tab: "signin" | "register") => void;
  isLoading: boolean;
  onClose: () => void;
  onLogin: (email: string, password?: string) => Promise<void>;
  onRegister: (name: string, email: string, password?: string, phone?: string) => Promise<void>;
}

function AuthDialog({
  open,
  tab,
  setTab,
  isLoading,
  onClose,
  onLogin,
  onRegister,
}: AuthDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email.");
      return;
    }
    if (!password) {
      toast.error("Please enter a password.");
      return;
    }
    if (tab === "signin") {
      onLogin(email, password);
    } else {
      if (!name) {
        toast.error("Please enter your name.");
        return;
      }
      onRegister(name, email, password, phone || undefined);
    }
  };

  // Reset fields on toggle
  useEffect(() => {
    setEmail("");
    setPassword("");
    setName("");
    setPhone("");
  }, [tab, open]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-[420px] bg-background border border-border p-6 shadow-2xl rounded-2xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="font-display text-2xl font-semibold tracking-tight text-center">
            {tab === "signin" ? "Welcome Back" : "Start Learning"}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-sm">
            {tab === "signin"
              ? "Sign in to access your course work and cohorts"
              : "Create an account to enroll and track your learning progress"}
          </DialogDescription>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex border-b border-border my-4">
          <button
            onClick={() => setTab("signin")}
            className={`flex-1 pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              tab === "signin"
                ? "border-marigold text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 pb-2.5 text-sm font-medium transition-colors border-b-2 -mb-[2px] ${
              tab === "register"
                ? "border-marigold text-foreground font-semibold"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          {tab === "register" && (
            <>
              <div className="space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Rohit Choudhary"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isLoading}
                  required
                  className="bg-card border-border/80 focus:border-marigold/60 focus:ring-1 focus:ring-marigold/40"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+91 1234567890"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  disabled={isLoading}
                  className="bg-card border-border/80 focus:border-marigold/60 focus:ring-1 focus:ring-marigold/40"
                />
              </div>
            </>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@university.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              className="bg-card border-border/80 focus:border-marigold/60 focus:ring-1 focus:ring-marigold/40"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              {tab === "signin" && (
                <button
                  type="button"
                  className="text-xs text-marigold hover:underline"
                  onClick={() => toast.info("Password reset link simulated!")}
                >
                  Forgot?
                </button>
              )}
            </div>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              required
              className="bg-card border-border/80 focus:border-marigold/60 focus:ring-1 focus:ring-marigold/40"
            />
          </div>

          <Button
            type="submit"
            className="w-full mt-4 bg-ink text-parchment hover:bg-ink/90 font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Please wait..." : tab === "signin" ? "Sign In" : "Create Student Account"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
