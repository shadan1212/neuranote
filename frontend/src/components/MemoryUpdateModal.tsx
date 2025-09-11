import { useEffect, useState } from "react";
import { useMemoryStore } from "../store/memoryStore";
import axios from "axios";
import type { CreateMemoryData } from "../types";
import type { IMemory } from "../types";
import toast from "react-hot-toast";

interface AddMemoryModalProps {
  initialData: IMemory | null;
  onCancel: () => void;
}

// A simple debounce utility
function debounce(func: Function, delay: number) {
  let timeout: NodeJS.Timeout;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}

const MEMORY_TYPES = ["Videos", "Posts", "Blogs", "Notes", "Ideas"];
const URL_REQUIRED_TYPES = ["Videos", "Posts", "Blogs"];

const AddMemoryModal = ({ initialData, onCancel }: AddMemoryModalProps) => {
  const { editMemory, error, isLoading } = useMemoryStore();
  const [formData, setFormData] = useState({
    type: "Videos",
    url: "",
    title: "",
    description: "",
    tags: "",
  });

  const [isScraping, setIsScraping] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        type: initialData.type || "Videos",
        url: initialData.url || "",
        title: initialData.title || "",
        description: initialData.description || "",
        tags: (initialData.tags || []).join(", "),
      });
    }
  }, [initialData]);

  const handleUrlChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData((prev) => ({ ...prev, url }));
    debounce(fetchMetaData, 1000)(url);
  };

  const fetchMetaData = async (url: string) => {
    if (!url || !url.startsWith("http")) return;

    setIsScraping(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/scraper/scrape-metadata",
        { url }
      );

      const data = response.data;
      if (data.title || data.description) {
        setFormData((prev) => ({
          ...prev,
          title: data.title || "",
          // description: data.description || "",
        }));
      }
    } catch (error) {
      console.error("Failed to scrape URL:", error);
    } finally {
      setIsScraping(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const memoryData: CreateMemoryData = {
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      url: URL_REQUIRED_TYPES.includes(formData.type) ? formData.url : "",
    };

    if (initialData?._id) {
      await editMemory(initialData._id, memoryData);
      onCancel();
    } else {
      console.error("Cannot edit memory without an ID.");
      toast.error("Could not find memory ID to update.");
    }
  };

  const showUrlField = URL_REQUIRED_TYPES.includes(formData.type);

  // if (!isModalOpen) return null;

  return (
    <div className="font-mono fixed inset-0 bg-black/60 flex items-center justify-center z-50 transition-opacity">
      <div className="relative bg-white rounded-lg p-8 w-full max-w-lg shadow-xl transform transition-all">
        <h2 className="text-2xl text-center font-bold mb-6 text-slate-800">
          Add New Memory
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-semibold text-slate-700 mb-2">
              Type
            </label>
            <div className="flex flex-wrap gap-2">
              {MEMORY_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, type }))}
                  className={`px-3 py-1.5 text-sm font-semibold rounded-full border transition-colors ${
                    formData.type === type
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-600 hover:bg-slate-50 border-slate-300"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* condiotnally rendering fields based on type */}
          {showUrlField && (
            <div>
              <label className="font-semibold text-slate-700 mb-2">URL</label>
              <div className="relative">
                <input
                  type="url"
                  placeholder="Paste a link to auto-fill..."
                  className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500"
                  value={formData.url}
                  onChange={handleUrlChange}
                  required
                />
                {isScraping && (
                  <div className="absolute right-3 top-2.5 h-5 w-5 animate-spin rounded-full border-b-2 border-emerald-600"></div>
                )}
              </div>
            </div>
          )}

          {/* Title, Description, Tags for ALL types */}
          <div>
            <label className="font-semibold text-slate-700 mb-2">Title</label>
            <input
              type="text"
              placeholder={
                showUrlField
                  ? "Auto-filled or manual title"
                  : "What's on your mind?"
              }
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-2">
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Add more details..."
              className="w-full resize-none p-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>

          <div>
            <label className="font-semibold text-slate-700 mb-2">Tags</label>
            <input
              type="text"
              placeholder="Enter tags, separated by commas..."
              className="w-full p-2 border border-slate-300 rounded-md focus:outline-none focus:ring focus:ring-emerald-500 focus:border-emerald-500"
              value={formData.tags}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, tags: e.target.value }))
              }
            />
          </div>
          {error && <p className="text-red-700"></p>}
          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium rounded-md bg-slate-200 hover:bg-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white font-semibold rounded-md hover:bg-emerald-700"
            >
              {isLoading ? "Updaing Memory..." : "Update Memory"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemoryModal;
