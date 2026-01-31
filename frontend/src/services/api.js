import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
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

export const createForm = async (formData) => {
  return await api.post("/forms", formData);
};

export const getAllForms = async () => {
  return await api.get("/forms/admin/my-forms");
};

export const getAllAvailableForms = async () => {
  return await api.get("/forms/public/available");
};

export const getFormById = async (id) => {
  return await api.get(`/forms/${id}`);
};

export const updateForm = async (id, formData) => {
  return await api.put(`/forms/${id}`, formData);
};

export const deleteForm = async (id) => {
  return await api.delete(`/forms/${id}`);
};

export const submitFormResponse = async (responseData) => {
  const isFormData = responseData instanceof FormData;

  const config = isFormData
    ? { headers: { "Content-Type": "multipart/form-data" } }
    : {};

  return await api.post("/responses", responseData, config);
};

export const getFormResponses = async (formId) => {
  return await api.get(`/responses/${formId}`);
};

export const getResponseCount = async (formId) => {
  return await api.get(`/responses/count/${formId}`);
};

export default api;