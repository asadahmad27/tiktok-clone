// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react";
// import { VIDEOS } from "../../utils/data";
// import video2 from "../../assets/demo2.mp4";
// // import { SnapCarousel, SnapItem } from "react-snap-carousel";

// export default function TikTokScroll() {
//   const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
//   const [liked, setLiked] = useState({});
//   const [isPlaying, setIsPlaying] = useState({});
//   const videoRefs = useRef([]);

//   useEffect(() => {
//     console.log(videoRefs.current);
//     if (!videoRefs.current.length) return; // Ensure videoRefs are populated

//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.8, // Trigger when 80% of the video is visible
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         const video = entry.target;
//         const index = Number(video.dataset.index);
//         console.log(`Video ${index} is intersecting: ${entry.isIntersecting}`);

//         if (entry.isIntersecting) {
//           console.log(`Video ${index} is intersecting`);
//           setCurrentVideoIndex(index); // Update the current video index
//           handlePlay(index); // Play the video
//         } else {
//           handlePause(index); // Pause the video
//         }
//       });
//     }, options);

//     // Observe each video element
//     videoRefs.current.forEach((videoRef) => {
//       if (videoRef) observer.observe(videoRef);
//     });

//     return () => {
//       // Cleanup observer
//       videoRefs.current.forEach((videoRef) => {
//         if (videoRef) observer.unobserve(videoRef);
//       });
//     };
//   }, [videoRefs]);

//   const handleLike = (videoId) => {
//     setLiked((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
//   };

//   const handlePlay = (videoId) => {
//     console.log(videoRefs.current, "hnsdepla");
//     const video = videoRefs.current[Videos.findIndex((v) => v.id === videoId)];
//     if (video) {
//       video.play();
//       setIsPlaying((prev) => ({ ...prev, [videoId]: true }));
//     }
//   };

//   const handlePause = (videoId) => {
//     const video = videoRefs.current[VIDEOS.findIndex((v) => v.id === videoId)];
//     if (video) {
//       video.pause();
//       setIsPlaying((prev) => ({ ...prev, [videoId]: false }));
//     }
//   };

//   const togglePlayPause = (videoId) => {
//     if (isPlaying[videoId]) {
//       handlePause(videoId);
//     } else {
//       handlePlay(videoId);
//     }
//   };

//   const VideoPlayer = ({ video, index }) => (
//     <div className="snap-start w-full h-screen flex items-center justify-center bg-black">
//       <div className="relative w-[340px] h-screen">
//         <video
//           ref={(el) => (videoRefs.current[index] = el)}
//           className="w-full h-full object-cover rounded-lg"
//           // src={video.videoUrl}
//           loop
//           playsInline
//           // muted
//           data-index={index}
//           // autoPlay={}
//           controls
//         >
//           <source src={video.videoUrl} type="video/mp4" className="w-48 h-48" />
//         </video>
//         <div className="absolute top-[50%] left-[40%] flex items-center justify-center h-6">
//           <button
//             onClick={() => togglePlayPause(video.id)}
//             className="bg-black bg-opacity-50 rounded-full p-4 transition-opacity duration-300 opacity-0 hover:opacity-100"
//           >
//             {isPlaying[video.id] ? (
//               <Pause className="w-8 h-8 text-white" />
//             ) : (
//               <Play className="w-8 h-8 text-white" />
//             )}
//           </button>
//         </div>
//         {/* <div className="absolute bottom-4 left-4 text-white">
//           <h3 className="font-bold">{video.username}</h3>
//           <p className="text-sm">{video.description}</p>
//         </div> */}
//       </div>
//     </div>
//   );

//   return (
//     <div className="flex h-full bg-gray-100">
//       {/* <SnapCarousel
//         itemsToShow={1}
//         itemsToScroll={1}
//         forwardBtnProps={{
//           style: { display: "none" },
//         }}
//         backwardBtnProps={{
//           style: { display: "none" },
//         }}
//         onSnapChange={(index) => setCurrentVideoIndex(index)}
//       >
//         {VIDEOS.map((video, index) => (
//           <SnapItem key={video.id} width="100%" height="100%">
//             <VideoPlayer video={video} index={index} />
//           </SnapItem>
//         ))}
//       </SnapCarousel> */}
//       {/* Video Side */}
//       <div className="w-2/3 bg-black overflow-y-scroll snap-y snap-mandatory">
//         {VIDEOS.map((video, index) => (
//           <VideoPlayer key={video.id} video={video} index={index} />
//         ))}
//       </div>

