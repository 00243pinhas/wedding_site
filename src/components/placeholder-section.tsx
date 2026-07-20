interface PlaceholderSectionProps {
  title: string;
  note: string;
}

// Shared shell for routes that don't have real copy yet.
export function PlaceholderSection({ title, note }: PlaceholderSectionProps) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl">{title}</h1>
      <p className="mt-4 text-ink/70">{note}</p>
    </div>
  );
}
