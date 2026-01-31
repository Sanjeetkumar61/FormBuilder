import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="flex-1 overflow-y-auto backdrop-blur-sm">
          <Outlet />
        </main>
      </div>
    </div>
  );
}