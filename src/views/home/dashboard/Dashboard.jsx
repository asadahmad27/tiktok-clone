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
      <div className="bg-white shadow-md max-w-[95%] mx-auto h-[85vh] rounded-lg overflow-hidden">
        <div className="flex items-center border-b border-gray-400 ">
          <p className="w-full text-center p-4 bg-gray-800 text-white">
            All Videos
          </p>
          <Link to="/dashboard/upload" className="w-full">
            <p className="w-full text-center border-l border-gray-400 p-4">
              Upload New Video
            </p>
          </Link>
        </div>

        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-scroll pb-16 py-4 h-[80vh]">
            {videos?.length > 0 ? (
              videos?.map((video) => (
                <div
                  key={video.id}
                  className="relative bg-white shadow-lg rounded-lg p-4"
                >
                  <video
                    className="w-full h-80 object-cover rounded-lg"
                    controls
                  >
                    <source src={video?.file_location} type="video/mp4" />
                  </video>
                  <div className=" p-2">
                    <p className="text-md mb-4 font-bold">
                      {video?.title ?? "No Name"}
                      <span className="text-xs ml-4">{video?.hashtags}</span>
                    </p>
                    <p>{new Date(video?.upload_date).toLocaleDateString()}</p>
                    <div className="flex justify-between gap-4 mt-4">
                      <div>
                        <p
                          className="text-red-500 underline cursor-pointer"
                          onClick={() => handleDeleteClick(video.id)}
                        >
                          {" "}
                          Delete
                        </p>
                      </div>
                      {/* <div className="flex items-center gap-1">
                      <Heart size={16} />
                      <p>{video.likes}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <p>{video.comments}</p>
                    </div> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No videos found</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
