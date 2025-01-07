// "use client";

import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react";
// import { videos } from "./data";
import {
  addVideoComment,
  getVideoComments,
  getVideosForFeed,
  searchVideosByQuery,
} from "../../utils/apiServices";
import { Button, Spinner } from "@nextui-org/react";
import { useInView } from "react-intersection-observer";
import { useAuth } from "../../context/AuthContext";

export default function TikTokScroll() {
  const { user } = useAuth();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentVideoId, setCurrentVideoId] = useState(-1);
  const [liked, setLiked] = useState({});
  const [currentVideoComments, setCurrentVideoComments] = useState([]);
  const [isPlaying, setIsPlaying] = useState({});
  const [videos, setVideos] = useState([]);
  const [likes, setLikes] = useState({});
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [searchingQuery, setSearchingQuery] = useState("");
  const videoRefs = useRef([]);

  const getFeedVideo = async () => {
    const resp = await getVideosForFeed();
    console.log(resp);

    const updated = resp?.data;
    setVideos(updated ?? []);
    // setVideos([]);
  };

  console.log(videos, "videos");
  // Fetch comments for the current video
  const fetchVideoComments = async (videoId) => {
    if (!videoId || videoId < 0) return;
    try {
      setCommentsLoading(true);
      // const videoId = videos?.[currentVideoIndex]?.id;
      const resp = await getVideoComments(videoId);
      console.log(resp, "iioioip");
      setCurrentVideoComments(resp?.data ?? []);
      // setCurrentVideoComments([]);
      setCommentsLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    getFeedVideo();
  }, []);
  useEffect(() => {}, [videos]);

  // useEffect(() => {
  //   fetchVideoComments();
  // }, [currentVideoIndex]);

  // useEffect(() => {
  //   //   // if (videoRefs.current.length === videos.length) {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     threshold: 0.9,
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     console.log("here");
  //     entries.forEach((entry) => {
  //       const video = entry.target;
  //       // setCurrentVideoIndex(index);
  //       // const videoId = videos[index]?.id;
  //       // if (videoId !== currentVideoId) {
  //       //   setCurrentVideoId(videoId); // Update current video ID
  //       // }
  //       if (entry.isIntersecting) {
  //         video.play();
  //       } else {
  //         video.pause();
  //       }
  //     });
  //   }, options);

  //   videoRefs.current.forEach((videoRef) => {
  //     if (videoRef) observer.observe(videoRef);
  //   });

  //   return () => {
  //     videoRefs.current.forEach((videoRef) => {
  //       if (videoRef) observer.unobserve(videoRef);
  //     });
  //   };
  //   // }
  // }, [videos]);

  useEffect(() => {
    if (currentVideoId) {
      fetchVideoComments(currentVideoId); // Fetch comments when currentVideoId changes
    }
  }, [currentVideoId]);

  const handleAddComment = async (video_id, commentText) => {
    if (!commentText.trim()) return;

    try {
      console.log(video_id, commentText, "<====");
      const response = await addVideoComment(
        video_id,
        commentText,
        user?._id ?? user?.id
      );
      const newComment = response?.data;

      // Update the state with the new comment
      const cc = [...currentVideoComments];
      cc.push({
        content: newComment?.content,
        user_id: newComment?.user?._id,
        video_id: video_id,
        created_at: newComment?.timestamp,
        user_name: user?.username,
      });
      console.log(cc, "cc");
      setCurrentVideoComments(cc);
    } catch (error) {
      console.error(`Error adding comment for video ${video_id}:`, error);
    }
  };
  // Toggle like for a video
  // const handleToggleLike = (video_id) => {
  //     setLikes((prevLikes) => ({
  //         ...prevLikes,
  //         [video_id]: !prevLikes[video_id],
  //     }));
  // };

  const handleLike = (videoId) => {
    setLiked((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
  };

  const handlePlay = (videoId) => {
    console.log("here", videoId);
    const video = videoRefs.current[videos.findIndex((v) => v.id === videoId)];
    if (video) {
      video.play();
      setIsPlaying((prev) => ({ ...prev, [videoId]: true }));
    }
  };

  const handlePause = (videoId) => {
    const video = videoRefs.current[videos.findIndex((v) => v.id === videoId)];
    if (video) {
      video.pause();
      setIsPlaying((prev) => ({ ...prev, [videoId]: false }));
    }
  };

  const togglePlayPause = (videoId) => {
    if (isPlaying[videoId]) {
      handlePause(videoId);
    } else {
      handlePlay(videoId);
    }
  };

  // const VideoPlayer = ({ video, index }) => (
  // <div className="snap-start w-full h-full flex items-center justify-center bg-black">
  //   <div className="relative w-[340px] h-full">
  //     <video
  //       ref={(el) => (videoRefs.current[index] = el)}
  //       className="w-full h-full object-cover rounded-lg"
  //       // src={video?.file_location}
  //       // src={video?.videoUrl}
  //       loop
  //       playsInline
  //       muted
  //       data-index={index}
  //       id={video?.id}
  //       data-url={video.videoUrl} // Store videoUrl in data attribute
  //     >
  //       <source src={video?.file_location} type="video/mp4" />
  //     </video>
  //     {/* <div className="absolute top-[50%] left-[40%] flex items-center justify-center">
  //       <button
  //         onClick={() => togglePlayPause(video.id)}
  //         className="bg-black bg-opacity-50 rounded-full p-4 transition-opacity duration-300 opacity-0 hover:opacity-100"
  //       >
  //         {isPlaying[video.id] ? (
  //           <Pause className="w-8 h-8 text-white" />
  //         ) : (
  //           <Play className="w-8 h-8 text-white" />
  //         )}
  //       </button>
  //     </div> */}
  // <div className="absolute bottom-4 left-4 text-white">
  //   <h3 className="font-bold">{video?.username}</h3>
  //   <p className="text-sm">{video?.description}</p>
  // </div>
  //   </div>
  // </div>
  // );

  const VideoPlayer = ({ video, index, isActive, onVisible }) => {
    const videoRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);

    const { ref, inView } = useInView({
      threshold: 0.6,
      onChange: (inView) => {
        if (videoRef.current) {
          if (inView) {
            videoRef.current.muted = false;
            videoRef.current.play();
            setIsMuted(false);
          } else {
            videoRef.current.muted = true;
            videoRef.current.pause();
            setIsMuted(true);
          }
        }
      },
    });

    // Optional: Add manual mute toggle
    const toggleMute = (e) => {
      e.stopPropagation();
      if (videoRef.current) {
        const newMutedState = !videoRef.current.muted;
        videoRef.current.muted = newMutedState;
        setIsMuted(newMutedState);
      }
    };

    // const handleVideoClick = () => {
    //   if (videoRef.current) {
    //     if (videoRef.current.paused) {
    //       videoRef.current.play();
    //     } else {
    //       videoRef.current.pause();
    //     }
    //   }
    // };

    useEffect(() => {
      if (inView) {
        console.log("invieww", index);
        onVisible(); // Notify parent component when video is in view
      }
    }, [inView, onVisible]);

    return (
      <div
        ref={ref}
        className="snap-start w-full h-full flex items-center justify-center bg-gray-900"
      >
        <div className="relative w-[340px] h-full">
          <video
            className="w-full h-full object-cover rounded-lg"
            // src={video.file_location}
            loop
            ref={videoRef}
            playsInline
            // muted={false}
            autoPlay={true}
            // onClick={handleVideoClick}
            muted={isMuted}
            // controls
          >
            <source src={video?.url} type="video/mp4" />
          </video>
          <div className="absolute bottom-4 left-4 right-4 p-4 bg-gray-900 bg-opacity-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-white font-semibold truncate">
                  {video?.username}
                </h3>
                <p className="text-gray-300 text-sm truncate">
                  {video?.hastags}
                </p>
                <p className="text-gray-300 text-sm truncate">
                  {video?.description}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <button
                  onClick={() => handleLike(video.id)}
                  className={`p-2 rounded-full ${
                    liked[video.id]
                      ? "bg-red-500 text-white"
                      : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                  }`}
                >
                  <Heart size={20} />
                  <span className="text-xs text-white">{video?.likes}</span>
                </button>
                <button className="p-2 rounded-full bg-gray-800 text-gray-400 hover:bg-gray-700">
                  <MessageCircle size={20} />
                  <span className="text-xs text-white">{video?.comments}</span>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={toggleMute}
            className="absolute bottom-32 left-4 p-2 bg-gray-800 rounded-full text-white"
          >
            {isMuted ? "Unmute" : "Mute"}
          </button>
          {/* <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              onClick={() => togglePlayPause(video.id)}
              className="p-4 rounded-full bg-gray-900 bg-opacity-50 text-white hover:bg-opacity-70 transition-opacity"
            >
              {isPlaying[video.id] ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div> */}
        </div>
      </div>
    );
  };

  const serachVideos = async () => {
    const res = await searchVideosByQuery(searchingQuery);

    setVideos(res?.data);
    setCurrentVideoIndex(-1);
    // setSearchingQuery("");
    setCurrentVideoComments([]);
  };

  useEffect(() => {
    if (searchingQuery === "") {
      getFeedVideo();
    } else {
      serachVideos();
    }
  }, [searchingQuery]);

  return (
    <div className="h-full bg-gray-800 text-white">
      <div className="flex h-[70vh]  bg-gray-100 overflow-scroll">
        <div className="w-2/3 bg-black overflow-y-scroll snap-y snap-mandatory h-[550px]">
          {videos?.length > 0 ? (
            videos?.map((video, index) => (
              <VideoPlayer
                key={video.id}
                video={video}
                index={index}
                onVisible={() => {
                  // setCurrentVideoIndex(index);
                  // fetchVideoComments(video.id);
                  setCurrentVideoId(video.id);
                  console.log(index, "indexx");
                }}
                isActive={currentVideoIndex === index}
              />
            ))
          ) : (
            <p className="text-center text-white">No Videos...</p>
          )}
        </div>

        {/* Comments and Likes Side */}
        <div className="w-1/3 bg-gray-800 p-4 overflow-y-auto text-white">
          <div className="px-12 pt-6">
            <p className="mb-2 font-semibold">Search Video</p>
            <div className="flex items-center mb-8 gap-4">
              <input
                type="text"
                placeholder="Search"
                value={searchingQuery}
                className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onChange={(e) => setSearchingQuery(e.target.value)}
              />
              <Button onClick={serachVideos}>Search</Button>
            </div>
          </div>
          <div className="flex flex-col h-[400px]">
            {/* Interaction Buttons */}
            <div className="flex justify-end space-x-4 mb-4">
              <button
                className="flex flex-col items-center"
                onClick={() => handleLike(videos?.[currentVideoIndex]?.id)}
              >
                <Heart
                  className={`w-8 h-8 ${
                    liked[videos?.[currentVideoIndex]?.id]
                      ? "text-red-500 fill-red-500"
                      : "text-gray-500"
                  }`}
                />
                <span className="text-xs">
                  {videos?.[currentVideoIndex]?.likes}
                </span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="flex-grow overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">Comments</h2>

              {commentsLoading ? (
                <>
                  <Spinner />
                  <p>Loading Comments</p>
                </>
              ) : currentVideoComments?.length > 0 ? (
                currentVideoComments?.map((item, index) => (
                  <div key={index} className="flex items-start space-x-2 mb-4">
                    <img
                      src={`https://i.pravatar.cc/40?img=${index}`}
                      alt="User Avatar"
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p className="font-semibold">@{item?.username}</p>
                      <p className="text-sm text-gray-200">
                        {item?.content ?? "Great Video!"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center">No Comments</p>
              )}
            </div>

            {/* Comment Input */}
            <div className="mt-4 flex items-center gap-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment(
                      videos[currentVideoIndex]?.id,
                      e.target.value
                    );
                    e.target.value = ""; // Clear input field
                  }
                }}
              />
              {/* <Button >Send</Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
