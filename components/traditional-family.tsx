"use client"

import { motion } from "framer-motion"
import Image from "next/image"
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
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="mb-16 flex justify-center"
      >
        <Image
          src="/images/traditional-family.png"
          alt="Gia đình truyền thống Việt Nam"
          width={1000}
          height={500}
          className="rounded-3xl shadow-xl border border-border"
        />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-5">

        {/* Card lớn bên trái */}
        <motion.article
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="group lg:col-span-3 rounded-3xl border border-border bg-card p-10 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
        >
          <span className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
            <Icon name={traditionalCards[0].icon} className="size-8" />
          </span>

          <h3 className="mb-4 font-serif text-3xl font-bold">
            {traditionalCards[0].title}
          </h3>

          <p className="text-lg leading-relaxed text-muted-foreground">
            {traditionalCards[0].text}
          </p>
        </motion.article>

        {/* 3 card nhỏ bên phải */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {traditionalCards.slice(1).map((card) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="group rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon name={card.icon} className="size-6" />
              </span>

              <h3 className="mb-2 font-serif text-xl font-bold">
                {card.title}
              </h3>

              <p className="text-sm text-muted-foreground">
                {card.text}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  )
}