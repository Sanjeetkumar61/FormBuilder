import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormBuilder from "../../components/forms/FormBuilder";
import FormPreview from "../../components/forms/FormPreview";
import Button from "../../components/common/Button";
import { createForm } from "../../services/api";

export default function CreateForm() {
  const navigate = useNavigate();
  const [formTitle, setFormTitle] = useState("");
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(false);

  const saveForm = async () => {
    if (!formTitle.trim()) {
      alert("Please enter a form title");
      return;
    }

    if (fields.length === 0) {
      alert("Please add at least one field");
      return;
    }

    setLoading(true);
    try {
      await createForm({ title: formTitle, fields });
      alert("Form created successfully!");
      navigate("/");
    } catch (error) {
      alert("Error creating form");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-3 pb-6 border-b-2 border-gradient-to-r from-blue-400 to-purple-400">
        <h2 className="text-3xl font-bold text-slate-800"> Create Form</h2>
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
        <Button onClick={saveForm} disabled={loading} className="flex-1">
           {loading ? "Saving..." : "Save Form"}
        </Button>
        <Button variant="secondary" onClick={() => navigate("/")} className="flex-1">
          Cancel
        </Button>
      </div>
    </div>
  );
}