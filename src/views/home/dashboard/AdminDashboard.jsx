import React, { useEffect, useState } from "react";
import Layout from "../../../components/mainComponents/Layout";
import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import { deleteCreator, getAllCreators } from "../../../utils/apiServices";

const AdminDashboard = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCreators = async () => {
    try {
      // Fetch all creators
      const res = await getAllCreators();
      console.log(res, "Resssss");
      setCreators(res ?? []); // Assuming the API response contains a `data` property
    } catch (error) {
      console.error("Error fetching creators:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user? This action cannot be undone."
    );
    if (!confirm) return;

    try {
      const res = await deleteCreator(userId); // Call deleteUser API
      if (!res) {
        alert("Failed to delete user. Please try again.");
        return;
      }
      setCreators(creators.filter((creator) => creator.id !== userId)); // Update UI
      alert("User deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    }
  };

  useEffect(() => {
    getCreators();
  }, []);

  return (
    <Layout>
      <div className="p-6 min-h-screen bg-gray-900">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-white">All Creators</h1>
          <Link 
            to="/creator-signup" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Add New Creator
          </Link>
        </div>
        
        <div className="mt-4">
          {loading ? (
            <p className="text-gray-400">Loading creators...</p>
          ) : creators?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators?.map((creator) => (
                <div
                  key={creator?.id}
                  className="p-6 bg-gray-800 shadow-xl rounded-lg border border-gray-700"
                >
                  <p className="text-lg font-semibold text-white mb-2">{creator?.username}</p>
                  <p className="text-sm text-gray-400 mb-4">{creator?.id}</p>
                  <Button
                    size="sm"
                    className="bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                    onPress={() => handleDeleteUser(creator?.id)}
                  >
                    Delete Creator
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-400">No creators found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
