import { cn } from '@/lib/cn';
import { Icon, IconBadge } from '@/components/Icon';

export function VisualPanel({
  label = 'Operação LCS',
  variant = 'default',
  className,
}: {
  label?: string;
  variant?: 'default' | 'industry' | 'building' | 'cleaning';
  className?: string;
}) {
  return (
    <div className={cn('relative min-h-[320px] overflow-hidden rounded-[2rem] bg-navy shadow-2xl md:block hidden', className)}>
      <div className={cn('absolute inset-0 opacity-90', {
        'bg-[radial-gradient(circle_at_30%_25%,#6FABE4,transparent_35%),linear-gradient(135deg,#002E84,#10171F)]': variant === 'default',
        'bg-[radial-gradient(circle_at_70%_20%,#F5B33B,transparent_18%),linear-gradient(135deg,#002E84,#10171F)]': variant === 'industry',
        'bg-[radial-gradient(circle_at_70%_20%,#AEC9E7,transparent_22%),linear-gradient(135deg,#10171F,#002E84)]': variant === 'building',
        'bg-[radial-gradient(circle_at_30%_20%,#6FABE4,transparent_28%),linear-gradient(135deg,#2767C1,#002E84)]': variant === 'cleaning',
      })} />
      <div className="absolute -left-20 top-16 h-72 w-72 rotate-45 bg-white/15" />
      <div className="absolute -right-20 bottom-8 h-80 w-80 rotate-45 bg-soft-blue/20" />
      <div className="absolute right-7 top-7 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-bold text-white backdrop-blur">
        {label}
      </div>
      <div className="absolute bottom-8 left-8 right-8 grid gap-4 sm:grid-cols-3 pb-4">
        <div className="rounded-2xl border border-white/20 bg-white/90 p-4 text-navy shadow-lg">
          <IconBadge name="people" className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-soft-blue/30 text-royal" />
          <p className="text-sm font-black">Equipe treinada</p>
          <p className="mt-1 text-xs text-slate-600">Uniforme, processo e supervisão.</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/90 p-4 text-navy shadow-lg sm:translate-y-8">
          <IconBadge name="document" className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-soft-blue/30 text-royal" />
          <p className="text-sm font-black">Rotinas claras</p>
          <p className="mt-1 text-xs text-slate-600">Checklists e indicadores.</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/90 p-4 text-navy shadow-lg">
          <IconBadge name="shield" className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-soft-blue/30 text-royal" />
          <p className="text-sm font-black">Controle e segurança</p>
          <p className="mt-1 text-xs text-slate-600">Operação previsível.</p>
        </div>
      </div>
      <div className="absolute left-8 top-8 flex items-center gap-3 text-white/90">
        <Icon name={variant === 'industry' ? 'factory' : 'building'} className="h-8 w-8" />
        <span className="font-heading text-2xl font-black">LCS</span>
      </div>
    </div>
  );
}
