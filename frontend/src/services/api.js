import axios from "axios";

/* =========================
   BASE URL
========================= */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://formbuilder-backend-v4n0.onrender.com/api";

/* =========================
   AXIOS INSTANCE
========================= */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // ❌ withCredentials REMOVED (VERY IMPORTANT)
});

/* =========================
   REQUEST INTERCEPTOR
========================= */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

/* =========================
   AUTH APIs
========================= */
export const adminLogin = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });

  if (response.data?.token) {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("admin", JSON.stringify(response.data.admin));
  }

  return response;
};

export const getAdminData = async () => {
  return await api.get("/auth/profile");
};

/* =========================
   FORM APIs
========================= */
export const createForm = (formData) => api.post("/forms", formData);

export const getAllForms = () => api.get("/forms/admin/my-forms");

export const getAllAvailableForms = () =>
  api.get("/forms/public/available");

export const getFormById = (id) => api.get(`/forms/${id}`);

export const updateForm = (id, formData) =>
  api.put(`/forms/${id}`, formData);

export const deleteForm = (id) =>
  api.delete(`/forms/${id}`);

/* =========================
   RESPONSE APIs
========================= */
export const submitFormResponse = (responseData) => {
  const isFormData = responseData instanceof FormData;

  return api.post("/responses", responseData, {
    headers: isFormData
      ? { "Content-Type": "multipart/form-data" }
      : {},
  });
};

export const getFormResponses = (formId) =>
  api.get(`/responses/${formId}`);

export const getResponseCount = (formId) =>
  api.get(`/responses/count/${formId}`);

export default api;