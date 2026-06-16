export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
      <span className="h-px w-8 bg-foreground/40" />
      <span>{children}</span>
    </div>
  );
}
