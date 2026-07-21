import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/site/SectionLabel";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty Advisors — QuickCatch" },
      {
        name: "description",
        content:
          "Meet the professors who curate, sequence, and review every QuickCatch curriculum.",
      },
      { property: "og:title", content: "Faculty Advisors — QuickCatch" },
      { property: "og:description", content: "Professors who actually review the work." },
    ],
  }),
  component: Faculty,
});

const FACULTY = [
  {
    name: "Faculty of Computer Science & Engineering",
    title: "Rajiv Gandhi Institute of Petroleum Technology (RGIPT)",
    field: "AI & Machine Learning",
    bio: "Faculty members at RGIPT specialize in core computer science, focusing heavily on spatio-temporal data mining, intelligent transportation systems, and crisis informatics.",
    tags: ["Spatio-Temporal AI", "Traffic Prediction", "Crisis Informatics", "Misinformation Detection"],
    initials: "RGIPT CSE"
  
  },
  {
    name: "Department of Information Technology",
    title: "ABV-IIITM Gwalior",
    field: "AI & Social Media Analytics",
    bio: "Faculty at ABV-IIITM Gwalior focus on social media analytics, rumor verification, explainable AI (XAI), and deep learning applications in multimodal data.",
    tags: ["Rumor Verification", "Explainable AI", "Social Media Analytics", "Deep Learning"],
    initials: "IIITM IT"
  },
  {
    name: "Department of Computer Science & Engineering",
    title: "Indian Institute of Technology Roorkee (IIT Roorkee)",
    field: "AI, Vision & Systems",
    bio: "Researchers and educators at IIT Roorkee lead projects across computer vision, deep learning theory, natural language processing, and high-performance computing.",
    tags: ["Computer Vision", "Deep Learning", "NLP", "High-Performance Computing"],
    initials: "IITR CSE"
  },
  {
    name: "School of Computing & Electrical Engineering",
    title: "Indian Institute of Technology Mandi (IIT Mandi)",
    field: "Applied AI & Cyber-Physical Systems",
    bio: "Faculty expertise at IIT Mandi spans signal processing, machine learning for healthcare, speech recognition, and cyber-physical systems.",
    tags: ["Signal Processing", "Healthcare AI", "Speech Recognition", "Cyber-Physical Systems"],
    initials: "IITM CSE"
  },
  {
    name: "Department of Earth Sciences (Geophysics Section)",
    title: "Indian Institute of Technology Roorkee (IIT Roorkee)",
    field: "Applied Geophysics & Earth Systems",
    bio: "Faculty members in Geophysics at IIT Roorkee focus on seismic processing for hydrocarbon exploration, earthquake hazard assessment, magnetotellurics, and AI applications in geophysical signal processing.",
    tags: ["Seismic Signal Processing", "Earthquake Hazards", "Geophysical Inversion", "Rock Physics"],
    initials: "IITR GEO"
  },
  {
    name: "Department of Petroleum Engineering & Geoengineering (Geophysics Section)",
    title: "Rajiv Gandhi Institute of Petroleum Technology (RGIPT)",
    field: "Petroleum Geophysics & Geoscience Engineering",
    bio: "Faculty in Geoengineering at RGIPT specialize in seismic methods, formation evaluation, reservoir characterization, petroleum geomechanics, and geophysical signal processing for energy exploration.",
    tags: ["Seismic Methods", "Petroleum Geophysics", "Reservoir Characterization", "Geophysical Signal Processing"],
    initials: "RGIPT PEG"
  }
  
];

function Faculty() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel>Faculty advisors</SectionLabel>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-medium leading-tight sm:text-5xl">
              The professors who actually
              <span className="italic text-marigold"> review the work.</span>
            </h1>
          </div>
          <p className="max-w-md text-muted-foreground">
            Each curriculum is shaped, sequenced, and signed off by a department advisor with a
            research and industry track record. No ghost names. No affiliate logos.
          </p>
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {FACULTY.map((f) => (
            <article
              key={f.name}
              className="group relative flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-0.5 hover:border-marigold/40 hover:shadow-[0_20px_50px_-30px_oklch(0.22_0.04_250)]"
            >
              <div className="flex items-start gap-5">
                <div className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-ink font-display text-xl font-semibold text-parchment ring-4 ring-marigold/20">
                  {f.initials}
                </div>
                <div className="min-w-0">
                  <h2 className="font-display text-2xl font-medium">{f.name}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">{f.title}</p>
                  <p className="mt-1 text-sm font-medium text-marigold">{f.field}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{f.bio}</p>
              <div className="flex flex-wrap gap-2">
                {f.tags.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="border-ink/15 bg-background font-normal text-foreground"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
