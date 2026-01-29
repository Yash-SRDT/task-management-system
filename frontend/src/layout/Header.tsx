import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { user } = useSelector((state: RootState) => state.userDetails);

  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button onClick={onMenuClick} className="md:hidden text-xl font-bold">
          ☰
        </button>

        <div className="relative">
          <input
            type="text"
            placeholder="Search here..."
            className="w-72 pl-10 pr-4 py-2 text-sm rounded-lg border bg-[#F8F9FD]"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEF0FF] text-sm">
          <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
            {user?.name?.charAt(0)}
          </span>
          <span className="capitalize">{user?.role}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
