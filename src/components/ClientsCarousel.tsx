'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
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
];

interface ClientsCarouselProps {
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
}

export function ClientsCarousel({
  autoPlayInterval = 4500,
  showDots = false,
  showArrows = false,
  className = '',
}: ClientsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % clients.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlay, autoPlayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + clients.length) % clients.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % clients.length);
    setIsAutoPlay(false);
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  return (
    <div className={cn('w-full', className)}>
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white shadow-lg">
        <div className="relative h-40 sm:h-48 md:h-56 w-full">
          {clients.map((client, index) => (
            <div
              key={client.id}
              className={cn(
                'absolute inset-0 transition-all duration-1200 ease-out',
                index === currentIndex
                  ? 'opacity-100 scale-100'
                  : 'opacity-0 scale-98'
              )}
            >
              <div className="flex h-full w-full items-center justify-center p-4 sm:p-6 md:p-8">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={300}
                  height={120}
                  className="h-auto w-auto max-h-32 object-contain"
                  priority={index === currentIndex}
                />
              </div>
            </div>
          ))}

          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-50" />

          {showArrows && (
            <button
              onClick={goToPrevious}
              aria-label="Voltar para o cliente anterior"
              className={cn(
                'absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-slate-300',
                'bg-white/80 p-2 text-navy transition hover:bg-white hover:text-red hover:scale-110',
                'backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2'
              )}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {showArrows && (
            <button
              onClick={goToNext}
              aria-label="Avançar para o próximo cliente"
              className={cn(
                'absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full border border-slate-300',
                'bg-white/80 p-2 text-navy transition hover:bg-white hover:text-red hover:scale-110',
                'backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-navy focus:ring-offset-2'
              )}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {showDots && (
          <div className="flex items-center justify-center gap-2 bg-gradient-to-t from-slate-100 to-transparent px-4 py-4">
            {clients.map((client, index) => (
              <button
                key={client.id}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para o cliente ${client.name}`}
                aria-current={index === currentIndex ? 'page' : undefined}
                className={cn(
                  'transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2',
                  index === currentIndex
                    ? 'h-3 w-8 bg-navy focus:ring-navy'
                    : 'h-2 w-2 bg-slate-300 hover:bg-slate-400 focus:ring-slate-400'
                )}
              />
            ))}
          </div>
        )}
      <div className="mt-4 mb-4 text-center">
        <h3 className="text-2xl font-bold text-slate-600">
          {clients[currentIndex].name}
        </h3>
      </div>
      </div>
    </div>
  );
}
