export function EmptyState({
  title = "Nothing here yet",
  description = "Content coming soon.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-dashed border-border px-6 py-20 text-center">
      <p className="font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
