type PageIntroProps = {
  id: string;
  title: string;
  description: string;
};

export function PageIntro({ id, title, description }: PageIntroProps) {
  return (
    <div className="max-w-2xl">
      <p className="mb-3 font-mono text-xs tracking-[0.2em] text-accent uppercase">
        Coming soon
      </p>
      <h1
        id={id}
        className="font-display text-4xl tracking-tight text-text sm:text-5xl"
      >
        {title}
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-text-muted">
        {description}
      </p>
    </div>
  );
}
