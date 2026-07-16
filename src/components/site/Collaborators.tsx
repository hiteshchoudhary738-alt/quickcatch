import { SectionLabel } from "./SectionLabel";

const COLLABORATORS = [
  { name: "IIITM Gwalior", kind: "University" },
  { name: "RGIPT Jais", kind: "University" },
  { name: "HGS Industries", kind: "Industry" },
  { name: "", kind: "Industry" },
];

function LogoChip({ name, kind }: { name: string; kind: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div className="mx-4 flex shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-5 py-3 shadow-sm">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-ink font-display text-sm font-semibold text-parchment">
        {initials}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-medium text-foreground">{name}</span>
        <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {kind}
        </span>
      </span>
    </div>
  );
}

export function Collaborators() {
  const row = [...COLLABORATORS, ...COLLABORATORS];
  return (
    <section className="border-t border-border bg-secondary/30">
      <div className="mx-auto max-w-7xl px-5 pt-20 sm:px-8 sm:pt-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Collaborations</SectionLabel>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-medium leading-tight sm:text-4xl">
              In good company with
              <span className="italic text-marigold"> universities, labs, and industry</span>.
            </h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            QuickCatch partners with academic departments, research labs, and engineering teams who
            help shape and validate every curriculum we ship.
          </p>
        </div>
      </div>
      <div
        className="group relative mt-12 overflow-hidden py-8"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <LogoChip key={`${c.name}-${i}`} name={c.name} kind={c.kind} />
          ))}
        </div>
      </div>
    </section>
  );
}
