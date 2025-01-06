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
      <div className="p-6 h-screen bg-gray-100">
        <p className="text-lg font-bold">All Creators</p>
        <Link to="/creator-signup" className="text-blue-500 underline">
          Add New
        </Link>
        <div className="mt-4">
          {loading ? (
            <p>Loading creators...</p>
          ) : creators?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {creators?.map((creator) => (
                <div
                  key={creator?.id}
                  className="p-4 bg-white shadow-md rounded-lg"
                >
                  <p className="text-sm font-semibold">{creator?.username}</p>
                  <p className="text-sm text-gray-500">{creator?.id}</p>
                  <Button
                    size="sm"
                    className="mt-2"
                    color="danger"
                    onPress={() => handleDeleteUser(creator?.id)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p>No creators found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
