import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { BookOpen, AlertTriangle, HelpCircle, CheckCircle } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — QuickCatch" },
      {
        name: "description",
        content:
          "Terms of service for QuickCatch Academy. Free courses, student responsibilities, and curriculum usage rules.",
      },
      { property: "og:title", content: "Terms of Service — QuickCatch" },
      {
        property: "og:description",
        content: "Academic platform terms. Free education resources for students.",
      },
    ],
  }),
  component: TermsOfService,
});

function TermsSection({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <article className="border-b border-border/60 py-8 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-4">
        <div className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-marigold">
          <Icon className="h-5 w-5" />
        </div>
        <div className="space-y-3">
          <h2 className="font-display text-2xl font-medium tracking-tight text-foreground">
            {title}
          </h2>
          <div className="text-sm leading-relaxed text-muted-foreground space-y-4">{children}</div>
        </div>
      </div>
    </article>
  );
}

function TermsOfService() {
  return (
    <section className="bg-secondary/20">
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionLabel>Terms of Service</SectionLabel>

        <div className="mt-6 border-b border-border/80 pb-10">
          <h1 className="font-display text-4xl font-medium leading-tight sm:text-6xl">
            Rules of the road.
            <span className="italic text-marigold"> Open, </span>
            free, and fair.
          </h1>
          <p className="mt-6 text-sm text-muted-foreground font-mono">
            Last Updated: July 16, 2026
          </p>
        </div>

        <div className="mt-12 space-y-2">
          <TermsSection icon={CheckCircle} title="1. Agreement to Terms">
            <p>
              By accessing or using QuickCatch Academy, you agree to comply with and be bound by
              these Terms of Service. If you do not agree, please do not use the platform.
            </p>
            <p>
              Because QuickCatch is student-run and constantly evolving, these terms may be updated
              from time to time. Your continued use of the platform indicates acceptance of any
              modifications.
            </p>
          </TermsSection>

          <TermsSection icon={BookOpen} title="2. Free & Open Curriculum">
            <p>
              All course descriptions, syllabus, exercises, and code repositories curated by
              QuickCatch are free and open-source under permissive community licenses unless stated
              otherwise.
            </p>
            <p>
              You are welcome to clone repositories, read syllabus designs, and adapt materials for
              your own personal educational use. However, attribution to QuickCatch and the
              respective faculty advisors is appreciated.
            </p>
          </TermsSection>

          <TermsSection icon={AlertTriangle} title="3. Non-Accreditation Disclaimer">
            <p>
              <strong>IMPORTANT:</strong> QuickCatch is an independent, student-run academic
              collective. We are NOT an accredited educational institution, college, or university.
            </p>
            <p>
              Enrolling in or completing a course on QuickCatch does not earn you official
              university credits, degrees, or certifications, nor does it guarantee college
              admission or employment.
            </p>
          </TermsSection>

          <TermsSection icon={HelpCircle} title="4. Account Responsibilities">
            <p>When you create an account, you agree to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Provide accurate name and email coordinates.</li>
              <li>Keep your password secure and not share your account.</li>
              <li>
                Refrain from using automated bots to scrape course materials or spam the portal.
              </li>
            </ul>
          </TermsSection>

          <TermsSection icon={AlertTriangle} title="5. Limitation of Liability">
            <p>
              The platform is provided on an "AS IS" and "AS AVAILABLE" basis. QuickCatch makes no
              warranties or guarantees regarding the accuracy of course material, site uptime, or
              database integrity.
            </p>
            <p>
              We are not liable for any issues arising from compiler failures, incorrect grading
              metrics, or third-party API dependencies used in courses.
            </p>
          </TermsSection>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8">
          <h3 className="font-display text-xl font-medium">Community Conduct</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            All users must abide by our Code of Conduct, including rules regarding plagiarism,
            harassment, and collaboration. Violation of community guidelines may result in immediate
            profile suspension.
          </p>
          <div className="mt-4">
            <a
              href="mailto:quickcatchh@gmail.com"
              className="inline-flex items-center text-sm font-semibold text-marigold hover:underline"
            >
              Submit feedback &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
