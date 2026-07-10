"use client"

import { useState } from "react"
import { X, Plus, Check } from "lucide-react"
import { Section } from "@/components/section"
import { Icon } from "@/components/icon"
import { impacts } from "@/lib/content"

export function Impacts() {
  const [active, setActive] = useState<number | null>(null)
  const current = active !== null ? impacts[active] : null

  return (
    <Section
      id="tac-dong"
      alt
      eyebrow="Ba tác động lớn"
      title="Điều gì đang làm gia đình đổi thay?"
      description="Nhấn vào từng thẻ để xem giải thích ngắn gọn."
    >
      <div className="grid gap-5 md:grid-cols-3">
        {impacts.map((item, i) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActive(i)}
            className="group flex flex-col items-start rounded-2xl border border-border bg-card p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
          >
            <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon name={item.icon} className="size-6" />
            </span>
            <h3 className="mb-2 font-serif text-xl font-bold text-foreground">{item.title}</h3>
            <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">{item.summary}</p>
            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              <Plus className="size-4" aria-hidden="true" />
              Xem chi tiết
            </span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="impact-title"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon name={current.icon} className="size-5" />
                </span>
                <h3 id="impact-title" className="font-serif text-xl font-bold text-foreground">
                  {current.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Đóng"
              >
                <X className="size-5" />
              </button>
            </div>
            <ul className="space-y-3">
              {current.points.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </Section>
  )
}
