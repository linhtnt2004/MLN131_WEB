"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Section } from "@/components/section"
import { transformation } from "@/lib/content"

export function Transformation() {
  const { before, after, rows } = transformation
  return (
    <Section
      id="chuyen-doi"
      eyebrow="So sánh"
      title="Gia đình chuyển đổi ra sao?"
      description="Từ truyền thống đến hiện đại qua bốn khía cạnh."
    >
      <div className="overflow-hidden rounded-2xl border border-border">
        {/* Header row */}
        <div className="grid grid-cols-[0.8fr_1fr_1fr] bg-primary text-primary-foreground">
          <div className="px-4 py-4 text-sm font-semibold md:px-6" />
          <div className="px-4 py-4 text-sm font-semibold md:px-6">{before}</div>
          <div className="px-4 py-4 text-sm font-semibold md:px-6">{after}</div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.15 }
            }
          }}
        >
          {rows.map((row, i) => (
            <motion.div
              key={row.aspect}
              variants={{
                hidden: { opacity: 0, x: -50 },
                show: { opacity: 1, x: 0 }
              }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-[0.8fr_1fr_1fr] items-stretch border-t border-border ${i % 2 === 0 ? "bg-card" : "bg-secondary/40"
                }`}
            >
              <div className="flex items-center px-4 py-4 font-serif text-sm font-bold text-foreground md:px-6 md:text-base">
                {row.aspect}
              </div>
              <div className="flex items-center px-4 py-4 text-sm leading-relaxed text-muted-foreground md:px-6">
                {row.before}
              </div>
              <div className="flex items-center gap-2 px-4 py-4 text-sm leading-relaxed text-foreground md:px-6">
                <ArrowRight className="hidden size-4 shrink-0 text-accent sm:block" />
                {row.after}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {transformation.note && (
        <p className="mt-4 text-center text-sm italic text-muted-foreground">
          {transformation.note}
        </p>
      )}
    </Section>
  )
}
