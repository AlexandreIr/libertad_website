import Image from 'next/image';
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

// Duplicar infinitamente para loop perfeito sem reset perceptível
const infiniteClients = Array.from({ length: 3 }, () => clients).flat();

interface ClientsCarouselProps {
  className?: string;
}

export function ClientsCarousel({ className = '' }: ClientsCarouselProps) {
  const animationStyles = `
    @keyframes infinite-scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(calc(-7 * 100% / 5));
      }
    }
    
    .carousel-scroll {
      animation: infinite-scroll 10s linear infinite;
      will-change: transform;
    }
  `;

  return (
    <div className={cn('w-full', className)}>
      <style>{animationStyles}</style>

      <div className="relative overflow-hidden rounded-lg bg-white py-8 sm:py-12">
        <div className="carousel-scroll flex gap-8 sm:gap-12 md:gap-16 px-4">
          {infiniteClients.map((client, index) => (
            <div
              key={`${index}`}
              className="flex-shrink-0 flex items-center justify-center"
              style={{ width: 'calc(20% - 2.5rem)' }}
            >
              <div className="w-full h-20 sm:h-24 relative group">
                <Image
                  src={client.image}
                  alt={client.name}
                  fill
                  className="object-contain opacity-80 grayscale group-hover:grayscale-0 transition-all duration-300"
                  sizes="(max-width: 640px) 80px, (max-width: 1024px) 96px, 120px"
                />
                <p className="absolute -bottom-6 left-0 right-0 text-center text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {client.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
