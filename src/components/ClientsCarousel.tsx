import Image from 'next/image';
import type { CSSProperties } from 'react';
import { cn } from '@/lib/cn';

interface Client {
  id: string;
  name: string;
  image: string;
}

const clients: Client[] = [
  { id: '1', name: 'Prefeitura de Barueri', image: '/clientes/barueri.png' },
  { id: '2', name: 'Consórcio ABC', image: '/clientes/consorcio-abc.png' },
  { id: '3', name: 'Prefeitura de Itaquaquecetuba', image: '/clientes/itaqua.png' },
  { id: '4', name: 'Prefeitura de Ribeirão Pires', image: '/clientes/ribeirao.png' },
  { id: '5', name: 'Prefeitura de Rio Grande da Serra', image: '/clientes/rio-grande-da-serra.png' },
  { id: '6', name: 'Prefeitura de Santa Gertrudes', image: '/clientes/santa-gertrudes.png' },
  { id: '7', name: 'Prefeitura de Santana do Parnaíba', image: '/clientes/santana.png' },
  { id: '8', name: 'Ribeiro Carram', image: '/clientes/ribeiro-carram.png' },
  { id: '9', name: 'Hitachi Energy', image: '/clientes/hitachi.svg' },
  { id: '10', name: 'Prefeitura de Mauá', image: '/clientes/maua.png' },
  { id: '11', name: 'Corinthians', image: '/clientes/corinthians.png' },
];

interface ClientsCarouselProps {
  className?: string;
  items?: Client[];
  minItems?: number;
  durationSeconds?: number;
  pauseOnHover?: boolean;
}

function createLoopItems(items: Client[], minItems: number) {
  if (items.length === 0) return [];

  const repeatCount = Math.max(1, Math.ceil(minItems / items.length));

  return Array.from({ length: repeatCount }, () => items).flat();
}

export function ClientsCarousel({
  className = '',
  items = clients,
  minItems = 14,
  durationSeconds,
  pauseOnHover = true,
}: ClientsCarouselProps) {
  const loopItems = createLoopItems(items, minItems);

  if (loopItems.length === 0) {
    return null;
  }

  const animationDuration = durationSeconds ?? Math.max(24, loopItems.length * .8);

  const cssVariables = {
    '--carousel-duration': `${animationDuration}s`,
  } as CSSProperties;

  return (
    <section className={cn('w-full', className)}>
      <style>
        {`
          @keyframes clients-carousel-scroll {
            from {
              transform: translate3d(0, 0, 0);
            }

            to {
              transform: translate3d(-50%, 0, 0);
            }
          }

          .clients-carousel-track {
            animation: clients-carousel-scroll var(--carousel-duration) linear infinite;
            will-change: transform;
          }

          // .clients-carousel[data-pause-on-hover="true"]:hover .clients-carousel-track {
          //   animation-play-state: paused;
          // }

          @media (prefers-reduced-motion: reduce) {
            .clients-carousel-track {
              animation: none;
              transform: none;
            }
          }
        `}
      </style>

      <div
        className="clients-carousel relative overflow-hidden rounded-lg bg-white py-8 sm:py-12"
        style={cssVariables}
        data-pause-on-hover={pauseOnHover}
      >
        <div className="clients-carousel-track flex w-max">
          <ClientsGroup items={loopItems} />
          <ClientsGroup items={loopItems} ariaHidden />
        </div>

        <div className="pointer-events-none absolute bottom-0 left-0 top-0 w-12 bg-gradient-to-r from-white to-transparent sm:w-16 md:w-24" />
        <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-12 bg-gradient-to-l from-white to-transparent sm:w-16 md:w-24" />
      </div>
    </section>
  );
}

interface ClientsGroupProps {
  items: Client[];
  ariaHidden?: boolean;
}

function ClientsGroup({ items, ariaHidden = false }: ClientsGroupProps) {
  return (
    <div
      className="flex shrink-0 items-center gap-8 px-4 sm:gap-12 md:gap-16"
      aria-hidden={ariaHidden}
    >
      {items.map((client, index) => (
        <div
          key={`${ariaHidden ? 'clone' : 'original'}-${client.id}-${index}`}
          className="group flex w-32 shrink-0 items-center justify-center sm:w-40 md:w-48 lg:w-52"
        >
          <div className="relative h-20 w-full sm:h-24">
            <Image
              src={client.image}
              alt={ariaHidden ? '' : client.name}
              fill
              className="object-contain opacity-80 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
              sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 208px"
            />

            {!ariaHidden && (
              <p className="pointer-events-none absolute -bottom-6 left-0 right-0 text-center text-xs font-semibold text-slate-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-sm">
                {client.name}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}