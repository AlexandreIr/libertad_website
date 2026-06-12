import Link from "next/link";

type ShinyButtonProps = {
  href: string;
  children: React.ReactNode;
};

export function ShinyButton({ href, children }: ShinyButtonProps) {
  return (
    <Link
      href={href}
      className="
        relative isolate inline-flex h-12 items-center justify-center
        overflow-hidden rounded-md bg-neutral-950 px-7
        text-sm font-semibold uppercase tracking-wide text-white
        shadow-lg shadow-black/20 transition
        hover:scale-105 hover:bg-neutral-900
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
        active:scale-95
      "
    >
      <span className="relative z-10">{children}</span>

      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 z-0
          bg-gradient-to-r from-transparent via-white/10 to-transparent
        "
      />

      <span
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-y-0 -left-16 z-0
          w-12 bg-white/30 blur-[1px]
          animate-shine
        "
      />
    </Link>
  );
}