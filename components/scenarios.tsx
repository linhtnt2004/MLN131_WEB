"use client"

import { useState } from "react"
import { Check, X, Lightbulb } from "lucide-react"
import { Section } from "@/components/section"
import { scenarios } from "@/lib/content"
import { cn } from "@/lib/utils"

function ScenarioCard({ scenario, index }: { scenario: (typeof scenarios)[number]; index: number }) {
  const [selected, setSelected] = useState<number | null>(null)
  const chosen = selected !== null ? scenario.options[selected] : null

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-6">
      <span className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-accent">
        Tình huống {index + 1}
      </span>
      <p className="mb-5 text-pretty font-serif text-lg font-semibold leading-snug text-foreground">
        {scenario.situation}
      </p>
      <div className="mb-4 flex flex-col gap-3">
        {scenario.options.map((opt, i) => {
          const isSelected = selected === i
          return (
            <button
              key={opt.text}
              type="button"
              onClick={() => setSelected(i)}
              className={cn(
                "flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                selected === null && "border-border hover:border-accent hover:bg-secondary/50",
                isSelected && opt.correct && "border-primary bg-primary/10 text-foreground",
                isSelected && !opt.correct && "border-destructive bg-destructive/10 text-foreground",
                selected !== null && !isSelected && "border-border opacity-60",
              )}
            >
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs",
                  isSelected && opt.correct && "border-primary bg-primary text-primary-foreground",
                  isSelected && !opt.correct && "border-destructive bg-destructive text-background",
                  !isSelected && "border-border text-muted-foreground",
                )}
              >
                {isSelected ? (
                  opt.correct ? <Check className="size-3.5" /> : <X className="size-3.5" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              {opt.text}
            </button>
          )
        })}
      </div>
      {chosen && (
        <div className="mt-auto flex gap-3 rounded-xl bg-secondary/60 p-4 text-sm leading-relaxed text-foreground">
          <Lightbulb className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
          <span>
            <strong className="font-semibold">{chosen.correct ? "Lựa chọn hợp lý. " : "Cân nhắc lại. "}</strong>
            {scenario.feedback}
          </span>
        </div>
      )}
    </article>
  )
}

export function Scenarios() {
  return (
    <Section
      id="tinh-huong"
      alt
      eyebrow="Thực hành"
      title="Bạn sẽ ứng xử thế nào?"
      description="Chọn phương án và nhận phản hồi ngay."
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {scenarios.map((s, i) => (
          <ScenarioCard key={i} scenario={s} index={i} />
        ))}
      </div>
    </Section>
  )
}
