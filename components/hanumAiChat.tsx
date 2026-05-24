"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";

export interface HanumAiChatProps {
  isDarkTheme: boolean;
}

interface ThemeTokens {
  windowBg: string;
  windowBorder: string;
  windowShadow: string;
  headerBg: string;
  headerBorder: string;
  headerTitle: string;
  headerSubtitle: string;
  headerCloseBtnColor: string;
  headerCloseBtnHoverBg: string;
  statusBorderColor: string;
  scrollbarColor: string;
  modelBubbleBg: string;
  modelBubbleBorder: string;
  modelBubbleText: string;
  userBubbleBg: string;
  userBubbleText: string;
  userBubbleShadow: string;
  typingBg: string;
  typingBorder: string;
  typingDot: string;
  inputAreaBg: string;
  inputAreaBorder: string;
  inputText: string;
  inputCaret: string;
  sendActiveBg: string;
  sendActiveBorder: string;
  sendActiveShadow: string;
  sendActiveIcon: string;
  sendDisabledBg: string;
  sendDisabledBorder: string;
  sendDisabledIcon: string;
  triggerBg: string;
  triggerShadow: string;
  avatarBg: string;
  avatarGlow: string;
}

function getTheme(dark: boolean): ThemeTokens {
  if (dark) {
    return {
      windowBg: "rgba(20, 8, 50, 0.82)",
      windowBorder: "1px solid rgba(147, 51, 234, 0.30)",
      windowShadow:
        "0 0 0 1px rgba(147,51,234,0.12), 0 24px 64px rgba(0,0,0,0.75), 0 0 80px rgba(147,51,234,0.15)",
      headerBg:
        "linear-gradient(90deg, rgba(88,28,135,0.65) 0%, rgba(109,40,217,0.35) 100%)",
      headerBorder: "1px solid rgba(147,51,234,0.25)",
      headerTitle: "#ede9fe",
      headerSubtitle: "#c084fc",
      headerCloseBtnColor: "#9f7aea",
      headerCloseBtnHoverBg: "rgba(147,51,234,0.18)",
      statusBorderColor: "rgba(20,8,50,0.9)",
      scrollbarColor: "rgba(109,40,217,0.35) transparent",
      modelBubbleBg: "rgba(15, 5, 40, 0.90)",
      modelBubbleBorder: "1px solid rgba(88,28,135,0.55)",
      modelBubbleText: "#e9d5ff",
      userBubbleBg: "linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)",
      userBubbleText: "#ede9fe",
      userBubbleShadow: "0 2px 16px rgba(109,40,217,0.4)",
      typingBg: "rgba(109,40,217,0.18)",
      typingBorder: "1px solid rgba(139,92,246,0.25)",
      typingDot: "#a78bfa",
      inputAreaBg: "rgba(15,5,40,0.75)",
      inputAreaBorder: "1px solid rgba(147,51,234,0.20)",
      inputText: "#ddd6fe",
      inputCaret: "#a78bfa",
      sendActiveBg: "linear-gradient(135deg, #5b21b6, #7c3aed)",
      sendActiveBorder: "1px solid rgba(168,85,247,0.45)",
      sendActiveShadow: "0 0 18px rgba(139,92,246,0.4)",
      sendActiveIcon: "#c4b5fd",
      sendDisabledBg: "rgba(109,40,217,0.10)",
      sendDisabledBorder: "1px solid rgba(109,40,217,0.15)",
      sendDisabledIcon: "rgba(139,92,246,0.30)",
      triggerBg:
        "linear-gradient(135deg, #4c1d95 0%, #7c3aed 60%, #a855f7 100%)",
      triggerShadow:
        "0 0 0 1px rgba(168,85,247,0.30), 0 4px 24px rgba(109,40,217,0.60), 0 0 48px rgba(168,85,247,0.20)",
      avatarBg: "linear-gradient(135deg, #6d28d9 0%, #a855f7 100%)",
      avatarGlow: "0 0 10px rgba(168,85,247,0.55)",
    };
  }
  return {
    windowBg: "rgba(250, 253, 251, 0.94)",
    windowBorder: "1px solid rgba(80,170,110,0.22)",
    windowShadow:
      "0 0 0 1px rgba(80,170,110,0.10), 0 20px 56px rgba(60,145,90,0.10), 0 4px 16px rgba(0,0,0,0.05)",
    headerBg:
      "linear-gradient(90deg, rgba(220,242,228,0.95) 0%, rgba(200,235,215,0.80) 100%)",
    headerBorder: "1px solid rgba(80,170,110,0.20)",
    headerTitle: "oklch(0.28 0.08 145)",
    headerSubtitle: "oklch(0.45 0.10 145)",
    headerCloseBtnColor: "oklch(0.45 0.10 145)",
    headerCloseBtnHoverBg: "rgba(80,170,110,0.12)",
    statusBorderColor: "rgba(250,253,251,0.95)",
    scrollbarColor: "rgba(80,170,110,0.25) transparent",
    modelBubbleBg: "rgba(220,242,228,0.75)",
    modelBubbleBorder: "1px solid rgba(80,170,110,0.22)",
    modelBubbleText: "oklch(0.25 0.07 145)",
    userBubbleBg:
      "linear-gradient(135deg, oklch(0.55 0.12 145) 0%, oklch(0.65 0.12 145) 100%)",
    userBubbleText: "#f0fdf4",
    userBubbleShadow: "0 2px 12px rgba(60,145,90,0.28)",
    typingBg: "rgba(220,242,228,0.85)",
    typingBorder: "1px solid rgba(80,170,110,0.22)",
    typingDot: "oklch(0.55 0.12 145)",
    inputAreaBg: "rgba(240,250,244,0.90)",
    inputAreaBorder: "1px solid rgba(80,170,110,0.18)",
    inputText: "oklch(0.25 0.07 145)",
    inputCaret: "oklch(0.55 0.12 145)",
    sendActiveBg:
      "linear-gradient(135deg, oklch(0.55 0.12 145), oklch(0.65 0.12 145))",
    sendActiveBorder: "1px solid rgba(80,170,110,0.45)",
    sendActiveShadow: "0 0 14px rgba(60,145,90,0.28)",
    sendActiveIcon: "#f0fdf4",
    sendDisabledBg: "rgba(180,225,198,0.30)",
    sendDisabledBorder: "1px solid rgba(80,170,110,0.18)",
    sendDisabledIcon: "rgba(60,145,90,0.35)",
    triggerBg:
      "linear-gradient(135deg, oklch(0.50 0.12 145) 0%, oklch(0.65 0.12 145) 60%, oklch(0.72 0.10 145) 100%)",
    triggerShadow:
      "0 0 0 1px rgba(80,170,110,0.25), 0 4px 20px rgba(60,145,90,0.38), 0 0 32px rgba(80,170,110,0.15)",
    avatarBg:
      "linear-gradient(135deg, oklch(0.50 0.12 145), oklch(0.65 0.12 145))",
    avatarGlow: "0 0 10px rgba(60,145,90,0.40)",
  };
}

