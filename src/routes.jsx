import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/home";
import LoginPage from "./views/home/Auth/Login";
import Dashboard from "./views/home/dashboard/Dashboard";
import UploadVideo from "./views/home/dashboard/UploadVideo";
import Logout from "./views/home/Auth/Logout";
import SignUp from "./views/home/Auth/Signup";
import PrivateRouting from "./utils/privateRouting";
import SignUpForCreator from "./views/home/Auth/SignupForCreator";
import AdminDashboard from "./views/home/dashboard/AdminDashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRouting>
              <HomePage />
            </PrivateRouting>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/creator-signup"
          element={
            <PrivateRouting>
              <SignUpForCreator />
            </PrivateRouting>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRouting>
              <Dashboard />
            </PrivateRouting>
          }
        />
        <Route
          path="/dashboard/upload"
          element={
            <PrivateRouting>
              <UploadVideo />
            </PrivateRouting>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <PrivateRouting>
              <AdminDashboard />
            </PrivateRouting>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
