import { Menu, Sparkles, Plus, ExternalLink, BrainCircuit } from "lucide-react";
import { useUIStore } from "../../store/uiStore";
import { useMemoryStore } from "../../store/memoryStore";
import { format } from "date-fns";
import { useAuthStore } from "../../store/authStore";

const MainContentArea = () => {
  const { setSidebarOpen, setAiSidebarOpen } = useUIStore();
  const { memories, activeFilter, isLoading, error } = useMemoryStore();
  const { user } = useAuthStore();

  const today = new Date();
  const formattedToday = format(today, "EEEE, LLLL d, yyyy");

  if (isLoading) {
    return <div className="p-8 text-center">Loading your memories...</div>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load content. Please try again later.
      </div>
    );
  }

  const filteredMemories =
    activeFilter === "All"
      ? memories
      : memories.filter((mem) => mem.type === activeFilter);

  return (
    <main className="flex-1 overflow-y-auto">
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 font-normal" />
            <span className="text-xl font-medium">NeuraNote</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => setAiSidebarOpen(true)} className="xl:hidden">
            <Sparkles className="h-6 w-6 text-amber-500" />
          </button>
          <button className="flex items-center justify-center gap-1.5 cursor-pointer rounded-md bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-md hover:bg-emerald-700 transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm">
            <Plus className="h-4 w-4" /> Add
          </button>
        </div>
      </header>

      <div className="p-6 lg:p-10">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Welcome, {user?.name}
            </h2>
            <p className="mt-1 text-slate-600">{formattedToday}</p>
          </div>
          <button className="hidden lg:flex items-center gap-2 cursor-pointer rounded-md bg-emerald-600 px-4 py-2 text-xs font-medium text-white shadow-md hover:bg-emerald-700 transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm">
            <Plus className="h-4 w-4" /> Add Memory
          </button>
        </div>

        <div className="mt-8  rounded-xl bg-emerald-50 p-4 text-emerald-800 border border-emerald-200">
          <p>
            Great! Your mind is getting clearer. ({memories.length} collections
            saved)
          </p>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold text-slate-900">All Memories</h3>
          {filteredMemories.length > 0 ? (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filteredMemories.map((memory) => (
                <div
                  key={memory._id}
                  className="group relative flex flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg"
                >
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">
                      {memory.title}
                    </h4>
                    <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                      {memory.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full px-3 py-1 text-xs font-medium bg-slate-50 text-black border border-slate-200">
                      {memory.type}
                    </span>
                    <span className="text-xs text-slate-500">
                      {format(new Date(memory.createdAt), "dd-MM-yy")}
                    </span>
                  </div>
                  <a
                    href="#"
                    className="absolute inset-0"
                    aria-label={`View ${memory.title}`}
                  ></a>
                  <button className="absolute top-4 right-4 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No Memories stored yet for this category.
            </p>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainContentArea;
