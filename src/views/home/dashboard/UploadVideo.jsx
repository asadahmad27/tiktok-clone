import React from "react";
import Layout from "../../../components/mainComponents/Layout";
import { VIDEOS } from "../../../utils/data";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import VideoUploadForm from "../../../components/mainComponents/VideoUplaodForm";

const UploadVideo = () => {
  return (
    <Layout>
      <div className="bg-gray-900 min-h-[85vh] mx-auto rounded-lg overflow-hidden">
        <div className="flex items-center border-b border-gray-700">
          <Link to="/dashboard" className="w-full">
            <p className="w-full text-center p-4 text-white bg-gray-800 hover:bg-gray-700 transition-colors">
              All Videos
            </p>
          </Link>
          <Link to="/upload" className="w-full">
            <p className="w-full text-center border-l border-gray-700 p-4 bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              Upload New Video
            </p>
          </Link>
        </div>

        <div className="pb-16 overflow-scroll h-[80vh] bg-gray-900">
          <VideoUploadForm />
        </div>
      </div>
    </Layout>
  );
};

export default UploadVideo;
