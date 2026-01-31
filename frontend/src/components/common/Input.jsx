export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
}) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-semibold text-slate-800">
          {label}
          {required && (
            <span className="text-red-500 ml-1.5">*</span>
          )}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`border border-slate-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white/80 backdrop-blur-sm hover:border-slate-400 cursor-text ${className}`}
      />
    </div>
  );
}