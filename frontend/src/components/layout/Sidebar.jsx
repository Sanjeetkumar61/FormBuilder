import { LayoutDashboard, PlusSquare, Users, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Create Form", icon: PlusSquare, path: "/create-form" },
  { name: "User Dashboard", icon: Users, path: "/user-dashboard" },
];

export default function Sidebar({ closeSidebar }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    localStorage.removeItem("admin");
    navigate("/login");
    closeSidebar?.();
  };

  return (
    <aside
      className="
        w-64 h-full flex flex-col
        bg-white/70 backdrop-blur-xl
        shadow-[4px_0_30px_rgba(0,0,0,0.05)]
      "
    >
       
      <div className="p-6 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
        FormBuilder
      </div>

       
      <nav className="px-4 flex-1 space-y-2">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={() => closeSidebar?.()}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 font-medium
              ${
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                  : "text-slate-700 hover:bg-white/60"
              }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      
      <div className="p-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:shadow transition-all font-semibold"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}