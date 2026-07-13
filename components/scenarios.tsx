"use client"

import { useState } from "react"
import { Check, X, Lightbulb, Activity, ArrowRight } from "lucide-react"
import { Section } from "@/components/section"
import { scenarios } from "@/lib/content"
import { cn } from "@/lib/utils"
import { useFamilyValue } from "@/app/context/FamilyValueContext"

function ScenarioCard({ 
  scenario, 
  index,
  onNext,
  isLast
}: { 
  scenario: (typeof scenarios)[number]; 
  index: number;
  onNext: () => void;
  isLast: boolean;
}) {
  const [selected, setSelected] = useState<number | null>(null)
  const { handleSelectOption } = useFamilyValue()
  const chosen = selected !== null ? scenario.options[selected] : null

  const handleSelect = (i: number) => {
    setSelected(i)
    // Truyền dữ liệu vào La bàn AI
    handleSelectOption(
      `scenario_${index}`, 
      i.toString(), 
      scenario.options[i].text
    )
  }

  return (
    <article className="flex flex-col rounded-3xl border border-border bg-card p-6 md:p-8 relative overflow-hidden shadow-xl">
      {selected !== null && (
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 animate-pulse" />
      )}
      
      <span className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-accent flex items-center justify-between">
        <span className="bg-secondary px-3 py-1.5 rounded-full border border-border">Tình huống {index + 1}</span>
        {selected !== null && (
          <span className="flex items-center text-blue-500 gap-1.5 animate-pulse bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
            <Activity className="size-3.5" /> AI Đã Ghi Nhận
          </span>
        )}
      </span>
      <p className="mb-8 text-pretty font-serif text-xl md:text-2xl font-semibold leading-relaxed text-foreground">
        {scenario.situation}
      </p>
      <div className="mb-2 flex flex-col gap-4">
        {scenario.options.map((opt, i) => {
          const isSelected = selected === i
          return (
            <button
              key={opt.text}
              type="button"
              onClick={() => handleSelect(i)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 text-left text-sm transition-all relative overflow-hidden",
                selected === null && "border-border hover:border-accent hover:bg-secondary/50 shadow-sm hover:shadow-md hover:-translate-y-0.5",
                isSelected && opt.correct && "border-primary bg-primary/10 text-foreground shadow-md ring-1 ring-primary/50",
                isSelected && !opt.correct && "border-destructive bg-destructive/10 text-foreground shadow-md ring-1 ring-destructive/50",
                selected !== null && !isSelected && "border-border opacity-40 grayscale",
              )}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
              )}
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold relative z-10 transition-colors",
                  isSelected && opt.correct && "border-primary bg-primary text-primary-foreground",
                  isSelected && !opt.correct && "border-destructive bg-destructive text-background",
                  !isSelected && "border-border text-muted-foreground bg-secondary",
                )}
              >
                {isSelected ? (
                  opt.correct ? <Check className="size-4" /> : <X className="size-4" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              <span className="relative z-10 text-base leading-snug">{opt.text}</span>
            </button>
          )
        })}
      </div>
      
      {chosen && (
        <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-secondary/80 p-5 md:p-6 text-sm leading-relaxed text-foreground border border-blue-500/30 shadow-inner animate-in slide-in-from-bottom-4 fade-in duration-500">
          <div className="flex gap-2 text-blue-500 font-mono text-[10px] uppercase tracking-wider opacity-80 mb-1">
            <Activity className="size-3.5" />
            <span>Phân tích nhanh</span>
          </div>
          <div className="flex gap-3">
            <Lightbulb className="mt-1 size-5 shrink-0 text-amber-500" aria-hidden="true" />
            <span className="text-base">
              <strong className="font-semibold block mb-1 text-lg">{chosen.correct ? "Góc nhìn thú vị!" : "Hãy thử nghĩ xem..."}</strong>
              {scenario.feedback}
            </span>
          </div>
          
          {!isLast ? (
            <button 
              onClick={onNext}
              className="mt-5 flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold text-base transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Đến tình huống tiếp theo <ArrowRight className="size-5" />
            </button>
          ) : (
            <div className="mt-5 text-center p-4 bg-green-500/20 text-green-600 rounded-xl font-bold text-base border border-green-500/30">
              🎉 Bạn đã hoàn thành! Hãy cuộn xuống mục La Bàn AI để phân tích tổng quát.
            </div>
          )}
        </div>
      )}
    </article>
  )
}

export function Scenarios() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < scenarios.length - 1) {
      setCurrentStep(currentStep + 1)
      // Scroll smoothly to top of scenarios
      setTimeout(() => {
        document.getElementById('tinh-huong')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }

  return (
    <Section
      id="tinh-huong"
      alt
      eyebrow="Thực hành"
      title="Bạn sẽ ứng xử thế nào?"
      description="Chọn phương án để xem góc nhìn của bạn thuộc về thời đại nào."
    >
      <div className="max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-10 px-2">
           <div className="flex justify-between items-end text-xs font-bold text-muted-foreground mb-3 uppercase tracking-widest">
             <span>Tiến trình trắc nghiệm</span>
             <span className="text-blue-600 bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 shadow-sm text-sm">
               {currentStep + 1} / {scenarios.length}
             </span>
           </div>
           <div className="h-3 w-full bg-secondary/80 rounded-full overflow-hidden border border-border/50 shadow-inner">
             <div 
               className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-700 ease-out relative" 
               style={{ width: `${((currentStep + 1) / scenarios.length) * 100}%` }}
             >
                <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]" />
             </div>
           </div>
        </div>

        {/* Step-by-step Content */}
        <div className="relative">
          {scenarios.map((s, i) => (
            <div 
              key={i} 
              className={cn(
                "transition-all duration-500", 
                currentStep === i ? "block animate-in fade-in slide-in-from-right-8" : "hidden"
              )}
            >
              <ScenarioCard scenario={s} index={i} onNext={nextStep} isLast={i === scenarios.length - 1} />
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
