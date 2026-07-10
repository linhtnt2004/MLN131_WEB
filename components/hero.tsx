"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { site } from "@/lib/content"

export function Hero() {
  const { hero } = site

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-6">

      {/* Background image blur */}
      <div className="absolute inset-0 -z-20">
        <Image
          src="/images/traditional-family.png"
          alt=""
          fill
          className="object-cover opacity-10 blur-2xl"
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1 className="font-serif text-6xl font-bold leading-tight md:text-8xl">
            {hero.heading}
          </h1>

          <p className="mt-6 text-3xl font-serif italic text-accent">
            {hero.highlight}
          </p>

          <p className="mt-10 max-w-2xl text-xl text-muted-foreground">
            {hero.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="mt-16"
        >
          <Image
            src="/images/modern-family.png"
            alt="Gia đình hiện đại"
            width={900}
            height={600}
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>
      </div>
    </section>
  )
}