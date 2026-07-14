"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Loader2,
  Sparkles,
  Cpu,
  Fingerprint,
  Settings,
  X,
  Key,
} from "lucide-react";
import { createPortal } from "react-dom";
import { useFamilyValue } from "../app/context/FamilyValueContext";

const loadingSteps = [
  "Khởi tạo luồng dữ liệu thần kinh...",
  "Đang mã hóa lựa chọn tình huống...",
  "Thiết lập kết nối với Google Gemini...",
  "AI đang phân tích hệ giá trị cốt lõi...",
];

export function ResultCompass() {
  const { userChoices } = useFamilyValue();
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load key từ localStorage khi mới vào trang
  useEffect(() => {
    setMounted(true);
    const savedKey = localStorage.getItem("user_gemini_key");
    if (savedKey) setApiKey(savedKey);
  }, []);
  const [resultText, setResultText] = useState("");
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const MIN_CHOICES_REQUIRED = 6;
  const isReady = userChoices.length >= MIN_CHOICES_REQUIRED;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingPhase((prev) =>
          prev < loadingSteps.length - 1 ? prev + 1 : prev,
        );
      }, 1500);
    } else {
      setLoadingPhase(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  useEffect(() => {
    if (resultText && isTyping) {
      let i = 0;
      setDisplayedText("");
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + resultText.charAt(i));
        i++;
        if (i >= resultText.length) {
          clearInterval(timer);
          setIsTyping(false);
        }
      }, 20); // Tốc độ gõ chữ
      return () => clearInterval(timer);
    }
  }, [resultText, isTyping]);

  const handleAnalyze = async () => {
    if (!isReady) return;

    setLoading(true);
    setError("");
    setResultText("");
    setDisplayedText("");

    try {
      const res = await fetch("/api/analyze-values", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-gemini-api-key": apiKey,
        },
        body: JSON.stringify({ choices: userChoices }),
      });

      const data = await res.json();

      if (data.success) {
        setResultText(data.result);
        setIsTyping(true);
      } else {
        setError(data.error || "Có lỗi xảy ra khi phân tích.");
      }
    } catch (err) {
      setError("Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-16 px-4 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-slate-950 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden border border-slate-800"
      >
        {/* Lưới Sci-fi Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

        {/* Cụm ánh sáng Gradient */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-purple-600/30 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Badge AI */}
          <div className="flex items-center gap-2 px-3 py-1 mb-8 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-sm text-xs font-medium text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Powered by Google Gemini AI</span>
          </div>

          <div className="w-20 h-20 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(59,130,246,0.3)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20" />
            <Cpu className="w-10 h-10 text-blue-400 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 font-serif">
            Hệ Thống La Bàn Giá Trị
          </h2>

          <p className="text-slate-400 mb-8 max-w-lg">
            Dữ liệu hành vi hiện tại:{" "}
            <span className="text-blue-400 font-mono font-bold">
              {userChoices.length}/{MIN_CHOICES_REQUIRED}
            </span>{" "}
            module. Hệ thống cần thu thập ít nhất {MIN_CHOICES_REQUIRED} module
            để khởi động ma trận phân tích tính cách gia đình của bạn.
          </p>

          {!resultText && !error && (
            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                {/* Vòng sáng quanh nút khi ready */}
                {isReady && !loading && (
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                )}

                <button
                  onClick={handleAnalyze}
                  disabled={!isReady || loading}
                  className={`relative flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                    isReady && !loading
                      ? "bg-slate-900 border border-slate-700 text-blue-400 hover:text-blue-300 cursor-pointer"
                      : "bg-slate-900/50 border border-slate-800 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      <span className="text-slate-300 font-mono text-sm">
                        {loadingSteps[loadingPhase]}
                      </span>
                    </>
                  ) : (
                    <>
                      <Fingerprint className="w-5 h-5" />
                      Bắt đầu Phân tích AI
                    </>
                  )}
                </button>
              </div>

              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 text-slate-500 hover:text-blue-400 text-xs font-mono transition-colors bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800"
              >
                <Settings className="w-4 h-4" />
                Cấu hình API Key (Tuỳ chọn)
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-950/50 text-red-400 rounded-xl border border-red-900/50 font-mono text-sm">
              [LỖI HỆ THỐNG]: {error}
            </div>
          )}

          <AnimatePresence>
            {resultText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-10 text-left w-full"
              >
                <div className="relative">
                  {/* Khung viền góc kiểu Sci-fi */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-blue-500 rounded-tl-lg" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-blue-500 rounded-tr-lg" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-blue-500 rounded-bl-lg" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-blue-500 rounded-br-lg" />

                  <div className="bg-slate-900/50 backdrop-blur-sm p-6 md:p-8 rounded-xl text-slate-300 leading-relaxed font-mono text-sm md:text-base border border-slate-800/50">
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-800">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-xs font-bold text-green-500 uppercase tracking-widest">
                        Phân tích hoàn tất
                      </span>
                    </div>

                    <p className="whitespace-pre-wrap">
                      {displayedText}
                      {isTyping && (
                        <span className="inline-block w-2 h-5 bg-blue-500 animate-pulse ml-1 align-middle" />
                      )}
                    </p>
                  </div>
                </div>

                {!isTyping && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-center mt-8"
                  >
                    <button
                      onClick={() => setResultText("")}
                      className="text-slate-500 hover:text-blue-400 text-sm font-mono transition-colors flex items-center gap-2"
                    >
                      <Loader2 className="w-4 h-4 rotate-180" /> Khởi động lại
                      La Bàn
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Modal Nhập API Key */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsModalOpen(false)}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative bg-slate-900 border border-slate-700 p-6 md:p-8 rounded-3xl shadow-2xl w-full max-w-md z-10 overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 transition-colors p-2 hover:bg-slate-800 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2.5 bg-blue-500/20 rounded-xl border border-blue-500/30">
                      <Key className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-200 font-serif">
                      Cấu hình API Key
                    </h3>
                  </div>

                  <div className="text-sm text-slate-400 mb-6 text-left leading-relaxed">
                    <p className="mb-3">
                      Cung cấp <b>Gemini API Key</b> của riêng bạn để hệ thống
                      phản hồi nhanh và ổn định hơn. Hướng dẫn lấy Key (Hoàn
                      toàn miễn phí, chỉ mất 1 phút):
                    </p>
                    <ol className="list-decimal pl-5 space-y-2 text-slate-300">
                      <li>
                        Truy cập{" "}
                        <a
                          href="https://aistudio.google.com/app/apikey"
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-400 hover:text-blue-300 hover:underline font-bold transition-colors"
                        >
                          Google AI Studio
                        </a>{" "}
                        và đăng nhập Google.
                      </li>
                      <li>
                        Bấm nút <b>"Create API key"</b> (Tạo khóa API).
                      </li>
                      <li>
                        Sao chép đoạn mã vừa tạo (bắt đầu bằng{" "}
                        <code className="bg-slate-800 text-blue-300 px-1.5 py-0.5 rounded text-xs">
                          AQzaSy...
                        </code>
                        ) và dán vào ô bên dưới.
                      </li>
                    </ol>
                  </div>

                  <div className="text-left mb-8">
                    <label className="block text-[11px] font-mono text-slate-500 mb-2 uppercase tracking-wider font-semibold">
                      Your Gemini API Key
                    </label>
                    <input
                      type="password"
                      placeholder="AIzaSy..."
                      className="w-full px-4 py-3.5 bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl text-slate-300 font-mono text-sm outline-none transition-all shadow-inner focus:shadow-[0_0_15px_rgba(59,130,246,0.1)]"
                      value={apiKey}
                      onChange={(e) => {
                        setApiKey(e.target.value);
                        localStorage.setItem("user_gemini_key", e.target.value);
                      }}
                    />
                    <p className="text-[11px] text-slate-500 mt-2.5 flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-yellow-500" />
                      Key được lưu trữ an toàn trong trình duyệt của bạn.
                    </p>
                  </div>

                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors text-sm font-bold"
                    >
                      Đóng
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white transition-all duration-300 text-sm font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                    >
                      Xác nhận
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
