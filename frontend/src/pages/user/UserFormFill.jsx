import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RenderForm from "../../components/forms/RenderForm";
import { getFormById } from "../../services/api";
import { AlertCircle } from "lucide-react";

export default function UserFormFill() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadForm();
  }, [id]);

  const loadForm = async () => {
    try {
      setLoading(true);
      const res = await getFormById(id);
      
      // Extract form data from response
      const formData = res.data?.form || res.data?.data || res.data;
      
      if (formData && formData.title) {
        setForm(formData);
      } else {
        setError("Form not found");
        console.error("Invalid form response:", res.data);
      }
    } catch (err) {
      setError(err.message || "Error loading form");
      console.error("Error loading form:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-14 w-14 border-4 border-blue-600 border-t-transparent mb-6"></div>
          <p className="text-slate-700 font-semibold text-lg">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
        <div className="text-center bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg max-w-md border border-red-200">
          <AlertCircle size={56} className="mx-auto text-red-500 mb-4" />
          <p className="text-red-600 font-bold text-lg mb-2">Error Loading Form</p>
          <p className="text-slate-600 font-medium">{error || "Form not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-8">
      <div className="w-full max-w-2xl bg-white/85 backdrop-blur-sm rounded-2xl shadow-2xl p-10 border border-white/40">
        <div className="mb-8 pb-6 border-b-2 border-gradient-to-r from-blue-300 to-purple-300">
          <h1 className="text-4xl font-bold text-slate-800 text-center">
            {form.title}
          </h1>
          <p className="text-center text-slate-600 mt-3 font-medium">
             Please fill out the form below
          </p>
        </div>

        <RenderForm 
          fields={form.fields || []} 
          formId={form._id || id}
        />
      </div>
    </div>
  );
}