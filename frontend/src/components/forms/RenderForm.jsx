import { useState } from "react";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import Button from "../common/Button";
import { submitFormResponse } from "../../services/api";

export default function RenderForm({ fields = [], formId }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);

  // Ensure fields is an array
  const safeFields = Array.isArray(fields) ? fields : [];

  const handleChange = (label, value) => {
    // Handle file input separately
    if (value instanceof File) {
      setFiles({ ...files, [label]: value });
    } else {
      setFormData({ ...formData, [label]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get the Name field value (should be the first field or find by label)
    const nameField = safeFields.find(f => f.label?.toLowerCase() === "name");
    const userName = nameField ? formData[nameField.label] : "Anonymous";

    if (!userName?.trim()) {
      alert("Please enter your Name");
      return;
    }

    // Generate a simple userId based on timestamp and random number
    const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Store answers with field labels
    const answers = {};
    safeFields.forEach((field) => {
      answers[field.label] = formData[field.label] || "";
    });

    // Create FormData for multipart submission
    const formDataMultipart = new FormData();
    formDataMultipart.append("formId", formId);
    formDataMultipart.append("userId", userId);
    formDataMultipart.append("userName", userName);
    formDataMultipart.append("answers", JSON.stringify(answers));

    // Add files to FormData with field ID in the name
    Object.entries(files).forEach(([label, file]) => {
      const field = safeFields.find(f => f.label === label);
      const fieldId = field ? field.id : Date.now();
      // Use fieldId_label format so backend can parse it
      formDataMultipart.append(`${fieldId}_${label}`, file);
    });

    const payload = {
      formId,
      userId,
      userName,
      answers,
    };

    console.log("Submitting payload:", payload);
    console.log("Files:", files);

    setLoading(true);
    try {
      const response = await submitFormResponse(formDataMultipart);
      console.log("Response:", response);
      alert("Form submitted successfully!");
      navigate("/user-dashboard");
    } catch (error) {
      console.error("Form submission error details:", error);
      const errorMessage = error?.message || (typeof error === 'string' ? error : "Error submitting form");
      alert(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg p-8 space-y-6">
      {/* Form Fields */}
      {safeFields.length > 0 ? (
        safeFields.map((field) => (
          <FormField
            key={field.id}
            field={field}
            value={formData[field.label]}
            onChange={handleChange}
            mode="user"
          />
        ))
      ) : (
        <p className="text-slate-500 text-center py-4">No form fields available</p>
      )}

      <Button type="submit" disabled={loading} className="w-full mt-8">
        <Send size={18} />
        {loading ? "Submitting..." : "Submit Form"}
      </Button>
    </form>
  );
}