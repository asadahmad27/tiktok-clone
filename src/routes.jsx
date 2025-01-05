import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/home";
import LoginPage from "./views/home/Auth/Login";
import Dashboard from "./views/home/dashboard/Dashboard";
import UploadVideo from "./views/home/dashboard/UploadVideo";
import { AuthProvider } from "./views/home/Auth/AuthContext";
import ProtectedRoute from "./views/home/Auth/ProtectedRoute";
import Logout from "./views/home/Auth/Logout";
import SignUp from "./views/home/Auth/Signup";

const AppRoutes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/upload" element={<UploadVideo />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default AppRoutes;
