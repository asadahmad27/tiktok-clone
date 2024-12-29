import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./views/home";
import LoginPage from "./views/home/Auth/Login";
import Dashboard from "./views/home/dashboard/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