//       {/* Comments and Likes Side */}
//       <div className="w-1/3 bg-white p-4 overflow-y-auto">
//         <div className="flex flex-col h-full">
//           {/* Interaction Buttons */}
//           <div className="flex justify-end space-x-4 mb-4">
//             <button
//               className="flex flex-col items-center"
//               onClick={() => handleLike(VIDEOS[currentVideoIndex].id)}
//             >
//               <Heart
//                 className={`w-8 h-8 ${
//                   liked[VIDEOS[currentVideoIndex].id]
//                     ? "text-red-500 fill-red-500"
//                     : "text-gray-500"
//                 }`}
//               />
//               <span className="text-xs">{VIDEOS[currentVideoIndex].likes}</span>
//             </button>
//             <button className="flex flex-col items-center">
//               <MessageCircle className="w-8 h-8 text-gray-500" />
//               <span className="text-xs">
//                 {VIDEOS[currentVideoIndex].comments}
//               </span>
//             </button>
//             <button className="flex flex-col items-center">
//               <Share2 className="w-8 h-8 text-gray-500" />
//               <span className="text-xs">
//                 {VIDEOS[currentVideoIndex].shares}
//               </span>
//             </button>
//           </div>

//           {/* Comments Section */}
//           <div className="flex-grow overflow-y-auto">
//             <h2 className="font-bold text-lg mb-4">Comments</h2>
//             {[...Array(10)].map((_, index) => (
//               <div key={index} className="flex items-start space-x-2 mb-4">
//                 <img
//                   src={`https://i.pravatar.cc/40?img=${index}`}
//                   alt="User Avatar"
//                   className="w-8 h-8 rounded-full"
//                 />
//                 <div>
//                   <p className="font-semibold">@user{index + 1}</p>
//                   <p className="text-sm text-gray-600">
//                     This is a sample comment. Great video!
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Comment Input */}
//           <div className="mt-4">
//             <input
//               type="text"
//               placeholder="Add a comment..."
//               className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

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
    setVideos(updated);
    setVideos(updated);
  };

  console.log(videos, "videos");
  // Fetch comments for the current video
  const fetchVideoComments = async (videoId) => {
    if (!videoId) return;
    try {
      setCommentsLoading(true);
      // const videoId = videos?.[currentVideoIndex]?.id;
      const resp = await getVideoComments(videoId);
      console.log(resp, "iioioip");
      setCurrentVideoComments(resp?.data ?? []);
      setCommentsLoading(false);
    } catch (error) {
      console.error("Error fetching comments:", error);
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    getFeedVideo();
  }, []);

  useEffect(() => {
    fetchVideoComments();
  }, [currentVideoIndex]);

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
  useEffect(() => {
    console.log(currentVideoComments, "sss");
  }, [currentVideoComments]);
  console.log(currentVideoComments, "sss");
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
    const { ref, inView } = useInView({
      threshold: 0.9, // Trigger when 90% of the video is visible
      rootMargin: "0px",
    });

    useEffect(() => {
      if (inView) {
        console.log("invieww", index);
        onVisible(); // Notify parent component when video is in view
      }
    }, [inView, onVisible]);

    return (
      <div
        ref={ref}
        className="snap-start w-full h-full flex items-center justify-center bg-black"
      >
        <div className="relative w-[340px] h-full">
          <video
            className="w-full h-full object-cover rounded-lg"
            src={video.file_location}
            loop
            playsInline
            // muted
            autoPlay={isActive}
          />
          <div className="absolute bottom-4 left-4 text-white">
            <h3 className="font-bold">{video?.username}</h3>
            <p className="text-sm">{video?.description}</p>
            <p className="text-sm font-bold">{video?.hashtags}</p>
          </div>
          {/* <div className="video-details">
            <h3>{video.username}</h3>
            <p>{video.description}</p>
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

  console.log(currentVideoIndex, "currentVideoIndex", currentVideoId);
  return (
    <div className="h-full">
      <div className="max-w-[70%] px-12 pt-6">
        <p className="mb-2 font-semibold">Search</p>
        <div className="flex items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search"
            value={searchingQuery}
            className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchingQuery(e.target.value)}
          />
          <Button onClick={serachVideos}>Search</Button>
        </div>
      </div>
      <div className="flex h-[70vh]  bg-gray-100 overflow-scroll">
        <div className="w-2/3 bg-black overflow-y-scroll snap-y snap-mandatory h-[550px]">
          {videos?.length > 0 ? (
            videos?.map((video, index) => (
              <VideoPlayer
                key={video.id}
                video={video}
                index={index}
                onVisible={() => {
                  setCurrentVideoIndex(index);
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
        <div className="w-1/3 bg-white p-4 overflow-y-auto">
          <div className="flex flex-col h-full">
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
                      <p className="text-sm text-gray-600">
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
                className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
