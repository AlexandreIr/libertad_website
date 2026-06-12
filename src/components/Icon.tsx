import type { IconName } from '@/data/site';

const paths: Record<IconName, React.ReactNode> = {
  building: <><path d="M4 20h16"/><path d="M6 20V7l7-3v16"/><path d="M13 8h5v12"/><path d="M8 10h2M8 14h2M15 11h1M15 15h1"/></>,
  spray: <><path d="M9 4h6v4H9z"/><path d="M10 8v2a4 4 0 0 0-4 4v6h12v-4a6 6 0 0 0-6-6h-2"/><path d="M17 5h3M18 9l2 1M18 2l2-1"/></>,
  shield: <><path d="M12 3 5 6v6c0 4.4 2.7 7.7 7 9 4.3-1.3 7-4.6 7-9V6z"/><path d="m9 12 2 2 4-5"/></>,
  wrench: <><path d="M15 6a4 4 0 0 0 5 5L11 20l-4-4 9-9Z"/><path d="M7 16l-3 3"/></>,
  people: <><path d="M16 19v-1a4 4 0 0 0-8 0v1"/><circle cx="12" cy="8" r="3"/><path d="M5 19v-1a3 3 0 0 1 3-3"/><path d="M19 19v-1a3 3 0 0 0-3-3"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/></>,
  factory: <><path d="M3 21V9l6 4V9l6 4V7h6v14z"/><path d="M7 17h2M12 17h2M17 17h2"/></>,
  heart: <><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z"/></>,
  cap: <><path d="m3 8 9-4 9 4-9 4z"/><path d="M7 10v5c3 2 7 2 10 0v-5"/><path d="M21 8v6"/></>,
  shop: <><path d="M4 10h16l-1-6H5z"/><path d="M6 10v10h12V10"/><path d="M9 20v-6h6v6"/></>,
  chart: <><path d="M4 19V5"/><path d="M4 19h16"/><path d="M8 16v-5M12 16V8M16 16v-9"/></>,
  document: <><path d="M7 3h7l4 4v14H7z"/><path d="M14 3v5h5"/><path d="M9 13h6M9 17h6"/></>,
  pin: <><path d="M12 21s7-4.4 7-11a7 7 0 1 0-14 0c0 6.6 7 11 7 11Z"/><circle cx="12" cy="10" r="2"/></>,
  headset: <><path d="M4 13a8 8 0 1 1 16 0"/><path d="M4 13v4a2 2 0 0 0 2 2h2v-8H6a2 2 0 0 0-2 2Z"/><path d="M20 13v4a2 2 0 0 1-2 2h-2v-8h2a2 2 0 0 1 2 2Z"/></>,
  check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
  phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6.4 6.4l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2Z"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></>,
  diamond: <><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M2 9h20M12 21 8 9M12 21l4-12"/></>,
  rocket: <><path d="M12 15 9 12c1-4 4-7 9-8-1 5-4 8-8 9Z"/><path d="M9 12H5l-2 4 4-2"/><path d="M12 15v4l4-2-4-2Z"/><circle cx="15" cy="8" r="1"/></>,
};

export function Icon({ name, className = 'h-6 w-6' }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export function IconBadge({ name, className }: { name: IconName; className?: string }) {
  return (
    <span className={className ?? 'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-blue/30 text-royal'}>
      <Icon name={name} className="h-6 w-6" />
    </span>
  );
}
