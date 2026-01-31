import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "../pages/auth/AdminLogin";
import Dashboard from "../pages/admin/Dashboard";
import CreateForm from "../pages/admin/CreateForm";
import EditForm from "../pages/admin/EditForm";
import FormResponses from "../pages/admin/FormResponses";
import UserFormFill from "../pages/user/UserFormFill";
import UserDashboard from "../pages/user/UserDashboard";
import AdminLayout from "../components/layout/AdminLayout";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Dashboard />} />
          <Route path="/create-form" element={<CreateForm />} />
          <Route path="/edit-form/:id" element={<EditForm />} />
          <Route path="/responses/:id" element={<FormResponses />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
        </Route>

        {/* Public form access */}
        <Route path="/form/:id" element={<UserFormFill />} />

        {/* Redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}