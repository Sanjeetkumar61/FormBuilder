import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllAvailableForms } from "../../services/api";
import { FileText, AlertCircle } from "lucide-react";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllAvailableForms();
      const formsData = response.data?.forms || response.data?.data || [];
      setForms(Array.isArray(formsData) ? formsData : []);
    } catch (err) {
      setError(err.message || "Failed to load forms");
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b-2 border-gradient-to-r from-blue-400 to-purple-400">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
           Available Forms
        </h2>
        <p className="text-slate-600 text-base font-medium mt-2">
          Fill and submit forms created by admin
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="p-5 bg-red-50 border border-red-300 text-red-700 rounded-xl flex items-center gap-3 shadow-md backdrop-blur-sm">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Forms Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600 font-medium">Loading forms...</p>
          </div>
        </div>
      ) : forms.length === 0 ? (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <FileText size={56} className="mx-auto text-slate-300 mb-4" />
          <p className="text-slate-600 text-lg font-medium">No forms available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form._id || form.id}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-white/20 hover:border-blue-300 hover:-translate-y-1"
              onClick={() => navigate(`/form/${form._id || form.id}`)}
            >
              <h3 className="text-lg font-bold text-slate-800 mb-3">
                 {form.title}
              </h3>

              <p className="text-sm text-slate-600 mb-5 font-medium">
                Click to fill out this form
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/form/${form._id || form.id}`);
                }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-3 rounded-lg hover:shadow-lg transition-all duration-300 text-sm font-semibold cursor-pointer hover:from-blue-700 hover:to-blue-800 active:scale-95"
              >
                 Fill Form
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
