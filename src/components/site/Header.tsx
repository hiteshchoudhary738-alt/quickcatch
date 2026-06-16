import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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
      <span className="grid h-8 w-8 place-items-center rounded-md bg-ink text-parchment">
        <span className="font-display text-lg font-bold leading-none">Q</span>
      </span>
      <span className="font-display text-xl font-semibold tracking-tight">
        Quick<span className="text-marigold">Catch</span>
      </span>
    </span>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2"><Logo /></Link>
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
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rule-line py-4 font-display text-2xl text-foreground"
                >
                  {n.label}
                </Link>
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
