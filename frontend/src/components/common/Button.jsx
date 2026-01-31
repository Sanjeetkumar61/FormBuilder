export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  className = "",
  disabled = false,
}) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-lg hover:from-blue-700 hover:to-blue-800 hover:-translate-y-0.5 focus:ring-blue-500 active:scale-95",
    secondary:
      "bg-gradient-to-r from-slate-200 to-slate-300 text-slate-700 hover:shadow-md hover:from-slate-300 hover:to-slate-400 focus:ring-slate-400 active:scale-95",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:shadow-lg hover:from-red-600 hover:to-red-700 hover:-translate-y-0.5 focus:ring-red-500 active:scale-95",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${
        disabled ? "opacity-50 cursor-not-allowed hover:shadow-none hover:-translate-y-0" : ""
      } ${className}`}
    >
      {children}
    </button>
  );
}