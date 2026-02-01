import { Plus, Eye, AlertCircle, Edit, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllForms, getFormResponses, deleteForm } from "../../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [responseCounts, setResponseCounts] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAllForms();
      const formsData = response.data?.forms || response.data?.data || [];
      const formsArray = Array.isArray(formsData) ? formsData : [];
      setForms(formsArray);
      
      
      const counts = {};
      for (const form of formsArray) {
        try {
          const responsesRes = await getFormResponses(form._id || form.id);
          const responsesData = responsesRes.data?.responses || responsesRes.data?.data || [];
          counts[form._id || form.id] = Array.isArray(responsesData) ? responsesData.length : 0;
        } catch (err) {
          counts[form._id || form.id] = 0;
        }
      }
      setResponseCounts(counts);
    } catch (err) {
      setError(err.message || "Failed to load forms");
      setForms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (formId) => {
    setDeleting(true);
    try {
      await deleteForm(formId);
      setDeleteConfirm(null);
      await loadForms(); // Reload forms
    } catch (err) {
      setError("Failed to delete form");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (formId) => {
    
    navigate(`/edit-form/${formId}`);
  };

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center pb-6 border-b-2 border-gradient-to-r from-blue-400 to-purple-400">
        <h2 className="text-3xl font-bold text-slate-800"> All Forms</h2>

        <button
          onClick={() => navigate("/create-form")}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold cursor-pointer hover:from-blue-700 hover:to-blue-800 active:scale-95"
        >
          <Plus size={20} />
          Create Form
        </button>
      </div>

    
      {error && (
        <div className="mb-6 p-5 bg-red-50 border border-red-300 text-red-700 rounded-xl flex items-center gap-3 shadow-md backdrop-blur-sm">
          <AlertCircle size={20} className="flex-shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

    
      {loading ? (
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-slate-600 font-medium">Loading forms...</p>
          </div>
        </div>
      ) : forms.length === 0 ? (
        <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20">
          <p className="text-slate-600 text-lg font-medium mb-6"> No forms created yet</p>
          <button
            onClick={() => navigate("/create-form")}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg hover:shadow-lg transition-all duration-300 font-semibold"
          >
             Create Your First Form
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form._id || form.id}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-white/20 hover:border-blue-300 relative group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-slate-800 flex-1 group-hover:text-blue-600 transition-colors">
                   {form.title}
                </h3>
                
              
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(form._id || form.id)}
                    className="p-2.5 text-blue-600 hover:bg-blue-100 rounded-lg transition-all cursor-pointer"
                    title="Edit form"
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(form._id || form.id)}
                    className="p-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-all cursor-pointer"
                    title="Delete form"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-5 font-medium">
                 Responses:{" "}
                <span className="font-bold text-slate-800">
                  {responseCounts[form._id || form.id] || 0}
                </span>
              </p>

              <button
                onClick={() => navigate(`/responses/${form._id || form.id}`)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-semibold hover:underline transition-colors cursor-pointer"
              >
                <Eye size={18} />
                View Responses
              </button>

        
              {deleteConfirm === (form._id || form.id) && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-2xl max-w-sm border border-white/50">
                    <h3 className="text-xl font-bold text-slate-900 mb-3"> Delete Form?</h3>
                    <p className="text-slate-600 mb-8 font-medium">
                      Are you sure you want to delete <strong>"{form.title}"</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-6 py-2.5 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition-all font-semibold cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(form._id || form.id)}
                        disabled={deleting}
                        className="px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:shadow-lg transition-all font-semibold disabled:bg-red-400 cursor-pointer"
                      >
                        {deleting ? " Deleting..." : " Delete"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}