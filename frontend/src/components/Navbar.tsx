import { BrainCircuit } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="font-mono p-4 md:p-6">
      <nav className="mx-auto max-w-7xl sticky top-4 md:top-6 z-50 flex items-center justify-between  rounded-xl border border-gray-200 bg-white/80 shadow-md backdrop-blur-md px-4 py-3 md:px-6 ">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 font-normal" />
          <span className="text-xl font-medium">NeuraNote</span>
        </div>
        <Link to={"/login"}>
          <button className="cursor-pointer rounded-md bg-emerald-500 px-3 py-1.5 text-xs font-medium text-white shadow-md hover:bg-emerald-600 transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm">
            SignIn
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
