import { Loader2, RotateCw, SendHorizonal, X } from "lucide-react";
import { useUIStore } from "../../store/uiStore";
import { useAIStore } from "../../store/aiStore";
import { useState } from "react";

// --- REUSABLE AI ASSISTANT CONTENT ---
const AiAssistantContent = () => {
  const {
    messages,
    error,
    isLoading,
    askAI,
    creditLimit,
    creditUsed,
    setMessages,
  } = useAIStore();
  const [input, setInput] = useState("");

  const creditsLeft =
    creditLimit !== null && creditUsed !== null
      ? creditLimit - creditUsed
      : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    askAI(input);
    setInput("");
  };

  return (
    <>
      {/* Header (Fixed) */}
      <div className="p-8 pb-4">
        <button
          onClick={setMessages}
          className="text-slate-900 flex justify-start cursor-pointer"
        >
          <RotateCw className="h-4 w-4" />
        </button>
        <h3 className="text-lg font-semibold text-slate-900 text-center">
          {/* <Sparkles className="h-5 w-5 text-amber-500" /> */}
          AI Assistant
        </h3>
        <p className="text-sm text-slate-500 mt-1 text-center">
          Ask questions about your saved content.
          {creditsLeft !== null && (
            <p className="text-center text-black">Credits: {creditsLeft}</p>
          )}
        </p>
      </div>

      {/* Chat History (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 pt-4 space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={msg.role === "user" ? "flex justify-end" : ""}
          >
            <div
              className={`inline-block rounded-lg p-3 text-sm ${
                msg.role === "user"
                  ? "bg-emerald-50 text-black"
                  : "bg-slate-50 border border-slate-200 text-slate-700"
              }`}
            >
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {/* Loading Indicator */}
        {isLoading && (
          <div>
            <div className="inline-block rounded-lg p-3 text-sm bg-slate-50 border border-slate-200 text-slate-700">
              <Loader2 className="h-4 w-4 animate-spin text-slate-500" />
            </div>
          </div>
        )}
        {/* Error Message */}
        {error && (
          <p className="rounded-xl bg-red-50 p-4 text-sm text-red-800 border border-red-200">
            {error}
          </p>
        )}
      </div>

      {/* Input Form (Fixed) */}
      <form
        onSubmit={handleSubmit}
        className="p-4 pt-4 border-t border-slate-200"
      >
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up..."
            className="w-full resize-none rounded-lg border-slate-300 p-3 pr-12 text-sm focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500"
            disabled={isLoading}
          />
          <button
            className="absolute bottom-2 right-3 rounded-md bg-emerald-600 p-1.5 text-white hover:bg-emerald-700 cursor-pointer"
            disabled={isLoading}
          >
            <SendHorizonal className="h-4 w-4" />
          </button>
        </div>
      </form>
    </>
  );
};

const AiSection = () => {
  const { isAiSidebarOpen, setAiSidebarOpen } = useUIStore();

  return (
    <>
      {/* --- DESKTOP AI ASSISTANT SIDEBAR --- */}
      <aside className="hidden xl:flex flex-col w-80 shrink-0 border-l border-slate-200 bg-white">
        <AiAssistantContent />
      </aside>

      {/* --- MOBILE AI ASSISTANT SIDEBAR --- */}
      <div
        className={`fixed inset-0 z-30 xl:hidden transition-opacity duration-300 ${
          isAiSidebarOpen ? "bg-black/50" : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setAiSidebarOpen(false)}
      >
        <div
          className={`absolute inset-y-0 right-0 flex flex-col w-80 max-w-[90vw] bg-white shadow-xl transition-transform duration-300 ${
            isAiSidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-end p-4 border-b border-slate-200">
            <button onClick={() => setAiSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <AiAssistantContent />
        </div>
      </div>
    </>
  );
};

export default AiSection;
