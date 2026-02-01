import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
      
      
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      
      <div
        className={`fixed md:static z-50 h-full transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <Sidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

     
      <div className="flex flex-col flex-1 overflow-hidden">
        
        
        <div className="flex items-center">
        
          <div className="md:hidden p-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg bg-white shadow hover:bg-gray-100"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="flex-1">
            <Navbar />
          </div>
        </div>

        
        <main className="flex-1 overflow-y-auto backdrop-blur-sm p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}