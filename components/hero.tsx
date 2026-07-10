import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { site } from "@/lib/content"

export function Hero() {
  const { hero } = site
  return (
    <section id="top" className="relative overflow-hidden px-5 pt-16 pb-20 md:pt-24 md:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <span className="mb-4 inline-block rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-secondary-foreground">
            {hero.eyebrow}
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-[1.05] text-foreground md:text-6xl">
            {hero.heading}
          </h1>
          <p className="mt-3 text-balance font-serif text-xl italic text-accent md:text-2xl">
            {hero.highlight}
          </p>
          <p className="mx-auto mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground lg:mx-0">
            {hero.description}
          </p>
          <a
            href="#truyen-thong"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold text-accent-foreground shadow-sm transition-transform hover:-translate-y-0.5"
          >
            {hero.cta}
            <ArrowDown className="size-4" aria-hidden="true" />
          </a>
        </div>

        {/* Split visual */}
        <div className="grid grid-cols-2 gap-3">
          <figure className="group relative overflow-hidden rounded-2xl">
            <Image
              src="/images/traditional-family.png"
              alt="Gia đình Việt Nam truyền thống nhiều thế hệ quây quần bên mâm cơm"
              width={600}
              height={800}
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[26rem]"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
              <span className="block text-sm font-semibold text-background">
                {hero.traditional.label}
              </span>
              <span className="block text-xs text-background/80">{hero.traditional.caption}</span>
            </figcaption>
          </figure>

          <figure className="group relative mt-8 overflow-hidden rounded-2xl">
            <Image
              src="/images/modern-family.png"
              alt="Gia đình Việt Nam hiện đại sử dụng công nghệ trong căn hộ thành phố"
              width={600}
              height={800}
              className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-[26rem]"
              priority
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/80 to-transparent p-4">
              <span className="block text-sm font-semibold text-background">{hero.modern.label}</span>
              <span className="block text-xs text-background/80">{hero.modern.caption}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}
