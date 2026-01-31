import { PlusCircle, Trash2, Plus, X } from "lucide-react";
import Input from "../common/Input";
import Button from "../common/Button";

export default function FormBuilder({
  formTitle,
  setFormTitle,
  fields,
  setFields,
}) {
  // add new field
  const addField = () => {
    setFields([
      ...fields,
      {
        id: Date.now(),
        label: "",
        type: "text",
        options: [],
      },
    ]);
  };

  // update field
  const updateField = (id, key, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  // add option to dropdown/radio/checkbox field
  const addOption = (fieldId) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: [...(field.options || []), ""],
            }
          : field
      )
    );
  };

  // update option
  const updateOption = (fieldId, optionIndex, value) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.map((opt, idx) =>
                idx === optionIndex ? value : opt
              ),
            }
          : field
      )
    );
  };

  // remove option
  const removeOption = (fieldId, optionIndex) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? {
              ...field,
              options: field.options.filter((_, idx) => idx !== optionIndex),
            }
          : field
      )
    );
  };

  // remove field
  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  // Check if field type needs options
  const needsOptions = (type) =>
    ["dropdown", "radio", "checkbox-group"].includes(type);

  // Check if field type needs file settings
  const needsFileSettings = (type) => type === "file";

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
      {/* Form Title */}
      <div className="mb-8">
        <Input
          label="Form Title"
          placeholder="Enter form title"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          required
        />
      </div>

      {/* Fields Section */}
      <div className="space-y-5">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="border border-slate-200 rounded-xl p-5 bg-gradient-to-br from-slate-50 to-white hover:shadow-md transition-all duration-300 hover:border-slate-300"
          >
            {/* Field Header */}
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center mb-4">
              {/* Field Label */}
              <div className="flex-1 w-full">
                <Input
                  placeholder={`Field ${index + 1} label`}
                  value={field.label}
                  onChange={(e) =>
                    updateField(field.id, "label", e.target.value)
                  }
                  required
                />
              </div>

              {/* Field Type */}
              <select
                value={field.type}
                onChange={(e) =>
                  updateField(field.id, "type", e.target.value)
                }
                className="border border-slate-300 rounded-lg px-4 py-2.5 w-full md:w-56 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-slate-400 cursor-pointer font-medium"
              >
                <optgroup label="Basic">
                  <option value="text">Text Input</option>
                  <option value="email">Email</option>
                  <option value="number">Number</option>
                  <option value="textarea">Text Area</option>
                </optgroup>
                <optgroup label="Selection">
                  <option value="checkbox">Checkbox (Single)</option>
                  <option value="checkbox-group">Checkboxes (Multiple)</option>
                  <option value="radio">Radio Buttons</option>
                  <option value="dropdown">Dropdown</option>
                </optgroup>
                <optgroup label="File Upload">
                  <option value="file">File Upload</option>
                </optgroup>
              </select>

              {/* Delete */}
              <button
                onClick={() => removeField(field.id)}
                className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all duration-300 cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>

            {/* File Settings Section */}
            {needsFileSettings(field.type) && (
              <div className="mt-5 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-blue-200 shadow-sm">
                <label className="text-sm font-semibold text-slate-800 block mb-4">
                  ⚙️ File Upload Settings
                </label>

                {/* Required */}
                <div className="mb-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={field.required || false}
                      onChange={(e) =>
                        updateField(field.id, "required", e.target.checked)
                      }
                      className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 font-medium">Required field</span>
                  </label>
                </div>

                {/* Max File Size */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-slate-700 block mb-2">
                    Max File Size (MB)
                  </label>
                  <input
                    type="number"
                    value={(field.maxFileSize || 5242880) / (1024 * 1024)}
                    onChange={(e) =>
                      updateField(
                        field.id,
                        "maxFileSize",
                        e.target.value * 1024 * 1024
                      )
                    }
                    min="1"
                    className="w-full border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 hover:border-slate-400"
                  />
                </div>

                {/* Accepted File Types */}
                <div>
                  <label className="text-sm font-medium text-slate-700 block mb-3">
                    Accepted File Types
                  </label>
                  <div className="space-y-2.5">
                    {[
                      { key: "pdf", label: "PDF" },
                      { key: "doc", label: "Word (DOC/DOCX)" },
                      { key: "image", label: "Images (JPG/PNG/GIF)" },
                      { key: "excel", label: "Excel (XLS/XLSX)" },
                    ].map((type) => (
                      <label key={type.key} className="flex items-center gap-3 cursor-pointer hover:bg-white/50 p-2 rounded-lg transition-colors">
                        <input
                          type="checkbox"
                          checked={
                            (field.acceptedFileTypes || []).includes(type.key)
                          }
                          onChange={(e) => {
                            const current = field.acceptedFileTypes || [];
                            const updated = e.target.checked
                              ? [...current, type.key]
                              : current.filter((t) => t !== type.key);
                            updateField(
                              field.id,
                              "acceptedFileTypes",
                              updated
                            );
                          }}
                          className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                        />
                        <span className="text-sm text-slate-700">
                          {type.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Options Section (for dropdown, radio, checkbox-group) */}
            {needsOptions(field.type) && (
              <div className="mt-5 p-4 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200 shadow-sm">
                <label className="text-sm font-semibold text-slate-800 block mb-4">
                   Options
                </label>

                <div className="space-y-3 mb-4">
                  {(field.options || []).map((option, optIdx) => (
                    <div key={optIdx} className="flex gap-3 items-center p-2 rounded-lg hover:bg-white/40 transition-colors">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          updateOption(field.id, optIdx, e.target.value)
                        }
                        placeholder={`Option ${optIdx + 1}`}
                        className="flex-1 border border-slate-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/80 hover:border-slate-400 cursor-text"
                      />
                      <button
                        onClick={() => removeOption(field.id, optIdx)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-all cursor-pointer"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => addOption(field.id)}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-semibold px-3 py-2 rounded-lg hover:bg-purple-50 transition-all cursor-pointer"
                >
                  <Plus size={16} />
                  Add Option
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Field Button */}
      <div className="mt-8">
        <Button
          variant="secondary"
          onClick={addField}
          className="flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <PlusCircle size={20} />
          Add Field
        </Button>
      </div>
    </div>
  );
}