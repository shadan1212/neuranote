import { Edit, ExternalLink, Trash2, X } from "lucide-react";
import { useMemoryStore } from "../store/memoryStore";
import { format } from "date-fns";
import { useState } from "react";
import toast from "react-hot-toast";
import MemoryUpdateModal from "./MemoryUpdateModal";

const MemoryDetailModal = () => {
  const { selectedMemory, setSelectedMemory, removeMemory } = useMemoryStore();
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async () => {
    if (!selectedMemory) return;

    const promise = removeMemory(selectedMemory._id);

    toast.promise(promise, {
      loading: "Deleting memory...",
      success: "Memory deleted successfully!",
      error: "Failed to delete memory.",
    });

    setSelectedMemory(null);
  };

  if (!selectedMemory) {
    return null;
  }

  return (
    <div
      onClick={() => setSelectedMemory(null)}
      className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 transition-opacity duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b border-slate-200">
          <h3 className="text-xl font-semibold text-slate-800">
            {selectedMemory.type}
          </h3>
          <div className="flex items-center gap-2">
            {/* EDIT BUTTON */}
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 text-black hover:text-emerald-600 cursor-pointer"
              aria-label="Edit memory"
            >
              <Edit size={20} />
            </button>

            {/* DELETE BUTTON */}
            <button
              onClick={() => setIsConfirmingDelete(true)}
              className="p-1 text-black hover:text-red-600 cursor-pointer"
              aria-label="Delete memory"
            >
              <Trash2 size={20} />
            </button>
          </div>
          <button
            onClick={() => setSelectedMemory(null)}
            className="text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <X size={24} />
          </button>
        </div>

        {isEditing ? (
          <MemoryUpdateModal
            initialData={selectedMemory}
            onCancel={() => setIsEditing(false)}
          />
        ) : (
          <div className="p-6 overflow-y-auto space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">
              {selectedMemory.title}
            </h2>
            <p className="text-slate-600">{selectedMemory.description}</p>

            {selectedMemory.url && (
              <a
                href={selectedMemory.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-600 hover:text-emerald-800 font-semibold"
              >
                View Source <ExternalLink size={16} />
              </a>
            )}

            {selectedMemory.tags && selectedMemory.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedMemory.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-100 text-slate-700 text-xs font-medium px-2.5 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Body */}

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200 text-sm text-slate-500 rounded-b-lg">
          Added on:{" "}
          {format(new Date(selectedMemory.createdAt), "EEEE, d MMMM yyyy")}
        </div>

        {isConfirmingDelete && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center rounded-lg">
            <div className="p-6 bg-white rounded-lg shadow-lg border text-center">
              <p className="font-semibold">
                Are you sure you want to delete this?
              </p>
              <div className="mt-4 flex gap-4 justify-center">
                <button
                  onClick={() => setIsConfirmingDelete(false)}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-slate-200 hover:bg-slate-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryDetailModal;
