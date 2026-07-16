import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — QuickCatch" },
      {
        name: "description",
        content:
          "How QuickCatch Academy handles student information. We are student-led, transparent, and protect your privacy.",
      },
      { property: "og:title", content: "Privacy Policy — QuickCatch" },
      {
        property: "og:description",
        content: "Our transparency commitment. Student-led privacy protocols.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PolicySection({
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

function PrivacyPolicy() {
  return (
    <section className="bg-secondary/20">
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionLabel>Privacy Policy</SectionLabel>

        <div className="mt-6 border-b border-border/80 pb-10">
          <h1 className="font-display text-4xl font-medium leading-tight sm:text-6xl">
            Transparency by default.
            <span className="italic text-marigold"> Your data </span>
            is yours.
          </h1>
          <p className="mt-6 text-sm text-muted-foreground font-mono">
            Last Updated: July 16, 2026
          </p>
        </div>

        <div className="mt-12 space-y-2">
          <PolicySection icon={Shield} title="1. Our Privacy Pledge">
            <p>
              QuickCatch Academy is a student-run academic portal. We build software to help
              students learn modern engineering tools, not to build advertising profiles.
            </p>
            <p>
              We pledge to never sell your personal information, display third-party advertisements,
              or inject invasive tracking pixels into our course materials.
            </p>
          </PolicySection>

          <PolicySection icon={Eye} title="2. Information We Collect">
            <p>To provide a functional online learning space, we collect minimal data:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Account Information:</strong> If you register, we store your name, email
                address, and hashed password.
              </li>
              <li>
                <strong>Course Progress:</strong> We track which modules, assignments, and courses
                you enroll in and complete to render your profile statistics.
              </li>
              <li>
                <strong>System Interactions:</strong> Standard diagnostic data, such as server logs,
                to troubleshoot application errors.
              </li>
            </ul>
          </PolicySection>

          <PolicySection icon={Lock} title="3. Data Storage & Infrastructure">
            <p>
              Your data is stored in our database infrastructure using secure encryption protocols.
            </p>
            <p>
              Since we are a student-operated collective, we leverage trusted third-party cloud
              database providers and hosting partners (like PostgreSQL and modern hosting networks)
              to keep your credentials safe.
            </p>
          </PolicySection>

          <PolicySection icon={FileText} title="4. Cookies & Local State">
            <p>
              We use functional cookies and browser storage (such as LocalStorage and
              SessionStorage) strictly to keep you signed in, remember your theme preference, and
              save local course checkpoints.
            </p>
            <p>
              You can block or purge cookies through your browser settings, though doing so will log
              you out of your courses.
            </p>
          </PolicySection>

          <PolicySection icon={Shield} title="5. Your Choices & Deletion">
            <p>
              You have absolute control over your educational record. You can edit your profile
              information at any time, or request complete account deletion by contacting the
              student board.
            </p>
            <p>
              When an account is deleted, all matching enrollment records, progress, and profile
              details are permanently purged from our active databases.
            </p>
          </PolicySection>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8">
          <h3 className="font-display text-xl font-medium">Questions about your data?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            The student board handles privacy inquiries. For details, data export requests, or total
            account deletion, email us.
          </p>
          <div className="mt-4">
            <a
              href="mailto:quickcatchh@gmail.com"
              className="inline-flex items-center text-sm font-semibold text-marigold hover:underline"
            >
              quickcatchh@gmail.com &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
