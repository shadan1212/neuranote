import { Search, X } from "lucide-react";
import { useUIStore } from "../../store/uiStore";

// --- REUSABLE AI ASSISTANT CONTENT ---
const AiAssistantContent = () => (
  <>
    {/* Header (Fixed) */}
    <div className="p-8 pb-4">
      <h3 className="text-lg font-semibold text-slate-900 text-center">
        {/* <Sparkles className="h-5 w-5 text-amber-500" /> */}
        AI Assistant
      </h3>
      <p className="text-sm text-slate-500 mt-1 text-center">
        Ask questions about your saved content.
      </p>
    </div>

    {/* Chat History (Scrollable) */}
    <div className="flex-1 overflow-y-auto p-8 pt-4 space-y-4">
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
        <p>
          Hello! I can help you search or answer questions. What would you like
          to know?
        </p>
      </div>
      <div className="text-right">
        <div className="inline-block rounded-lg bg-emerald-600 p-3 text-sm text-white">
          <p>Tell me about the video on building a second brain.</p>
        </div>
      </div>
      {/* ... More chat messages would go here ... */}
    </div>

    {/* Input Form (Fixed) */}
    <div className="p-8 pt-4 border-t border-slate-200">
      <div className="relative">
        <textarea
          rows={3}
          placeholder="Ask a follow-up..."
          className="w-full rounded-lg border-slate-300 p-3 pr-12 text-sm focus:border-emerald-500 focus:ring-emerald-500"
        ></textarea>
        <button className="absolute bottom-3 right-3 rounded-md bg-emerald-600 p-1.5 text-white hover:bg-emerald-700">
          <Search className="h-4 w-4" />
        </button>
      </div>
    </div>
  </>
);

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
