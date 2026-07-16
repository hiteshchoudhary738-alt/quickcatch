import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, LogOut, BookOpen, ChevronDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import qcLogo from "@/figures/logo.png";
import { useAuth } from "@/lib/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const NAV = [
  { label: "Home", to: "/" as const },
  { label: "About", to: "/about" as const },
  { label: "Faculty", to: "/faculty" as const },
  { label: "Courses", to: "/courses" as const },
  { label: "Contact", to: "/contact" as const },
];

function Logo() {
  return (
    <span className="flex items-center gap-2">
      <img src={qcLogo} alt="QuickCatch logo" className="h-8 w-auto object-contain" />
      <span className="font-display text-xl font-semibold tracking-tight">
        Quick<span className="text-marigold">Catch</span>
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { user, logout, openAuthModal } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              activeOptions={{ exact: true }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Desktop User Menu */}
        <div className="hidden items-center gap-2 md:flex">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 px-2 py-1.5 h-auto hover:bg-accent rounded-full border border-border/40"
                >
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-marigold text-marigold-foreground text-xs font-semibold">
                      {user.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium pr-1 text-foreground">{user.name}</span>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-56 bg-background border border-border rounded-xl"
              >
                <DropdownMenuLabel className="font-display font-medium text-foreground">
                  <div className="text-sm font-semibold">{user.name}</div>
                  <div className="text-xs text-muted-foreground font-normal mt-0.5">
                    {user.email}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem asChild>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 cursor-pointer text-foreground"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 cursor-pointer text-foreground"
                  >
                    <Users className="h-4 w-4" />
                    <span>Admin Panel</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem
                  onClick={logout}
                  className="flex items-center gap-2 text-destructive focus:text-destructive cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => openAuthModal("signin")}>
                Sign in
              </Button>
              <Button
                size="sm"
                className="bg-ink text-parchment hover:bg-ink/90"
                onClick={() => openAuthModal("register")}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[80%] max-w-sm bg-background border-l border-border"
          >
            <div className="mt-8 flex flex-col gap-1">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rule-line py-4 font-display text-2xl text-foreground border-b border-border/40"
                >
                  {n.label}
                </Link>
              ))}

              {/* Mobile User Menu / Actions */}
              <div className="mt-6 flex flex-col gap-2">
                {user ? (
                  <div className="flex flex-col gap-4 border-t border-border pt-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-marigold text-marigold-foreground font-semibold">
                          {user.name.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-semibold text-foreground">{user.name}</div>
                        <div className="text-xs text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      className="justify-start gap-2"
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link to="/profile">
                        <BookOpen className="h-4 w-4" />
                        <span>My Profile</span>
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start gap-2"
                      asChild
                      onClick={() => setOpen(false)}
                    >
                      <Link to="/admin">
                        <Users className="h-4 w-4" />
                        <span>Admin Panel</span>
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      className="justify-start gap-2"
                      onClick={() => {
                        logout();
                        setOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign out</span>
                    </Button>
                  </div>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        openAuthModal("signin");
                        setOpen(false);
                      }}
                    >
                      Sign in
                    </Button>
                    <Button
                      className="bg-ink text-parchment hover:bg-ink/90"
                      onClick={() => {
                        openAuthModal("register");
                        setOpen(false);
                      }}
                    >
                      Register
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
