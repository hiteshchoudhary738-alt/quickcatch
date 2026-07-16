import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — QuickCatch" },
      {
        name: "description",
        content:
          "Reach the student board or faculty advisors. Partnerships, syllabus proposals, and student inquiries welcome.",
      },
      { property: "og:title", content: "Contact — QuickCatch" },
      { property: "og:description", content: "Reach the student board or faculty advisors." },
    ],
  }),
  component: Contact,
});

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Contact() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel>Contact</SectionLabel>
            <h1 className="mt-4 font-display text-4xl font-medium leading-tight sm:text-5xl">
              Questions, partnerships,
              <span className="italic text-marigold"> or a syllabus </span>
              you'd like us to teach?
            </h1>
            <p className="mt-6 text-muted-foreground">
              The student board reviews messages weekly. Faculty inquiries are routed directly to
              the appropriate department advisor.
            </p>
            <ul className="mt-10 space-y-5 text-sm">
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                <div>
                  <div className="font-medium">quickcatchh@gmail.com</div>
                  <div className="text-muted-foreground">Faculty & curriculum partnerships</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                <div>
                  <div className="font-medium">quickcatchh@gmail.com</div>
                  <div className="text-muted-foreground">Student support & general inquiries</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-marigold" />
                <div>
                  <div className="font-medium">G-708, RGIPT</div>
                  <div className="text-muted-foreground">Open hours: Mon-Sat, 4–6pm</div>
                </div>
              </li>
            </ul>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks — the student board will be in touch within a week.");
            }}
            className="rounded-2xl border border-border bg-card p-8 md:col-span-7"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name">
                <Input required placeholder="Ramesh" />
              </Field>
              <Field label="Last name">
                <Input required placeholder="Sharma" />
              </Field>
              <Field label="Email" className="sm:col-span-2">
                <Input required type="email" placeholder="you@university.edu" />
              </Field>
              <Field label="I'm reaching out as" className="sm:col-span-2">
                <select className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                  <option>A prospective student</option>
                  <option>A faculty advisor</option>
                  <option>A university partner</option>
                  <option>A collaborator / sponsor</option>
                </select>
              </Field>
              <Field label="Message" className="sm:col-span-2">
                <Textarea
                  required
                  rows={5}
                  placeholder="Tell us what you'd like to learn, teach, or build with us."
                />
              </Field>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4">
              <p className="text-xs text-muted-foreground">
                We typically respond within 5 business days.
              </p>
              <Button type="submit" className="bg-ink text-parchment hover:bg-ink/90">
                Send message <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
