import { useEffect } from "react";
import AiSection from "../components/layout/AiSection";
import MainContentArea from "../components/layout/MainContentArea";
import Sidebar from "../components/layout/Sidebar";
import { useMemoryStore } from "../store/memoryStore";
import AddMemoryModal from "../components/AddMemoryModal";
import MemoryDetailModal from "../components/MemoryDetailModal";

const Dashboard = () => {
  const { fetchMemories } = useMemoryStore();

  useEffect(() => {
    fetchMemories();
  }, [fetchMemories]);

  return (
    <div className="font-mono h-screen overflow-hidden bg-slate-50 text-slate-800">
      <div className="flex h-full">
        <Sidebar />
        <MainContentArea />
        <AiSection />
        <AddMemoryModal />
        <MemoryDetailModal />
      </div>
    </div>
  );
};

export default Dashboard;
