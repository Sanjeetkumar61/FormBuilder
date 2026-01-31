import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormBuilder from "../../components/forms/FormBuilder";
import FormPreview from "../../components/forms/FormPreview";
import Button from "../../components/common/Button";
import { getFormById, updateForm } from "../../services/api";

export default function EditForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadForm();
  }, [id]);

  const loadForm = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getFormById(id);
      const form = response.data?.form || response.data?.data;
      
      if (!form) {
        setError("Form not found");
        return;
      }

      setFormTitle(form.title);
      setFields(form.fields || []);
    } catch (err) {
      setError(err.message || "Failed to load form");
    } finally {
      setLoading(false);
    }
  };

  const saveForm = async () => {
    if (!formTitle.trim()) {
      alert("Please enter a form title");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field");
      return;
    }

    setSaving(true);
    try {
      await updateForm(id, { title: formTitle, fields });
      alert("Form updated successfully!");
      navigate("/");
    } catch (error) {
      alert("Error updating form");
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">Loading form...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-300 text-red-700 px-6 py-4 rounded-xl m-6 shadow-md">
        <p className="font-semibold"> {error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition-all font-medium mt-4"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-3 pb-6 border-b-2 border-gradient-to-r from-blue-400 to-purple-400">
        <h2 className="text-3xl font-bold text-slate-800"> Edit Form</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FormBuilder
          formTitle={formTitle}
          setFormTitle={setFormTitle}
          fields={fields}
          setFields={setFields}
        />

        <FormPreview title={formTitle} fields={fields} />
      </div>

      <div className="flex gap-4 pt-6">
        <Button onClick={saveForm} disabled={saving} className="flex-1">
           {saving ? "Saving..." : "Update Form"}
        </Button>
        <Button variant="secondary" onClick={() => navigate("/")} className="flex-1">
           Cancel
        </Button>
      </div>
    </div>
  );
}
