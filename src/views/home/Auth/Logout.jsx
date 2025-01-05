import React from "react";
import { useAuth } from "../../../context/AuthContext";

const Logout = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Welcome, {user?.name || "User"}!</h1>
      <button
        onClick={logout}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
