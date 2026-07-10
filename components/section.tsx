"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionProps {
  id?: string
  eyebrow?: string
  title?: string
  description?: string
  alt?: boolean
  children: React.ReactNode
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  alt,
  children,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 120 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: "easeOut" }}
      viewport={{ once: true }}
      className={cn(
        "relative px-6 py-28 md:px-10",
        alt && "bg-secondary/30"
      )}
    >
      <div className="mx-auto max-w-6xl text-center">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-xs font-semibold tracking-widest text-accent uppercase"
          >
            {eyebrow}
          </motion.p>
        )}

        {title && (
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 font-serif text-4xl font-bold md:text-6xl"
          >
            {title}
          </motion.h2>
        )}

        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mx-auto mb-16 max-w-2xl text-muted-foreground"
          >
            {description}
          </motion.p>
        )}

        {children}
      </div>
    </motion.section>
  )
}