import React from "react";
import Layout from "../../../components/mainComponents/Layout";
import { VIDEOS } from "../../../utils/data";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                className="relative bg-white shadow-lg rounded-lg p-4"
              >
                <video className="w-full h-60 object-cover rounded-lg" controls>
                  <source src={video?.videoUrl} type="video/mp4" />
                </video>
                <div className="flex items-center justify-between p-2">
                  <p className="text-sm font-bold">{video.title}</p>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1">
                      <Heart size={16} />
                      <p>{video.likes}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <p>{video.comments}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
