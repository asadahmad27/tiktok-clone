import React from "react";
import Layout from "../../../components/mainComponents/Layout";

const Dashboard = () => {
  return (
    <Layout>
      <div className="bg-white shadow-md max-w-[95%] mx-auto h-[85vh] rounded-lg">
        <div className="flex items-center border-b border-gray-400 ">
          <p className="w-full text-center p-4">All Videos</p>
          <p className="w-full text-center border-l border-gray-400 p-4">
            Upload New Video
          </p>
        </div>

        <div className=""></div>
      </div>
    </Layout>
  );
};

export default Dashboard;
