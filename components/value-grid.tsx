import { Section } from "@/components/section"
import { Icon } from "@/components/icon"

interface Value {
  icon: string
  title: string
  text: string
}

interface ValueGridProps {
  id: string
  eyebrow: string
  title: string
  description?: string
  values: Value[]
  variant?: "preserve" | "adopt"
  alt?: boolean
}

export function ValueGrid({ id, eyebrow, title, description, values, variant = "preserve", alt }: ValueGridProps) {
  const isAdopt = variant === "adopt"
  return (
    <Section id={id} alt={alt} eyebrow={eyebrow} title={title} description={description}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {values.map((value) => (
          <article
            key={value.title}
            className={`group relative overflow-hidden rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
              isAdopt ? "border-accent/30 bg-card" : "border-border bg-card"
            }`}
          >
            <span
              className={`mb-4 flex size-12 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 ${
                isAdopt ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
              }`}
            >
              <Icon name={value.icon} className="size-6" />
            </span>
            <h3 className="mb-1.5 font-serif text-lg font-bold text-foreground">{value.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{value.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
