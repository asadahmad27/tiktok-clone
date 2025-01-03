import React from "react";
import Layout from "../../../components/mainComponents/Layout";
import { VIDEOS } from "../../../utils/data";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import VideoUploadForm from "../../../components/mainComponents/VideoUplaodForm";

const UploadVideo = () => {
  return (
    <Layout>
      <div className="bg-white shadow-md max-w-[95%] mx-auto h-[85vh] rounded-lg overflow-hidden">
        <div className="flex items-center border-b border-gray-400 ">
          <p className="w-full text-center p-4 ">All Videos</p>
          <Link to="/upload" className="w-full">
            <p className="w-full text-center border-l border-gray-400 p-4  bg-gray-800 text-white">
              Upload New Video
            </p>
          </Link>
        </div>

        <div className="pb-16 overflow-scroll h-[80vh]">
          <VideoUploadForm />
        </div>
      </div>
    </Layout>
  );
};

export default UploadVideo;
