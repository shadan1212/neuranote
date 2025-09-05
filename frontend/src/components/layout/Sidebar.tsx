import {
  BookOpen,
  BrainCircuit,
  FileText,
  Home,
  Lightbulb,
  StickyNote,
  Video,
  X,
} from "lucide-react";
import { useMemoryStore } from "../../store/memoryStore";
import { useUIStore } from "../../store/uiStore";

// const sections = ["All", "Videos", "Tweets", "Blogs", "Notes", "Ideas"];

const sections = [
  {
    icon: <Home className="h-5 w-5" />,
    title: "All",
  },
  {
    icon: <Video className="h-5 w-5" />,
    title: "Videos",
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Posts",
  },
  {
    icon: <BookOpen className="h-5 w-5" />,
    title: "Blogs",
  },
  {
    icon: <StickyNote className="h-5 w-5" />,
    title: "Notes",
  },
  {
    icon: <Lightbulb className="h-5 w-5" />,
    title: "Ideas",
  },
];

const Sidebar = () => {
  const { activeFilter, setFilter } = useMemoryStore();
  const { isSidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 border-r border-slate-200 bg-white">
        <div className="p-6 flex items-center justify-center gap-2">
          <BrainCircuit className="w-5 h-5 font-normal" />
          <span className="text-xl font-medium">NeuraNote</span>{" "}
        </div>
        <ul className="p-4">
          {sections.map((section) => (
            <li key={section.title} className="mb-2">
              <button
                onClick={() => setFilter(section.title)}
                // Use Tailwind to conditionally apply styles for the active item
                className={`flex gap-3 w-full text-left px-3 py-2 rounded-lg font-semibold ${
                  activeFilter === section.title
                    ? "bg-emerald-50 text-emerald-700 font-bold"
                    : "hover:bg-gray-200"
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* --- MOBILE NAVIGATION SIDEBAR --- */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? "bg-black/50" : "bg-transparent pointer-events-none"
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <div
          className={`absolute inset-y-0 left-0 flex flex-col w-64 bg-white shadow-xl transition-transform duration-300 ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 font-normal" />
              <span className="text-xl font-medium">NeuraNote</span>
            </div>{" "}
            <button onClick={() => setSidebarOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          <ul className="p-4">
            {sections.map((section) => (
              <li key={section.title} className="mb-2">
                <button
                  onClick={() => setFilter(section.title)}
                  // Use Tailwind to conditionally apply styles for the active item
                  className={`flex gap-3 w-full text-left px-3 py-2 rounded-lg font-semibold ${
                    activeFilter === section.title
                      ? "bg-emerald-50 text-emerald-700 font-bold"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {section.icon}
                  {section.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
