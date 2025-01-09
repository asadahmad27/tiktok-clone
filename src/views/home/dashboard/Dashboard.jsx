import React, { useEffect, useState } from "react";
import Layout from "../../../components/mainComponents/Layout";
import { VIDEOS } from "../../../utils/data";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { deleteVideoAPI, getAllVideos } from "../../../utils/apiServices";
import { useAuth } from "../../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  console.log(user, "0-0-0-0-");
  const [videos, setVideos] = useState([]);
  const getVideos = async () => {
    try {
      const response = await getAllVideos(user?._id ?? user?.id);
      setVideos(response?.data);
    } catch (e) {
      return null;
    }
  };

  const deleteVideo = async (videoId) => {
    try {
      const response = await deleteVideoAPI(videoId);
      if (response) {
        alert("Video deleted successfully!");
        // Remove the deleted video from the local state
        setVideos(videos.filter((video) => video.id !== videoId));
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
    }
  };

  const handleDeleteClick = (videoId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this video?"
    );
    if (confirmDelete) {
      deleteVideo(videoId);
    }
  };

  useEffect(() => {
    if (user?._id || user?.id) {
      console.log("insidddee");
      getVideos();
    }
  }, [user]);

  return (
    <Layout>
      <div className="bg-gray-900 min-h-[85vh] mx-auto rounded-lg overflow-hidden">
        <div className="flex items-center border-b border-gray-700">
          <p className="w-full text-center p-4 bg-gray-800 text-white">
            All Videos
          </p>
          <Link to="/dashboard/upload" className="w-full">
            <p className="w-full text-center border-l border-gray-700 p-4 text-white bg-gray-800 hover:bg-gray-700 transition-colors">
              Upload New Video
            </p>
          </Link>
        </div>

        <div className="bg-gray-900">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-scroll pb-16 py-4 h-[80vh]">
            {videos?.length > 0 ? (
              videos?.map((video) => (
                <div
                  key={video.id}
                  className="relative bg-gray-800 shadow-xl rounded-lg p-4"
                >
                  <video
                    className="w-full h-80 object-cover rounded-lg"
                    controls
                  >
                    <source src={video?.url} type="video/mp4" />
                  </video>
                  <div className="p-2 text-white">
                    <p className="text-md mb-4 font-bold">
                      {video?.title ?? "No Name"}
                      <span className="text-xs ml-4 text-gray-400">
                        {video?.hashtags}
                      </span>
                    </p>
                    <p className="text-gray-400">
                      {new Date(video?.upload_date).toLocaleDateString()}
                    </p>
                    <div className="flex justify-between gap-4 mt-4">
                      <div>
                        <p
                          className="text-red-400 hover:text-red-300 underline cursor-pointer transition-colors"
                          onClick={() => handleDeleteClick(video.id)}
                        >
                          Delete
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400">
                No videos found
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
