import { Link } from "@tanstack/react-router";

interface FooterItem {
  label: string;
  to?: string;
  href?: string;
}

function FooterCol({ title, items }: { title: string; items: FooterItem[] }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.18em] text-parchment/50 font-medium">
        {title}
      </div>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item.label}>
            {item.to ? (
              <Link
                to={item.to}
                className="text-parchment/80 hover:text-parchment transition-colors"
              >
                {item.label}
              </Link>
            ) : item.href ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-parchment/80 hover:text-parchment transition-colors"
              >
                {item.label}
              </a>
            ) : (
              <a href="#" className="text-parchment/80 hover:text-parchment transition-colors">
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  const platformItems: FooterItem[] = [
    { label: "Courses", to: "/courses" },
    { label: "Faculty", to: "/faculty" },
    { label: "Cohorts", to: "/courses" },
    { label: "Open syllabus", to: "/courses" },
  ];

  const communityItems: FooterItem[] = [
    { label: "Student board", to: "/contact" },
    { label: "Mentorship", to: "/contact" },
    { label: "Alumni", to: "/contact" },
    { label: "Discord", to: "/contact" },
  ];

  const legalItems: FooterItem[] = [
    { label: "Privacy", to: "/privacy" },
    { label: "Terms", to: "/terms" },
    { label: "Code of conduct", to: "/code-of-conduct" },
  ];

  return (
    <footer className="border-t border-border bg-ink text-parchment">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-10">
          <div className="max-w-sm">
            <span className="font-display text-2xl font-semibold tracking-tight">
              Quick<span className="text-marigold">Catch</span>
            </span>
            <p className="mt-3 text-sm text-parchment/60">
              A student-run academic portal. Faculty-curated. Free, forever.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <FooterCol title="Platform" items={platformItems} />
            <FooterCol title="Community" items={communityItems} />
            <FooterCol title="Legal" items={legalItems} />
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-parchment/15 pt-6 text-xs text-parchment/50 sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} QuickCatch Collective. Built by students.</span>
          <div className="flex items-center gap-4">
            <Link to="/contact" className="hover:text-parchment">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
