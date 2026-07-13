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
import { ResultCompass } from "@/components/ResultCompass"
import { StorySection } from "@/components/StorySection"

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      
      {/* CHẶNG 1: GIÁ TRỊ TRUYỀN THỐNG */}
      <StorySection bgImage="/images/bg-traditional.png">
        <TraditionalFamily />
      </StorySection>

      {/* CHẶNG 2: SỰ BIẾN ĐỔI (ĐÔ THỊ HÓA & 4.0) */}
      <StorySection bgImage="/images/bg-urban.png">
        <Impacts />
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <Transformation />
      </StorySection>

      {/* CHẶNG 3: SỰ DUNG HÒA GIÁ TRỊ */}
      <StorySection bgImage="/images/bg-harmony.png">
        <ValueGrid
          id="gia-tri"
          eyebrow="Gìn giữ"
          title="Giá trị truyền thống cần bảo tồn"
          description="Những nét đẹp làm nên bản sắc gia đình Việt."
          values={traditionalValues}
          variant="preserve"
        />
        <div className="my-12 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <ValueGrid
          id="gia-tri-hien-dai"
          eyebrow="Tiếp thu"
          title="Giá trị hiện đại cần tiếp nhận"
          description="Những giá trị tiến bộ cho gia đình thời 4.0."
          values={modernValues}
          variant="adopt"
          alt
        />
      </StorySection>

      {/* CHẶNG 4: THỰC HÀNH & LA BÀN AI */}
      <StorySection bgImage="/images/bg-future.png">
        <Scenarios />
        <Quiz />
        <div className="mt-16 mb-8 text-center">
          <h3 className="text-2xl font-serif font-bold text-slate-800">Kết quả tổng kết</h3>
          <p className="text-slate-500 mt-2">Dựa trên những lựa chọn của bạn trong các tình huống</p>
        </div>
        <ResultCompass />
      </StorySection>

      {/* PHẦN KẾT: THÔNG TIN BÁO CÁO */}
      <div className="bg-white py-16">
        <AiUsage />
        <References />
      </div>
    </main>
  )
}
