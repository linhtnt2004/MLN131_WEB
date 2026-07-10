import { BookMarked } from "lucide-react"
import { Section } from "@/components/section"
import { references, site } from "@/lib/content"

export function References() {
  return (
    <>
      <Section id="tham-khao" eyebrow="Nguồn" title="Tài liệu tham khảo">
        <ol className="mx-auto max-w-3xl space-y-3">
          {references.map((ref, i) => (
            <li
              key={i}
              className="flex gap-4 rounded-xl border border-border bg-card p-4 text-sm leading-relaxed text-muted-foreground"
            >
              <BookMarked className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
              <span>{ref}</span>
            </li>
          ))}
        </ol>
      </Section>

      <footer className="border-t border-border bg-primary px-5 py-10 text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 text-center">
          <p className="font-serif text-lg font-bold">{site.title}</p>
          <p className="text-sm text-primary-foreground/70">{site.subtitle}</p>
          <p className="mt-2 text-xs text-primary-foreground/60">
            Dự án học phần Triết học Mác – Lênin · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </>
  )
}
