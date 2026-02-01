import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true, // ✅ YEH ADD KIYA - BAHUT IMPORTANT
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor - Add token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response Interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);

    // Handle 401 Unauthorized
    if (
      error.response?.status === 401 &&
      !window.location.pathname.includes("/login")
    ) {
      console.log('Token expired or invalid, redirecting to login...');
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

// Auth APIs
export const adminLogin = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    if (response.data?.token) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("admin", JSON.stringify(response.data.admin));
      console.log('Login successful, token saved');
    }

    return response;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    throw error;
  }
};

export const getAdminData = async () => {
  try {
    return await api.get("/auth/profile");
  } catch (error) {
    console.error('Failed to fetch admin data:', error.response?.data || error.message);
    throw error;
  }
};

// Form APIs
export const createForm = async (formData) => {
  try {
    return await api.post("/forms", formData);
  } catch (error) {
    console.error('Failed to create form:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllForms = async () => {
  try {
    return await api.get("/forms/admin/my-forms");
  } catch (error) {
    console.error('Failed to fetch forms:', error.response?.data || error.message);
    throw error;
  }
};

export const getAllAvailableForms = async () => {
  try {
    return await api.get("/forms/public/available");
  } catch (error) {
    console.error('Failed to fetch available forms:', error.response?.data || error.message);
    throw error;
  }
};

export const getFormById = async (id) => {
  try {
    return await api.get(`/forms/${id}`);
  } catch (error) {
    console.error('Failed to fetch form:', error.response?.data || error.message);
    throw error;
  }
};

export const updateForm = async (id, formData) => {
  try {
    return await api.put(`/forms/${id}`, formData);
  } catch (error) {
    console.error('Failed to update form:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteForm = async (id) => {
  try {
    return await api.delete(`/forms/${id}`);
  } catch (error) {
    console.error('Failed to delete form:', error.response?.data || error.message);
    throw error;
  }
};

// Response APIs
export const submitFormResponse = async (responseData) => {
  try {
    const isFormData = responseData instanceof FormData;

    const config = isFormData
      ? { headers: { "Content-Type": "multipart/form-data" } }
      : {};

    return await api.post("/responses", responseData, config);
  } catch (error) {
    console.error('Failed to submit response:', error.response?.data || error.message);
    throw error;
  }
};

export const getFormResponses = async (formId) => {
  try {
    return await api.get(`/responses/${formId}`);
  } catch (error) {
    console.error('Failed to fetch responses:', error.response?.data || error.message);
    throw error;
  }
};

export const getResponseCount = async (formId) => {
  try {
    return await api.get(`/responses/count/${formId}`);
  } catch (error) {
    console.error('Failed to fetch response count:', error.response?.data || error.message);
    throw error;
  }
};

export default api;