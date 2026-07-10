import { Section } from "@/components/section"
import { Icon } from "@/components/icon"
import { traditionalCards } from "@/lib/content"

export function TraditionalFamily() {
  return (
    <Section
      id="truyen-thong"
      eyebrow="Cội nguồn"
      title="Gia đình Việt Nam truyền thống"
      description="Nền tảng văn hóa được hun đúc qua nhiều thế hệ."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {traditionalCards.map((card) => (
          <article
            key={card.title}
            className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
          >
            <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
              <Icon name={card.icon} className="size-6" />
            </span>
            <h3 className="mb-2 font-serif text-lg font-bold text-foreground">{card.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{card.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
