import Link from 'next/link';
import { cn } from '@/lib/cn';

type Variant = 'primary' | 'secondary' | 'red' | 'ghost' | 'dark';

const variants: Record<Variant, string> = {
  primary:
    'bg-royal text-white shadow-button hover:bg-navy focus-visible:outline-royal',
  secondary:
    'border border-royal/35 bg-white text-navy hover:bg-soft-blue/20 focus-visible:outline-royal',
  red: 'bg-red text-white shadow-button hover:bg-wine focus-visible:outline-red',
  ghost:
    'bg-white/10 text-white ring-1 ring-white/30 hover:bg-white/20 focus-visible:outline-white',
  dark: 'bg-navy text-white hover:bg-ink focus-visible:outline-navy',
};

export function Button({
  children,
  href,
  variant = 'primary',
  className,
  type = 'button',
}: {
  children: React.ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
    variants[variant],
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <span aria-hidden>→</span>
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
      <span aria-hidden>→</span>
    </button>
  );
}
