"use client"

import { useState } from "react"
import { Check, X, RotateCcw, Trophy } from "lucide-react"
import { Section } from "@/components/section"
import { quiz } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Quiz() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => quiz.map(() => null))
  const [submitted, setSubmitted] = useState(false)

  const answeredCount = answers.filter((a) => a !== null).length
  const score = answers.reduce<number>((acc, a, i) => (a === quiz[i].answer ? acc + 1 : acc), 0)

  function select(qi: number, oi: number) {
    if (submitted) return
    setAnswers((prev) => prev.map((a, i) => (i === qi ? oi : a)))
  }

  function reset() {
    setAnswers(quiz.map(() => null))
    setSubmitted(false)
  }

  return (
    <Section
      id="quiz"
      eyebrow="Kiểm tra hiểu biết"
      title="Trắc nghiệm nhanh"
      description="Trả lời 5 câu hỏi và xem điểm số của bạn."
    >
      <div className="mx-auto max-w-3xl space-y-6">
        {quiz.map((q, qi) => (
          <div key={qi} className="rounded-2xl border border-border bg-card p-6">
            <p className="mb-4 font-serif text-lg font-semibold text-foreground">
              <span className="text-accent">{qi + 1}.</span> {q.question}
            </p>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {q.options.map((opt, oi) => {
                const isSelected = answers[qi] === oi
                const isCorrect = q.answer === oi
                const showResult = submitted
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => select(qi, oi)}
                    disabled={submitted}
                    className={cn(
                      "flex items-center gap-2.5 rounded-xl border px-4 py-3 text-left text-sm transition-colors",
                      !showResult && isSelected && "border-accent bg-accent/10 text-foreground",
                      !showResult && !isSelected && "border-border hover:border-accent/60 hover:bg-secondary/50",
                      showResult && isCorrect && "border-primary bg-primary/10 text-foreground",
                      showResult && isSelected && !isCorrect && "border-destructive bg-destructive/10 text-foreground",
                      showResult && !isSelected && !isCorrect && "border-border opacity-60",
                    )}
                  >
                    {showResult && isCorrect && <Check className="size-4 shrink-0 text-primary" />}
                    {showResult && isSelected && !isCorrect && <X className="size-4 shrink-0 text-destructive" />}
                    <span>{opt}</span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={answeredCount < quiz.length}
            className="w-full rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-accent-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-50"
          >
            {answeredCount < quiz.length
              ? `Hãy trả lời hết (${answeredCount}/${quiz.length})`
              : "Xem kết quả"}
          </button>
        ) : (
          <div className="rounded-2xl border border-accent/30 bg-card p-8 text-center">
            <span className="mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground">
              <Trophy className="size-7" aria-hidden="true" />
            </span>
            <p className="font-serif text-2xl font-bold text-foreground">
              Bạn đúng {score}/{quiz.length} câu
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {score === quiz.length
                ? "Xuất sắc! Bạn đã nắm vững chủ đề."
                : score >= quiz.length / 2
                  ? "Khá tốt! Hãy ôn lại vài nội dung nhé."
                  : "Cùng xem lại các phần trên để hiểu rõ hơn."}
            </p>
            <button
              type="button"
              onClick={reset}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              <RotateCcw className="size-4" aria-hidden="true" />
              Làm lại
            </button>
          </div>
        )}
      </div>
    </Section>
  )
}
