import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../store/auth/auth-slice";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.userDetails);

  const menuItems =
    user?.role === "admin"
      ? [
          { label: "Dashboard", path: "/" },
          { label: "Tasks", path: "/tasks" },
        ]
      : [{ label: "Dashboard", path: "/" }];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && <div className="fixed inset-0 bg-black/40 z-40 md:hidden" onClick={onClose} />}

      <aside
        className={`fixed md:static z-50 w-64 h-full bg-white border-r transition-transform
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center px-6 font-semibold text-lg">Task Management</div>

        {/* Menu */}
        <nav className="px-4 space-y-1">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg text-sm ${
                  isActive ? "bg-[#EEF0FF] text-primary" : "text-gray-600 hover:bg-gray-100"
                }`
              }
              onClick={onClose}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="absolute bottom-6 w-full px-4">
          <button
            onClick={() => dispatch(logout())}
            className="w-full text-left px-4 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
