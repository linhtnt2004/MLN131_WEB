"use client"

import { motion } from "framer-motion"
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
      <p className="max-w-3xl mx-auto text-sm text-muted-foreground mt-4">
        Theo quan điểm của Chủ nghĩa Mác – Lênin, gia đình là thiết chế xã hội chịu sự quy định của cơ sở kinh tế.
        Khi phương thức sản xuất thay đổi, cấu trúc và chức năng gia đình cũng biến đổi theo.
      </p>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.2 } }
        }}
        className="grid gap-5 md:grid-cols-3"
      >
        {impacts.map((item, i) => (
          <motion.button
            key={item.title}
            type="button"
            onClick={() => setActive(i)}
            variants={{
              hidden: { opacity: 0, y: 50 },
              show: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.6 }}
            className="group flex flex-col items-start rounded-2xl border border-border bg-card p-7 text-left transition-all duration-300 hover:-translate-y-2 hover:border-accent hover:shadow-xl"
          >
            <span className="mb-5 flex size-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Icon name={item.icon} className="size-6" />
            </span>

            <h3 className="mb-2 font-serif text-xl font-bold text-foreground">
              {item.title}
            </h3>

            <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
              {item.summary}
            </p>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
              <Plus className="size-4" />
              Xem chi tiết
            </span>
          </motion.button>
        ))}
      </motion.div>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/50 p-4 backdrop-blur-sm sm:items-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl border border-border bg-white/80 backdrop-blur-xl p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                  <Icon name={current.icon} className="size-5" />
                </span>
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {current.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary"
              >
                <X className="size-5" />
              </button>
            </div>

            <ul className="space-y-3">
              {current.points.map((p, index) => (
                <li
                  key={index}
                  className="flex gap-3 text-sm leading-relaxed text-foreground"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
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