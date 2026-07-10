import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
  alt?: boolean
}

export function Section({ id, eyebrow, title, description, children, className, alt }: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 px-5 py-20 md:py-28",
        alt && "bg-secondary/40",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && (
            <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </span>
          )}
          <h2 className="text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              {description}
            </p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}
