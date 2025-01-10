import { Button } from "@nextui-org/react";
import React, { useState } from "react";
import Layout from "../../components/mainComponents/Layout";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import TikTokScroll from "../../components/mainComponents/TiktokScroll";
import video from "../../assets/demo2.mp4";
import {
  Carousel,
  CarouselItem,
} from "../../components/mainComponents/Carousel";
import VideoFeed from "../../components/mainComponents/VideoFeed";
import { VIDEOS } from "../../utils/data";
import { useAuth } from "../../context/AuthContext";
import TikScroll from "../../components/mainComponents/TikScroll";
const items = Array.from({ length: 20 }).map((_, i) => ({
  id: i,
  src: `https://picsum.photos/500?idx=${i}`,
}));
const HomePage = () => {
  const { user } = useAuth();
  console.log(user, "ususu");
  return (
    <Layout>
      {/* <VideoFeed videos={VIDEOS} /> */}
      {/* homepage where videos will be shown in tiktok style in grid 1
        and in grid two, there will be a list of all comments and likes */}
      <div className="bg-gray-400 shadow-md max-w-[95%] mx-auto md:h-[87vh] h-full rounded-lg">
        <TikTokScroll />
        {/* <TikScroll /> */}
      </div>
    </Layout>
  );
};

export default HomePage;
