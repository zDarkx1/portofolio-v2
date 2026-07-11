import Link from "next/link";
import type { Article } from "@/lib/data";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group block border-b py-5 transition-colors last:border-b-0 hover:opacity-80"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-medium text-foreground group-hover:underline group-hover:underline-offset-4">
          {article.title}
        </h3>
        <time className="shrink-0 text-sm text-muted-foreground">
          {article.displayDate}
        </time>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">{article.excerpt}</p>
    </Link>
  );
}
