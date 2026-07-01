type ArticleCoverProps = {
  src: string;
  title: string;
};

export function ArticleCover({ src, title }: ArticleCoverProps) {
  if (!src) {
    return (
      <div className="mb-10 aspect-[16/9] w-full rounded-[2rem] bg-gradient-to-br from-navy via-royal to-soft-blue shadow-card" />
    );
  }

  return (
    <figure className="mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-card">
      <div className="flex aspect-[16/9] w-full items-center justify-center">
        <img
          src={src}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>
    </figure>
  );
}