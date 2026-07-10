import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { TraditionalFamily } from "@/components/traditional-family"
import { Impacts } from "@/components/impacts"
import { Transformation } from "@/components/transformation"
import { ValueGrid } from "@/components/value-grid"
import { Scenarios } from "@/components/scenarios"
import { Quiz } from "@/components/quiz"
import { AiUsage } from "@/components/ai-usage"
import { References } from "@/components/references"
import { traditionalValues, modernValues } from "@/lib/content"

export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <div className="my-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <TraditionalFamily />
      <div className="my-24 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <Impacts />
      <Transformation />
      <ValueGrid
        id="gia-tri"
        eyebrow="Gìn giữ"
        title="Giá trị truyền thống cần bảo tồn"
        description="Những nét đẹp làm nên bản sắc gia đình Việt."
        values={traditionalValues}
        variant="preserve"
      />
      <ValueGrid
        id="gia-tri-hien-dai"
        eyebrow="Tiếp thu"
        title="Giá trị hiện đại cần tiếp nhận"
        description="Những giá trị tiến bộ cho gia đình thời 4.0."
        values={modernValues}
        variant="adopt"
        alt
      />
      <Scenarios />
      <Quiz />
      <AiUsage />
      <References />
    </main>
  )
}
