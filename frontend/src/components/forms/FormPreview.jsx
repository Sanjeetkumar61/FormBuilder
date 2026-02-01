import FormField from "./FormField";

export default function FormPreview({ title, fields }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-white/20">
     
      <h3 className="text-lg font-bold mb-6 text-slate-800 flex items-center gap-2">
         Live Preview
      </h3>

      
      {title && (
        <h2 className="text-2xl font-bold mb-8 text-center text-slate-900 pb-6 border-b-2 border-gradient-to-r from-blue-400 to-purple-400">
          {title}
        </h2>
      )}

    
      <div className="space-y-6">
        {fields.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-12 font-medium">
            ✨ Add fields to see preview
          </p>
        ) : (
          fields.map((field) => (
            <FormField
              key={field.id}
              field={field}
              mode="admin"
            />
          ))
        )}
      </div>
    </div>
  );
}