const INITIAL_MESSAGES: UIMessage[] = [
  {
    id: "initial-welcome",
    role: "assistant",
    parts: [
      {
        type: "text",
        text: "Haii Hanumm...😊 Wah, nama kita sama yaa, hehe. Di sini aku sebagai AI Assistant yang dibuat khusus untuk kamu (aku AI dan bisa salah). Ada yang mau kamu ceritain atau tanyain ke aku?",
      },
    ],
  },
];

const SPRING = { type: "spring", stiffness: 320, damping: 28 } as const;

function Avatar({ isDarkTheme }: { isDarkTheme: boolean }) {
  const t = getTheme(isDarkTheme);
  return (
    <div
      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center select-none"
      style={{ background: t.avatarBg, boxShadow: t.avatarGlow }}
      aria-hidden="true"
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
        <circle cx="12" cy="7" r="4" />
        <path d="M8 6.5 Q8 2 12 2 Q16 2 16 6.5" fill="rgba(255,255,255,0.55)" />
        <path d="M4 22 Q4 15 12 15 Q20 15 20 22" />
      </svg>
    </div>
  );
}

function TypingIndicator({
  t,
  isDarkTheme,
}: {
  t: ThemeTokens;
  isDarkTheme: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.22 }}
      className="flex items-end gap-2"
    >
      <Avatar isDarkTheme={isDarkTheme} />
      <div
        className="px-4 py-3 rounded-2xl rounded-bl-sm flex items-center gap-1.5"
        style={{ background: t.typingBg, border: t.typingBorder }}
      >
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-1.5 h-1.5 rounded-full"
            style={{ background: t.typingDot }}
            animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.75,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

