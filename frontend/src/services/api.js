import axios from "axios";

// Create axios instance with base URL
const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add JWT token to requests if it exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses and errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - clear storage and redirect to login
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


/* =======================
   AUTH (ADMIN)
======================= */

// Admin login
export const adminLogin = async (email, password) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Admin register
export const adminRegister = async (name, email, password) => {
  try {
    const response = await api.post("/auth/register", { name, email, password });
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get admin profile
export const getAdminData = async () => {
  try {
    const response = await api.get("/auth/profile");
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/* =======================
   FORMS (ADMIN)
======================= */

// Create new form
export const createForm = async (formData) => {
  try {
    const response = await api.post("/forms", formData);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get admin's forms only (admin dashboard)
export const getAllForms = async () => {
  try {
    const response = await api.get("/forms/admin/my-forms");
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all available forms for users (public - no auth required)
export const getAllAvailableForms = async () => {
  try {
    const response = await api.get("/forms/public/available");
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single form by id (public access)
export const getFormById = async (id) => {
  try {
    const response = await api.get(`/forms/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update form
export const updateForm = async (id, formData) => {
  try {
    const response = await api.put(`/forms/${id}`, formData);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Delete form
export const deleteForm = async (id) => {
  try {
    const response = await api.delete(`/forms/${id}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

/* =======================
   RESPONSES
======================= */

// Submit form response (user)
export const submitFormResponse = async (responseData) => {
  try {
    // Check if responseData is FormData (has files)
    const isFormData = responseData instanceof FormData;

    const config = isFormData
      ? {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
      : {};

    const response = await api.post("/responses", responseData, config);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get responses of a form (admin)
export const getFormResponses = async (formId) => {
  try {
    const response = await api.get(`/responses/${formId}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get response count
export const getResponseCount = async (formId) => {
  try {
    const response = await api.get(`/responses/count/${formId}`);
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export default api;