import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

const RootLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { activeTab } = useSelector((state: RootState) => state.ui);

  return (
    <div className="flex h-screen bg-light">
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`z-50 md:static fixed h-full transition-transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* <Sidebar /> */}
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-6 border-b bg-white">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-xl" onClick={() => setIsSidebarOpen((p) => !p)}>
              ☰
            </button>
            <h2 className="text-lg font-semibold">{activeTab}</h2>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default RootLayout;
