"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import { useFamilyValue } from "../app/context/FamilyValueContext";

interface Option {
  id: string;
  text: string;
}

interface ScenarioCardProps {
  scenarioId: string;
  question: string;
  options: Option[];
}

export function ScenarioCard({ scenarioId, question, options }: ScenarioCardProps) {
  const { userChoices, handleSelectOption } = useFamilyValue();

  const currentChoice = userChoices.find((c) => c.scenarioId === scenarioId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 max-w-2xl mx-auto my-8 overflow-hidden relative"
    >
      <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-amber-400 to-orange-500" />
      
      <h3 className="text-xl font-bold text-slate-800 mb-6 pl-4 font-serif">
        {question}
      </h3>

      <div className="space-y-3 pl-4">
        {options.map((option) => {
          const isSelected = currentChoice?.selectedOption === option.id;
          return (
            <motion.button
              key={option.id}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => handleSelectOption(scenarioId, option.id, option.text)}
              className={`w-full flex items-start gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                isSelected
                  ? "bg-amber-50 border-2 border-amber-500 shadow-sm"
                  : "bg-slate-50 border-2 border-transparent hover:bg-slate-100"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isSelected ? (
                  <CheckCircle2 className="w-5 h-5 text-amber-600" />
                ) : (
                  <Circle className="w-5 h-5 text-slate-400" />
                )}
              </div>
              <span
                className={`leading-relaxed ${
                  isSelected ? "text-amber-900 font-medium" : "text-slate-600"
                }`}
              >
                {option.text}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
