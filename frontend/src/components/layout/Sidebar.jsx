import { LayoutDashboard, PlusSquare, Users, LogOut } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const menu = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/" },
  { name: "Create Form", icon: PlusSquare, path: "/create-form" },
  { name: "User Dashboard", icon: Users, path: "/user-dashboard" },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("adminData");
    localStorage.removeItem("admin");
    
    // Redirect to login
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-slate-50 border-r border-slate-200 hidden md:flex flex-col h-screen shadow-sm">
      <div className="p-6 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-purple-600 flex items-center gap-2">
         FormBuilder
      </div>

      <nav className="px-4 flex-1 space-y-2">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 rounded-xl mb-1 transition-all duration-300 font-medium cursor-pointer
               ${
                 isActive
                   ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md hover:shadow-lg"
                   : "text-slate-700 hover:bg-white/60 backdrop-blur-sm"
               }`
            }
          >
            <item.icon size={20} />
            {item.name}
          </NavLink>
        ))}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="border-t border-slate-200 p-5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-5 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:shadow-md transition-all duration-300 font-semibold cursor-pointer active:scale-95"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}