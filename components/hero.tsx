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
          src="/images/bg-traditional.png"
          alt=""
          fill
          priority
          className="object-cover opacity-10 blur-2xl"
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {/* AI Prominence Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-slate-900/10 border border-slate-800/20 backdrop-blur-md shadow-xl">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-sm font-semibold text-slate-800 tracking-wide">
              Trải nghiệm Scrollytelling & La Bàn Giá Trị AI
            </span>
          </div>

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
            src="/images/bg-harmony.png"
            alt="Gia đình hiện đại"
            width={900}
            height={600}
            style={{ width: "auto", height: "auto" }}
            className="rounded-3xl shadow-2xl border border-white/20"
          />
        </motion.div>
      </div>

    </section>
  )
}