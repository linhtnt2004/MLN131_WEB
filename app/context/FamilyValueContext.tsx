"use client";

import React, { createContext, useContext, useState } from "react";

export type Choice = {
  scenarioId: string;
  selectedOption: string;
  optionText: string;
};

type FamilyValueContextType = {
  userChoices: Choice[];
  handleSelectOption: (
    scenarioId: string,
    selectedOption: string,
    optionText: string
  ) => void;
};

const FamilyValueContext = createContext<FamilyValueContextType | undefined>(
  undefined
);

export function FamilyValueProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userChoices, setUserChoices] = useState<Choice[]>([]);

  const handleSelectOption = (
    scenarioId: string,
    selectedOption: string,
    optionText: string
  ) => {
    setUserChoices((prev) => {
      // Nếu đã trả lời câu này rồi thì cập nhật lại đáp án
      const existingIndex = prev.findIndex((c) => c.scenarioId === scenarioId);
      if (existingIndex >= 0) {
        const newChoices = [...prev];
        newChoices[existingIndex] = { scenarioId, selectedOption, optionText };
        return newChoices;
      }
      // Nếu chưa thì thêm mới
      return [...prev, { scenarioId, selectedOption, optionText }];
    });
  };

  return (
    <FamilyValueContext.Provider value={{ userChoices, handleSelectOption }}>
      {children}
    </FamilyValueContext.Provider>
  );
}

export function useFamilyValue() {
  const context = useContext(FamilyValueContext);
  if (context === undefined) {
    throw new Error(
      "useFamilyValue must be used within a FamilyValueProvider"
    );
  }
  return context;
}
