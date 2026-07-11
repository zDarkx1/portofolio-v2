import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/lib/data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <article>
      <Link
        href="/articles"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to articles
      </Link>

      <header className="mt-6">
        <time className="text-sm text-muted-foreground">
          {article.displayDate}
        </time>
        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          {article.title}
        </h1>
      </header>

      <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
        <p className="text-lg text-foreground">{article.excerpt}</p>
        <p>
          This is a placeholder article body. Replace it with your real writing —
          Markdown or MDX both work well with this setup.
        </p>
        <p>
          Add code blocks, images, and headings to build out the full post.
        </p>
      </div>
    </article>
  );
}
