import Input from "../common/Input";

export default function FormField({
  field,
  value,
  onChange,
  mode = "user", 
}) {
 
  if (mode === "user") {
    return (
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-800">
          {field.label}
          {field.required && <span className="text-red-500 ml-1">*</span>}
        </label>

       
        {field.type === "text" && (
          <Input
            value={value || ""}
            onChange={(e) => onChange(field.label, e.target.value)}
            placeholder={`Enter ${field.label}`}
            type="text"
            required
          />
        )}

        
        {field.type === "email" && (
          <Input
            value={value || ""}
            onChange={(e) => onChange(field.label, e.target.value)}
            placeholder={`Enter ${field.label}`}
            type="email"
            required
          />
        )}

        
        {field.type === "number" && (
          <Input
            value={value || ""}
            onChange={(e) => onChange(field.label, e.target.value)}
            placeholder={`Enter ${field.label}`}
            type="number"
            required
          />
        )}

     
        {field.type === "textarea" && (
          <textarea
            value={value || ""}
            onChange={(e) => onChange(field.label, e.target.value)}
            placeholder={`Enter ${field.label}`}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all bg-white/80 backdrop-blur-sm hover:border-slate-400 cursor-text"
            rows="4"
            required
          />
        )}

       
        {field.type === "checkbox" && (
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) =>
                onChange(field.label, e.target.checked)
              }
              className="h-5 w-5 rounded border-gray-300 cursor-pointer"
            />
            <span className="text-sm text-slate-700">
              {field.label}
            </span>
          </div>
        )}

        
        {field.type === "checkbox-group" && (
          <div className="space-y-2.5 p-3 bg-white/40 rounded-lg border border-slate-200">
            {(field.options || []).map((option, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/60 transition-colors cursor-pointer">
                <input
                  type="checkbox"
                  checked={
                    Array.isArray(value)
                      ? value.includes(option)
                      : value === option
                  }
                  onChange={(e) => {
                    if (e.target.checked) {
                      const newValue = Array.isArray(value)
                        ? [...value, option]
                        : [option];
                      onChange(field.label, newValue);
                    } else {
                      const newValue = Array.isArray(value)
                        ? value.filter((v) => v !== option)
                        : [];
                      onChange(field.label, newValue);
                    }
                  }}
                  className="h-5 w-5 rounded border-gray-300 cursor-pointer"
                />
                <label className="text-sm text-slate-700 cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}

        
        {field.type === "radio" && (
          <div className="space-y-2.5 p-3 bg-white/40 rounded-lg border border-slate-200">
            {(field.options || []).map((option, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/60 transition-colors cursor-pointer">
                <input
                  type="radio"
                  name={field.label}
                  value={option}
                  checked={value === option}
                  onChange={(e) =>
                    onChange(field.label, e.target.value)
                  }
                  className="h-5 w-5 cursor-pointer"
                />
                <label className="text-sm text-slate-700 cursor-pointer">
                  {option}
                </label>
              </div>
            ))}
          </div>
        )}

       
        {field.type === "dropdown" && (
          <select
            value={value || ""}
            onChange={(e) => onChange(field.label, e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm hover:border-slate-400 cursor-pointer font-medium"
            required
          >
            <option value="">Select {field.label}</option>
            {(field.options || []).map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        
        {field.type === "file" && (
          <div className="space-y-3 p-4 border-2 border-dashed border-blue-300 rounded-lg bg-blue-50/50 hover:bg-blue-100/30 transition-colors">
            <input
              type="file"
              onChange={(e) => onChange(field.label, e.target.files?.[0])}
              className="w-full cursor-pointer"
              required={field.required || false}
              accept={
                field.acceptedFileTypes && field.acceptedFileTypes.length > 0
                  ? field.acceptedFileTypes
                      .map((type) => {
                        switch (type) {
                          case "pdf":
                            return ".pdf";
                          case "doc":
                            return ".doc,.docx";
                          case "image":
                            return "image/jpeg,image/png,image/gif";
                          case "excel":
                            return ".xls,.xlsx";
                          default:
                            return "";
                        }
                      })
                      .join(",")
                  : "*"
              }
            />
            {value && (
              <p className="text-sm text-green-600 font-medium flex items-center gap-2">
                <span className="text-lg">✓</span> {value.name} ({(value.size / 1024).toFixed(2)} KB)
              </p>
            )}
            {field.maxFileSize && (
              <p className="text-xs text-slate-600 font-medium">
                 Max file size: {(field.maxFileSize / (1024 * 1024)).toFixed(1)} MB
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  
  return (
    <div className="space-y-3 opacity-75 hover:opacity-90 transition-opacity">
      <label className="text-sm font-semibold text-slate-700">
        {field.label}
        {field.required && <span className="text-red-500 ml-1">*</span>}
      </label>

      
      {field.type === "text" && (
        <input
          disabled
          className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-100/60 text-slate-600"
          placeholder={`Enter ${field.label}`}
        />
      )}

    
      {field.type === "email" && (
        <input
          type="email"
          disabled
          className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-100/60 text-slate-600"
          placeholder={`Enter ${field.label}`}
        />
      )}

    
      {field.type === "number" && (
        <input
          type="number"
          disabled
          className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-100/60 text-slate-600"
          placeholder={`Enter ${field.label}`}
        />
      )}

     
      {field.type === "textarea" && (
        <textarea
          disabled
          className="w-full border border-slate-300 rounded-lg px-4 py-3 bg-slate-100/60 text-slate-600 resize-none"
          placeholder={`Enter ${field.label}`}
          rows="3"
        />
      )}

   
      {field.type === "checkbox" && (
        <div className="flex items-center gap-2">
          <input type="checkbox" disabled className="h-4 w-4" />
          <span className="text-sm">{field.label}</span>
        </div>
      )}

      
      {field.type === "checkbox-group" && (
        <div className="space-y-2">
          {(field.options || []).map((option, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="checkbox"
                disabled
                className="h-4 w-4"
              />
              <label className="text-sm">{option}</label>
            </div>
          ))}
        </div>
      )}

      
      {field.type === "radio" && (
        <div className="space-y-2">
          {(field.options || []).map((option, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="radio" disabled className="h-4 w-4" />
              <label className="text-sm">{option}</label>
            </div>
          ))}
        </div>
      )}

      
      {field.type === "dropdown" && (
        <select disabled className="w-full border rounded-lg px-3 py-2 bg-slate-100">
          <option>Select {field.label}</option>
          {(field.options || []).map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </select>
      )}

     
      {field.type === "file" && (
        <div className="space-y-2">
          <input
            type="file"
            disabled
            className="w-full border rounded-lg px-3 py-2 bg-slate-100"
          />
          {field.maxFileSize && (
            <p className="text-xs text-slate-500">
              Max file size: {(field.maxFileSize / (1024 * 1024)).toFixed(1)} MB
            </p>
          )}
          {field.required && (
            <p className="text-xs text-red-600">* Required</p>
          )}
        </div>
      )}
    </div>
  );
}