function ChatBubble({
  message,
  t,
  isDarkTheme,
}: {
  message: UIMessage;
  t: ThemeTokens;
  isDarkTheme: boolean;
}) {
  const isUser = message.role === "user";

  const textContent = message.parts
    .filter((p) => p.type === "text")
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && <Avatar isDarkTheme={isDarkTheme} />}
      <div
        className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser ? "rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm"
        }`}
        style={
          isUser
            ? {
                background: t.userBubbleBg,
                color: t.userBubbleText,
                boxShadow: t.userBubbleShadow,
              }
            : {
                background: t.modelBubbleBg,
                border: t.modelBubbleBorder,
                color: t.modelBubbleText,
              }
        }
      >
        {!isUser
          ? textContent.split("\n").map((line, i) => (
              <p key={i} className={i > 0 && line !== "" ? "mt-2" : ""}>
                {line === "" ? <>&nbsp;</> : line}
              </p>
            ))
          : textContent}
      </div>
    </motion.div>
  );
}

function SendIcon({ color }: { color: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

export function HanumAiChat({ isDarkTheme }: HanumAiChatProps) {
  const t = getTheme(isDarkTheme);
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [input, setInput] = useState(""); 

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: INITIAL_MESSAGES, 
  });

  const isStreaming = status === "streaming" || status === "submitted";

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const chatboxRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isStreaming]);

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node;
      if (
        chatboxRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      )
        return;
      setIsOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick, true);
    document.addEventListener("touchstart", handleOutsideClick, {
      capture: true,
      passive: true,
    });
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick, true);
      document.removeEventListener("touchstart", handleOutsideClick, true);
    };
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;
    sendMessage({ text: trimmed });
    setInput("");
    if (inputRef.current) inputRef.current.style.height = "auto";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const canSend = input.trim().length > 0 && !isStreaming;

  return (
    <div
      className="fixed bottom-5 right-4 md:bottom-6 md:right-6 z-50 flex flex-col items-end gap-3"
      role="region"
      aria-label="Hanum AI Chat"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatboxRef}
            key="chatbox"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={SPRING}
            className="flex flex-col overflow-hidden"
            style={{
              width: "clamp(300px, calc(100vw - 2rem), 360px)",
              height: "min(540px, calc(100dvh - 100px))",
              borderRadius: "20px",
              background: t.windowBg,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: t.windowBorder,
              boxShadow: t.windowShadow,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
              style={{ background: t.headerBg, borderBottom: t.headerBorder }}
            >
              <div className="relative flex-shrink-0">
                <Avatar isDarkTheme={isDarkTheme} />
                <span
                  className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2"
                  style={{
                    background: "#34d399",
                    borderColor: t.statusBorderColor,
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-sm font-semibold truncate"
                  style={{ color: t.headerTitle }}
                >
                  Hanum AI 👩‍🦰
                </p>
                <p className="text-[11px]" style={{ color: t.headerSubtitle }}>
                  online · siap ngobrol~
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Tutup chat"
                className="w-11 h-11 rounded-full flex items-center justify-center focus:outline-none"
                style={{ color: t.headerCloseBtnColor }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = t.headerCloseBtnHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "transparent")
                }
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: t.scrollbarColor,
                overscrollBehavior: "contain",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <ChatBubble
                    key={msg.id || i}
                    message={msg}
                    t={t}
                    isDarkTheme={isDarkTheme}
                  />
                ))}
                {isStreaming && (
                  <TypingIndicator t={t} isDarkTheme={isDarkTheme} />
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 flex-shrink-0 flex items-end gap-2 w-full"
              style={{
                borderTop: t.inputAreaBorder,
                background: t.inputAreaBg,
              }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ketik sesuatu..."
                rows={1}
                disabled={isStreaming}
                className="flex-1 resize-none bg-transparent text-sm focus:outline-none leading-relaxed"
                style={{
                  color: t.inputText,
                  maxHeight: "96px",
                  minHeight: "24px",
                  caretColor: t.inputCaret,
                }}
              />
              <motion.button
                onClick={handleSend}
                disabled={!canSend}
                aria-label="Kirim pesan"
                whileTap={canSend ? { scale: 0.88 } : {}}
                transition={{ duration: 0.12 }}
                className="w-11 h-11 rounded-xl flex-shrink-0 flex items-center justify-center focus:outline-none"
                style={{
                  background: canSend ? t.sendActiveBg : t.sendDisabledBg,
                  border: canSend ? t.sendActiveBorder : t.sendDisabledBorder,
                  boxShadow: canSend ? t.sendActiveShadow : "none",
                  cursor: canSend ? "pointer" : "not-allowed",
                }}
              >
                <SendIcon
                  color={canSend ? t.sendActiveIcon : t.sendDisabledIcon}
                />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trigger */}
      <motion.button
        ref={triggerRef}
        onClick={() => setIsOpen((v) => !v)}
        aria-label="Buka chat"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        transition={SPRING}
        className="relative w-14 h-14 rounded-full flex items-center justify-center focus:outline-none"
        style={{ background: t.triggerBg, boxShadow: t.triggerShadow }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        <AnimatePresence>
          {hasUnread && (
            <motion.span
              key="badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white"
              style={{ background: "#f43f5e" }}
            >
              <span
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "rgba(244,63,94,0.6)" }}
              />
              1
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
