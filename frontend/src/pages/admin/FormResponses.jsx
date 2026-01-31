import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFormResponses, getFormById } from "../../services/api";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

export default function FormResponses() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedResponse, setExpandedResponse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");
      const [formRes, responsesRes] = await Promise.all([
        getFormById(id),
        getFormResponses(id),
      ]);
      setForm(formRes.data?.form || formRes.data);
      const responsesData = responsesRes.data?.responses || responsesRes.data?.data || [];
      setResponses(Array.isArray(responsesData) ? responsesData : []);
    } catch (error) {
      setError(error.message || "Error loading responses");
      console.error("Error loading data", error);
    } finally {
      setLoading(false);
    }
  };

  // Get field label - now answers are stored with labels as keys
  const getFieldLabel = (fieldKey) => {
    // If the key is already a label, return it
    if (!form?.fields) return fieldKey;
    
    // Check if it's a field label
    const field = form.fields.find((f) => f.label === fieldKey);
    return field?.label || fieldKey;
  };

  const toggleResponse = (index) => {
    setExpandedResponse(expandedResponse === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="p-2 hover:bg-blue-100 rounded-lg transition-all duration-300 cursor-pointer text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={24} />
          </button>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              {form?.title}
            </h2>
            <p className="text-slate-500 mt-1">Total Responses: {responses.length}</p>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg backdrop-blur-sm shadow-md">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-slate-500">Loading responses...</p>
        ) : responses.length === 0 ? (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-white/50">
            <p className="text-slate-500 text-lg">No responses yet</p>
          </div>
        ) : (
          <div className="space-y-4">
          {responses.map((response, index) => (
            <div
              key={response._id || index}
              className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-0.5 transition-all duration-300 border border-white/50 cursor-pointer group"
            >
              {/* Response Header */}
              <button
                onClick={() => toggleResponse(index)}
                className="w-full p-6 flex items-center justify-between hover:bg-white/60 transition-colors text-left"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-slate-900">
                    {response.userName}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    ID: {response.userId}
                  </p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">
                    {new Date(response.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                  {expandedResponse === index ? (
                    <ChevronUp size={28} />
                  ) : (
                    <ChevronDown size={28} />
                  )}
                </div>
              </button>

              {/* Response Details */}
              {expandedResponse === index && (
                <div className="border-t px-6 py-6 bg-gradient-to-b from-white to-slate-50 space-y-4">
                  {(() => {
                    // Parse answers if it's a string
                    let answersData = response.answers;
                    if (typeof answersData === "string") {
                      try {
                        answersData = JSON.parse(answersData);
                      } catch (e) {
                        console.error("Error parsing answers:", e);
                        answersData = {};
                      }
                    }

                    return answersData && Object.keys(answersData).length > 0 ? (
                      <>
                        {Object.entries(answersData).map(([key, answer], idx) => {
                          // Skip empty answers and null values
                          if (answer === null || answer === undefined || answer === "") {
                            return null;
                          }
                          
                          // Get field label from form fields
                          const field = form?.fields?.find(f => f.label === key);
                          const displayLabel = field?.label || key;
                          
                          return (
                            <div key={idx} className="flex items-start gap-3 pb-4 border-b border-slate-200 last:border-b-0 hover:bg-white/50 px-3 py-2 rounded-lg transition-colors">
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-slate-700">
                                  {displayLabel}
                                </p>
                                <p className="text-base text-slate-800 mt-2 break-words">
                                  {Array.isArray(answer) ? answer.join(", ") : String(answer)}
                                </p>
                              </div>
                            </div>
                          );
                        })}

                        {/* Files Section */}
                        {response.files && response.files.length > 0 && (
                          <div className="mt-6 pt-6 border-t border-slate-200">
                            <p className="text-sm font-semibold text-slate-700 mb-4">
                              📎 Uploaded Files
                            </p>
                            <div className="space-y-3">
                              {response.files.map((file, fileIdx) => (
                                <div key={fileIdx} className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-transparent rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                                  <div>
                                    <p className="text-sm font-medium text-slate-900">
                                      {file.fieldLabel}
                                    </p>
                                    <p className="text-xs text-slate-600 mt-1">
                                      {file.originalFileName} ({(file.fileSize / 1024).toFixed(2)} KB)
                                    </p>
                                  </div>
                                  <a
                                    href={`http://localhost:5000/${file.fileName}`}
                                    download={file.originalFileName}
                                    className="px-4 py-2 text-sm bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium cursor-pointer hover:from-blue-700 hover:to-blue-800"
                                  >
                                    Download
                                  </a>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <p className="text-slate-500">No answers provided</p>
                    );
                  })()}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}