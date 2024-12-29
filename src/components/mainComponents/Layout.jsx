import React from "react";
import TNavbar from "./TNavbar";

const Layout = ({ children }) => {
  return (
    <div>
      <TNavbar />
      <div className="p-4 bg-gray-300 h-screen rounded-lg">{children}</div>
    </div>
  );
};

export default Layout;
