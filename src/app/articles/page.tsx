import { articles } from "@/lib/data";
import { ArticleCard } from "@/components/article-card";
import { Reveal } from "@/components/anim/reveal";

export default function ArticlesPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        Articles &amp; notes
      </h1>
      <p className="mt-3 max-w-lg text-muted-foreground">
        Thoughts on building software, from concept through launch.
      </p>

      <Reveal as="div" stagger className="mt-8 flex flex-col gap-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </Reveal>
    </div>
  );
}
