import { Wrench, Target, ShieldCheck, Check } from "lucide-react"
import { Section } from "@/components/section"
import { aiUsage } from "@/lib/content"

const blocks = [
  { icon: Wrench, title: "Công cụ sử dụng", items: aiUsage.tools },
  { icon: Target, title: "Mục đích", items: aiUsage.purpose },
  { icon: ShieldCheck, title: "Kiểm chứng học thuật", items: aiUsage.verification },
]

export function AiUsage() {
  return (
    <Section
      id="ai"
      alt
      eyebrow="Minh bạch"
      title="Sử dụng AI trong dự án"
      description="Nhóm công khai cách AI được dùng và cam kết học thuật."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {blocks.map((block) => (
          <article key={block.title} className="rounded-2xl border border-border bg-card p-6">
            <span className="mb-4 flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
              <block.icon className="size-5" aria-hidden="true" />
            </span>
            <h3 className="mb-3 font-serif text-lg font-bold text-foreground">{block.title}</h3>
            <ul className="space-y-2.5">
              {block.items.map((item) => (
                <li key={item} className="flex gap-2.5 text-sm leading-relaxed text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <p className="mx-auto mt-8 max-w-3xl rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center text-pretty leading-relaxed text-foreground">
        <span className="font-semibold">Cam kết: </span>
        {aiUsage.commitment}
      </p>
    </Section>
  )
}
