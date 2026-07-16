import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Heart, Users, MessageSquare, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/code-of-conduct")({
  head: () => ({
    meta: [
      { title: "Code of Conduct — QuickCatch" },
      {
        name: "description",
        content:
          "Our community standards for collaboration, peer mentorship, and respectful learning at QuickCatch Academy.",
      },
      { property: "og:title", content: "Code of Conduct — QuickCatch" },
      {
        property: "og:description",
        content: "Standards of behavior for peer learning and community interaction.",
      },
    ],
  }),
  component: CodeOfConduct,
});

function ConductSection({
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

function CodeOfConduct() {
  return (
    <section className="bg-secondary/20">
      <div className="mx-auto max-w-4xl px-5 py-24 sm:px-8 sm:py-32">
        <SectionLabel>Code of Conduct</SectionLabel>

        <div className="mt-6 border-b border-border/80 pb-10">
          <h1 className="font-display text-4xl font-medium leading-tight sm:text-6xl">
            A welcoming space
            <span className="italic text-marigold"> for every </span>
            student.
          </h1>
          <p className="mt-6 text-sm text-muted-foreground font-mono">
            Last Updated: July 16, 2026
          </p>
        </div>

        <div className="mt-12 space-y-2">
          <ConductSection icon={Heart} title="1. Our Pledge">
            <p>
              In the interest of fostering an open and welcoming academic environment, we as student
              organizers, faculty advisors, and contributors pledge to make participation in our
              community a harassment-free experience for everyone.
            </p>
            <p>
              We welcome participants regardless of age, body size, visible or invisible disability,
              ethnicity, sex characteristics, gender identity, level of experience, education,
              socio-economic status, nationality, or personal background.
            </p>
          </ConductSection>

          <ConductSection icon={Users} title="2. Expected Behavior">
            <p>To maintain a supportive learning environment, all participants are expected to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Demonstrate empathy and kindness toward other students and mentors.</li>
              <li>
                Provide respectful, constructive feedback on student code submissions and projects.
              </li>
              <li>
                Acknowledge and respect the time put in by student board members and faculty
                curation committees.
              </li>
              <li>
                Help beginners navigate tooling issues, compilers, and framework setups patiently.
              </li>
            </ul>
          </ConductSection>

          <ConductSection icon={MessageSquare} title="3. Unacceptable Behavior">
            <p>
              The following behaviors are strictly prohibited within the platform, our GitHub
              organization, and community forums:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The use of sexualized language or imagery, and unwelcome sexual attention or
                advances.
              </li>
              <li>
                Trolling, insulting or derogatory comments, and personal or political attacks.
              </li>
              <li>Public or private harassment of any kind.</li>
              <li>
                Publishing others' private information, such as a physical or electronic address,
                without explicit permission.
              </li>
              <li>
                Plagiarism of assignments or passing off existing peer repositories as original
                work.
              </li>
            </ul>
          </ConductSection>

          <ConductSection icon={ShieldAlert} title="4. Enforcement Responsibilities">
            <p>
              Student community leads are responsible for clarifying and enforcing our standards of
              acceptable behavior and will take appropriate, fair corrective action in response to
              any behavior they deem inappropriate, threatening, offensive, or harmful.
            </p>
            <p>
              Community leads have the right and responsibility to remove, edit, or reject comments,
              commits, issues, and profile access that are not aligned with this Code of Conduct.
            </p>
          </ConductSection>
        </div>

        <div className="mt-16 rounded-2xl border border-border bg-card p-8">
          <h3 className="font-display text-xl font-medium">Report an Incident</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            If you experience or witness behavior that violates our Code of Conduct, please contact
            the student board immediately. All reports will be reviewed confidentially.
          </p>
          <div className="mt-4">
            <a
              href="mailto:quickcatchh@gmail.com"
              className="inline-flex items-center text-sm font-semibold text-marigold hover:underline"
            >
              Report incident &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
