"use client";

import React from "react";

interface StorySectionProps {
  bgImage: string;
  children: React.ReactNode;
}

export function StorySection({ bgImage, children }: StorySectionProps) {
  return (
    <section className="relative w-full min-h-screen">
      {/* NỀN CỐ ĐỊNH (STICKY) */}
      <div className="sticky top-0 h-screen w-full -z-10 overflow-hidden">
        <img
          src={bgImage}
          alt="Story Background"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
        />
        {/* Lớp phủ gradient đen mờ để dễ đọc chữ */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/50 to-slate-900/30" />
      </div>

      {/* NỘI DUNG TRƯỢT (SCROLL) */}
      <div className="relative z-10 -mt-[100vh] min-h-screen flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        {/* Khung kính (Glassmorphism) chứa nội dung Component gốc */}
        <div className="w-full max-w-6xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 md:p-12 shadow-2xl border border-white/20 mt-32 mb-32 transition-all duration-500 hover:shadow-3xl hover:bg-white">
          {children}
        </div>
      </div>
    </section>
  );
}
