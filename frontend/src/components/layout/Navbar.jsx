import { UserCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { getAdminData } from "../../services/api";

export default function Navbar() {
  const [admin, setAdmin] = useState({
    name: "Admin User",
    email: "admin@email.com",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const response = await getAdminData();
      // Backend returns { success: true, admin: {...} }
      const adminData = response.data?.admin;
      if (adminData) {
        setAdmin({
          name: adminData.name || "Admin User",
          email: adminData.email || "admin@email.com",
        });
      }
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
      // Keep default values on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="h-16 bg-gradient-to-r from-white via-blue-50 to-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm backdrop-blur-sm bg-opacity-90">
      <h1 className="font-bold text-xl text-slate-800 flex items-center gap-2">
          Admin Dashboard
      </h1>

      <div className="flex items-center gap-4 p-3 rounded-xl bg-white/50 backdrop-blur-sm border border-slate-200 hover:shadow-md transition-all">
        <UserCircle className="text-blue-600 hover:text-blue-700 transition-colors" size={32} />
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-800">{admin.name}</p>
          <p className="text-xs text-slate-600 font-medium">{admin.email}</p>
        </div>
      </div>
    </header>
  );
}