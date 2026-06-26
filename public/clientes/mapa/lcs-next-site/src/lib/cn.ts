type ClassValue = string | false | null | undefined | Record<string, boolean | null | undefined>;

export function cn(...classes: ClassValue[]) {
  return classes
    .flatMap((item) => {
      if (!item) return [];
      if (typeof item === 'string') return [item];

      return Object.entries(item)
        .filter(([, enabled]) => Boolean(enabled))
        .map(([className]) => className);
    })
    .join(' ');
}
