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
//     const video = videoRefs.current[Videos.findIndex((v) => v?.id === videoId)];
//     if (video) {
//       video.play();
//       setIsPlaying((prev) => ({ ...prev, [videoId]: true }));
//     }
//   };

//   const handlePause = (videoId) => {
//     const video = videoRefs.current[VIDEOS.findIndex((v) => v?.id === videoId)];
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
//             onClick={() => togglePlayPause(video?.id)}
//             className="bg-black bg-opacity-50 rounded-full p-4 transition-opacity duration-300 opacity-0 hover:opacity-100"
//           >
//             {isPlaying[video?.id] ? (
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
//         {VIDEOS?.map((video, index) => (
//           <SnapItem key={video?.id} width="100%" height="100%">
//             <VideoPlayer video={video} index={index} />
//           </SnapItem>
//         ))}
//       </SnapCarousel> */}
//       {/* Video Side */}
//       <div className="w-2/3 bg-black overflow-y-scroll snap-y snap-mandatory">
//         {VIDEOS?.map((video, index) => (
//           <VideoPlayer key={video?.id} video={video} index={index} />
//         ))}
//       </div>

//       {/* Comments and Likes Side */}
//       <div className="w-1/3 bg-white p-4 overflow-y-auto">
//         <div className="flex flex-col h-full">
//           {/* Interaction Buttons */}
//           <div className="flex justify-end space-x-4 mb-4">
//             <button
//               className="flex flex-col items-center"
//               onClick={() => handleLike(VIDEOS[currentVideoIndex]?.id)}
//             >
//               <Heart
//                 className={`w-8 h-8 ${
//                   liked[VIDEOS[currentVideoIndex]?.id]
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
//             {[...Array(10)]?.map((_, index) => (
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

import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2, Play, Pause } from "lucide-react";
import { videos } from "./data";
import { getVideosForFeed, searchVideosByQuery } from "../../utils/apiServices";
import { Button } from "@nextui-org/react";

export default function TikTokScroll() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [liked, setLiked] = useState({});
  const [isPlaying, setIsPlaying] = useState({});
  const [videos, setVideos] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const videoRefs = useRef([]);

  const getFeedVideo = async () => {
    const resp = await getVideosForFeed();
    console.log(resp);
    setVideos(resp?.data);
  };

  // Fetch comments for the current video
  const fetchVideoComments = async (videoId) => {
    try {
      const resp = await fetchComments(videoId);
      setComments(resp?.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Handle video search
  const handleSearch = async () => {
    try {
      const res = await searchVideosByQuery(searchQuery);
      setVideos(res?.data || []);
    } catch (error) {
      console.error("Error searching videos:", error);
    }
  };

  // Handle liking a video
  const handleLike = async (videoId) => {
    try {
      const isLiked = liked[videoId];
      const resp = await likeVideo(videoId, !isLiked);
      if (resp?.status === 200) {
        setLiked((prev) => ({ ...prev, [videoId]: !prev[videoId] }));
        setVideos((prev) =>
          prev?.map((video) =>
            video?.id === videoId
              ? { ...video, likes: video?.likes + (isLiked ? -1 : 1) }
              : video
          )
        );
      }
    } catch (error) {
      console.error("Error liking video:", error);
    }
  };

  // Handle adding a comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const videoId = videos[currentVideoIndex]?.id;
      // const resp = await addComment(videoId, newComment);
      // if (resp?.status === 200) {
      //   setComments((prev) => [...prev, resp.data]);
      //   setNewComment("");
      // }
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  useEffect(() => {
    getFeedVideo();
  }, []);

  const serachVideos = async () => {
    const res = await searchVideosByQuery();
    console.log(res);
  };

  useEffect(() => {
    //   // if (videoRefs.current.length === videos.length) {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.9,
    };

    const observer = new IntersectionObserver((entries) => {
      console.log("here");
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((videoRef) => {
      if (videoRef) observer.observe(videoRef);
    });

    return () => {
      videoRefs.current.forEach((videoRef) => {
        if (videoRef) observer.unobserve(videoRef);
      });
    };
    // }
  }, []);

  const handlePlay = (videoId) => {
    console.log("here");
    const video = videoRefs.current[videos.findIndex((v) => v?.id === videoId)];
    if (video) {
      video.play();
      setIsPlaying((prev) => ({ ...prev, [videoId]: true }));
    }
  };

  const handlePause = (videoId) => {
    const video = videoRefs.current[videos.findIndex((v) => v?.id === videoId)];
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

  const VideoPlayer = ({ video, index }) => (
    <div className="snap-start w-full h-full flex items-center justify-center bg-black">
      <div className="relative w-[340px] h-full">
        <video
          ref={(el) => (videoRefs.current[index] = el)}
          className="w-full h-full object-cover rounded-lg"
          src={video.videoUrl}
          loop
          playsInline
          muted
          data-index={index}
        />
        {/* <div className="absolute top-[50%] left-[40%] flex items-center justify-center">
          <button
            onClick={() => togglePlayPause(video?.id)}
            className="bg-black bg-opacity-50 rounded-full p-4 transition-opacity duration-300 opacity-0 hover:opacity-100"
          >
            {isPlaying[video?.id] ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white" />
            )}
          </button>
        </div> */}
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold">{video.username}</h3>
          <p className="text-sm">{video.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="max-w-[70%] px-12 pt-6">
        <p className="mb-2 font-semibold">Search</p>
        <div className="flex items-center mb-8 gap-4">
          <input
            type="text"
            placeholder="Search"
            className=" w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button>Search</Button>
        </div>
      </div>

      <div className="flex h-[85vh] bg-gray-100 border border-gray-400">
        {/* Video Side */}
        {/* <VideoFeed /> */}
        {/* <div className="video-feed">
       {videos?.map((video, index) => (
         <div
           key={video?.id}
           style={{ margin: "20px 0" }}
           className="bg-red-500 video-card"
         >
           <video
             ref={(el) => (videoRefs.current[index] = el)}
             src={video.videoUrl}
             controls={false}
             loop
             style={{ width: "100%", height: "auto" }}
             muted // Ensure videos start muted
           >
             <source src={video.videoUrl} type="video/mp4" />
           </video>
         </div>
       ))}
     </div> */}
        <div className="w-2/3 bg-black overflow-y-scroll snap-y snap-mandatory">
          {videos?.map((video, index) => (
            <VideoPlayer key={video?.id} video={video} index={index} />
          ))}
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
              <button className="flex flex-col items-center">
                <MessageCircle className="w-8 h-8 text-gray-500" />
                <span className="text-xs">
                  {videos?.[currentVideoIndex]?.comments}
                </span>
              </button>
              <button className="flex flex-col items-center">
                <Share2 className="w-8 h-8 text-gray-500" />
                <span className="text-xs">
                  {videos?.[currentVideoIndex]?.shares}
                </span>
              </button>
            </div>

            {/* Comments Section */}
            <div className="flex-grow overflow-y-auto">
              <h2 className="font-bold text-lg mb-4">Comments</h2>
              {[...Array(10)]?.map((_, index) => (
                <div key={index} className="flex items-start space-x-2 mb-4">
                  <img
                    src={`https://i.pravatar.cc/40?img=${index}`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold">@user{index + 1}</p>
                    <p className="text-sm text-gray-600">
                      This is a sample comment. Great video!
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Add a comment..."
                className="w-full p-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
