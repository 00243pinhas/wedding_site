interface PageHeaderProps {
  eyebrow: string;
  title: string;
}

// Left-aligned header for fast utility pages (/details, /faq, /contact,
// /gallery) — one implementation so they read as one system of documents,
// not homepage moments.
export function PageHeader({ eyebrow, title }: PageHeaderProps) {
  return (
    <header>
      <p className="text-xs tracking-[0.3em] text-navy uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-display text-5xl text-navy sm:text-6xl">
        {title}
      </h1>
    </header>
  );
}
