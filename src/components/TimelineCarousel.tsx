'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentProps,
  type FocusEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { IconBadge } from '@/components/Icon';

type IconName = ComponentProps<typeof IconBadge>['name'];
type AutoDirection = 'prev' | 'next' | null;

interface TimelineItem {
  year: string;
  title: string;
  text: string;
  icon: IconName;
}

interface LineMetrics {
  left: number;
  width: number;
}

interface ActiveTooltip {
  year: string;
  title: string;
  text: string;
  left: number;
  top: number;
  placement: 'top' | 'bottom';
}

const TOOLTIP_WIDTH = 340;
const SCREEN_PADDING = 16;

const timelineItems: TimelineItem[] = [
  {
    year: '1989',
    title: 'Fundação',
    text: 'Fundação da LCS com atuação no comércio varejista e atacadista.',
    icon: 'building',
  },
  {
    year: '2017',
    title: 'Empresa passada de pai para filho',
    text: 'Ingresso no mercado público com fornecimento de insumos de limpeza, higiene, descartáveis, kits escolares, kits de higiene e cestas básicas.',
    icon: 'heart',
  },
  {
    year: '2018',
    title: 'Expansão no ramo de atividade',
    text: 'Fornecimento de prestação de serviços terceirizados em limpeza, com escritório localizado em São Caetano do Sul.',
    icon: 'people',
  },
  {
    year: '2019',
    title: 'Abertura da sede em Itaquaquecetuba',
    text: 'Abertura da sede para nos mantermos mais próximos aos nossos clientes.',
    icon: 'building',
  },
  {
    year: '2020',
    title: 'Abertura da sede em Pindamonhangaba',
    text: 'Abertura de nova sede no interior para nos mantermos mais próximos aos nossos clientes.',
    icon: 'briefcase',
  },
  {
    year: '2021',
    title: 'Ampliação dos serviços',
    text: 'Expansão para serviços terceirizados de portaria, cooperagem, manutenção predial e jardinagem.',
    icon: 'people',
  },
  {
    year: '2022',
    title: 'Abertura da sede em Santana de Parnaíba',
    text: 'Abertura de nova sede para ampliar a presença regional e manter maior proximidade com os clientes.',
    icon: 'briefcase',
  },
  {
    year: '2023',
    title: 'Crescimento em atendimentos',
    text: 'Ultrapassamos a marca de 1000 colaboradores.',
    icon: 'heart',
  },
  {
    year: '2024',
    title: 'Alteração de endereço da matriz',
    text: 'Mudança da matriz para um ponto mais bem localizado e amplo, oferecendo melhor estrutura para atender os clientes.',
    icon: 'building',
  },
  {
    year: '2026',
    title: 'Continuação da jornada',
    text: 'Continuação da jornada com foco em inovação e excelência, trazendo novas soluções tecnológicas para os serviços terceirizados.',
    icon: 'rocket',
  },
];

function getUniquePositions(positions: number[]) {
  return positions
    .map((position) => Math.round(position))
    .sort((a, b) => a - b)
    .filter((position, index, array) => {
      if (index === 0) return true;

      return Math.abs(position - array[index - 1]) > 4;
    });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function TimelineCarousel() {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<ActiveTooltip | null>(null);

  const [autoDirection, setAutoDirection] = useState<AutoDirection>(null);
  const [currentPositionIndex, setCurrentPositionIndex] = useState(0);
  const [positions, setPositions] = useState<number[]>([0]);

  const [lineMetrics, setLineMetrics] = useState<LineMetrics>({
    left: 0,
    width: 0,
  });

  const updateTimelineLayout = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) return;

    const items = Array.from(
      track.querySelectorAll<HTMLElement>('[data-timeline-item="true"]')
    );

    if (items.length === 0) return;

    const trackStyles = window.getComputedStyle(track);
    const paddingLeft = Number.parseFloat(trackStyles.paddingLeft) || 0;

    const maxTranslate = Math.max(track.scrollWidth - viewport.clientWidth, 0);

    const itemPositions = items.map((item) => {
      const position = item.offsetLeft - paddingLeft;

      return Math.min(Math.max(position, 0), maxTranslate);
    });

    const calculatedPositions =
      maxTranslate <= 1
        ? [0]
        : getUniquePositions([0, ...itemPositions, maxTranslate]);

    setPositions(calculatedPositions);

    setCurrentPositionIndex((index) =>
      Math.min(index, calculatedPositions.length - 1)
    );

    const firstItem = items[0];
    const lastItem = items[items.length - 1];

    const firstPointCenter = firstItem.offsetLeft + firstItem.offsetWidth / 2;
    const lastPointCenter = lastItem.offsetLeft + lastItem.offsetWidth / 2;

    setLineMetrics({
      left: firstPointCenter,
      width: Math.max(lastPointCenter - firstPointCenter, 0),
    });
  }, []);

  useEffect(() => {
    setMounted(true);
    updateTimelineLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateTimelineLayout();
      setActiveTooltip(null);
    });

    if (viewportRef.current) {
      resizeObserver.observe(viewportRef.current);
    }

    if (trackRef.current) {
      resizeObserver.observe(trackRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [updateTimelineLayout]);

  const currentTranslate = useMemo(() => {
    return positions[currentPositionIndex] ?? 0;
  }, [positions, currentPositionIndex]);

  const canGoBack = currentPositionIndex > 0;
  const canGoForward = currentPositionIndex < positions.length - 1;

  useEffect(() => {
    if (autoDirection === 'prev' && !canGoBack) {
      setAutoDirection(null);
    }

    if (autoDirection === 'next' && !canGoForward) {
      setAutoDirection(null);
    }
  }, [autoDirection, canGoBack, canGoForward]);

  useEffect(() => {
    if (!autoDirection) return;

    const moveTimeline = () => {
      setActiveTooltip(null);

      setCurrentPositionIndex((index) => {
        if (autoDirection === 'prev') {
          return Math.max(index - 1, 0);
        }

        return Math.min(index + 1, positions.length - 1);
      });
    };

    const firstMoveTimeout = window.setTimeout(moveTimeline, 350);
    const interval = window.setInterval(moveTimeline, 1150);

    return () => {
      window.clearTimeout(firstMoveTimeout);
      window.clearInterval(interval);
    };
  }, [autoDirection, positions.length]);

  const moveBack = useCallback(() => {
    setActiveTooltip(null);
    setCurrentPositionIndex((index) => Math.max(index - 1, 0));
  }, []);

  const moveForward = useCallback(() => {
    setActiveTooltip(null);
    setCurrentPositionIndex((index) =>
      Math.min(index + 1, positions.length - 1)
    );
  }, [positions.length]);

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const wrapper = wrapperRef.current;

    if (!wrapper) return;

    const target = event.target as HTMLElement;

    if (target.closest('[data-timeline-icon="true"]')) {
      setAutoDirection(null);
      return;
    }

    const rect = wrapper.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;

    const leftLimit = rect.width * 0.18;
    const rightLimit = rect.width * 0.82;

    if (mouseX <= leftLimit && canGoBack) {
      setAutoDirection('prev');
      return;
    }

    if (mouseX >= rightLimit && canGoForward) {
      setAutoDirection('next');
      return;
    }

    setAutoDirection(null);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      moveBack();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      moveForward();
    }
  };

  const showTooltip = (
    item: TimelineItem,
    isTop: boolean,
    element: HTMLElement
  ) => {
    const rect = element.getBoundingClientRect();

    const desiredLeft = rect.left + rect.width / 2;

    const maxLeft = window.innerWidth - SCREEN_PADDING - TOOLTIP_WIDTH / 2;
    const minLeft = SCREEN_PADDING + TOOLTIP_WIDTH / 2;

    const left = clamp(desiredLeft, minLeft, maxLeft);

    const spaceAbove = rect.top;
    const spaceBelow = window.innerHeight - rect.bottom;

    const placement: 'top' | 'bottom' =
      isTop && spaceAbove > 190
        ? 'top'
        : spaceBelow > 190
          ? 'bottom'
          : 'top';

    const top = placement === 'top' ? rect.top - 18 : rect.bottom + 18;

    setActiveTooltip({
      year: item.year,
      title: item.title,
      text: item.text,
      left,
      top,
      placement,
    });
  };

  const handleIconMouseEnter = (
    item: TimelineItem,
    isTop: boolean,
    event: MouseEvent<HTMLDivElement>
  ) => {
    setAutoDirection(null);
    showTooltip(item, isTop, event.currentTarget);
  };

  const handleIconFocus = (
    item: TimelineItem,
    isTop: boolean,
    event: FocusEvent<HTMLDivElement>
  ) => {
    setAutoDirection(null);
    showTooltip(item, isTop, event.currentTarget);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        role="region"
        tabIndex={0}
        aria-label="Linha do tempo interativa"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          setAutoDirection(null);
          setActiveTooltip(null);
        }}
        onKeyDown={handleKeyDown}
        className={[
          'relative mt-12 select-none outline-none',
          autoDirection === 'prev'
            ? 'cursor-w-resize'
            : autoDirection === 'next'
              ? 'cursor-e-resize'
              : '',
        ].join(' ')}
      >
        <div ref={viewportRef} className="overflow-hidden py-10">
          <div
            ref={trackRef}
            className="relative flex h-110 w-max gap-10 px-16 transform-gpu will-change-transform"
            style={{
              transform: `translate3d(-${currentTranslate}px, 0, 0)`,
              transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div
              aria-hidden="true"
              className="absolute top-1/2 h-0.5 -translate-y-1/2 rounded-full bg-slate-200"
              style={{
                left: `${lineMetrics.left}px`,
                width: `${lineMetrics.width}px`,
              }}
            />

            {timelineItems.map((item, index) => {
              const isTop = index % 2 === 0;

              return (
                <article
                  key={`${item.year}-${item.title}`}
                  data-timeline-item="true"
                  className="relative z-10 h-full flex-[0_0_260px] outline-none sm:flex-[0_0_300px] lg:flex-[0_0_320px]"
                >
                  <div
                    data-timeline-icon="true"
                    tabIndex={0}
                    onMouseEnter={(event) =>
                      handleIconMouseEnter(item, isTop, event)
                    }
                    onMouseLeave={() => setActiveTooltip(null)}
                    onFocus={(event) => handleIconFocus(item, isTop, event)}
                    onBlur={() => setActiveTooltip(null)}
                    className={[
                      'absolute left-1/2 z-30 flex h-16 w-16 -translate-x-1/2 items-center justify-center rounded-full  bg-navy shadow-card outline-none transition-all duration-800',
                      'top-1/2 -translate-y-1/2',
                      'hover:scale-110 focus-visible:scale-110 focus-visible:border-royal/40 focus-visible:bg-royal/15',
                    ].join(' ')}
                  >
                    <IconBadge
                      name={item.icon}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-transparent text-white"
                    />
                  </div>

                  <div
                    className={[
                      'absolute left-0 right-0 text-center',
                      isTop
                        ? 'bottom-[calc(50%+54px)]'
                        : 'top-[calc(50%+54px)]',
                    ].join(' ')}
                  >
                    <p className="font-heading text-2xl font-black leading-none text-royal">
                      {item.year}
                    </p>

                    <h3 className="mx-auto mt-3 max-w-62.5 font-heading text-base font-black leading-6 text-ink">
                      {item.title}
                    </h3>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      {mounted &&
        activeTooltip &&
        createPortal(
          <div
            role="tooltip"
            className="pointer-events-none fixed z-9999 max-h-[min(70vh,420px)] overflow-y-auto rounded-2xl border border-slate-200 bg-white/95 p-5 text-center shadow-card backdrop-blur-md"
            style={{
              left: `${activeTooltip.left}px`,
              top: `${activeTooltip.top}px`,
              width: `${TOOLTIP_WIDTH}px`,
              transform:
                activeTooltip.placement === 'top'
                  ? 'translate(-50%, -100%)'
                  : 'translate(-50%, 0)',
            }}
          >
            <p className="font-heading text-lg font-black text-royal">
              {activeTooltip.year}
            </p>

            <h4 className="mt-1 font-heading text-sm font-black leading-5 text-ink">
              {activeTooltip.title}
            </h4>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              {activeTooltip.text}
            </p>
          </div>,
          document.body
        )}
    </>
  );
}