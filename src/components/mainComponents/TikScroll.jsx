"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Button } from "@nextui-org/react";
import {
    addVideoComment,
    getVideoComments,
    getVideosForFeed,
} from "../../utils/apiServices";

export default function TikScroll() {
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const [videos, setVideos] = useState([]);
    const [comments, setComments] = useState({});
    const [likes, setLikes] = useState({});
    const videoRefs = useRef([]);

    // Fetch videos for the feed
    const fetchVideos = async () => {
        try {
            const response = await getVideosForFeed();
            const videosData = response?.data || [];
            setVideos(videosData);

            // Initialize comments and likes state
            const initialComments = {};
            const initialLikes = {};
            videosData.forEach((video) => {
                initialComments[video.id] = [];
                initialLikes[video.id] = video.liked || false; // Assuming `liked` is part of video data
            });
            setComments(initialComments);
            setLikes(initialLikes);
        } catch (error) {
            console.error("Error fetching videos:", error);
        }
    };

    // Fetch comments for a specific video
    const fetchComments = async (video_id) => {
        if (!video_id) return;
        try {
            const response = await getVideoComments(video_id);
            console.log(video_id);
            setComments((prevComments) => ({
                ...prevComments,
                [video_id]: response?.data || [],
            }));
        } catch (error) {
            console.error(`Error fetching comments for video ${video_id}:`, error);
        }
    };

    // Add a comment to a specific video
    const handleAddComment = async (video_id, commentText, user_id = "677b186fc455d46703412483") => {
        if (!commentText.trim()) return;

        try {
            const response = await addVideoComment(video_id, commentText, user_id);
            const newComment = response?.data;

            // Update the state with the new comment
            setComments((prevComments) => ({
                ...prevComments,
                [video_id]: [...(prevComments[video_id] || []), newComment],
            }));
        } catch (error) {
            console.error(`Error adding comment for video ${video_id}:`, error);
        }
    };

    // Toggle like for a video
    const handleToggleLike = (video_id) => {
        setLikes((prevLikes) => ({
            ...prevLikes,
            [video_id]: !prevLikes[video_id],
        }));
    };

    // Intersection Observer for video scrolling
    useEffect(() => {
        const observerOptions = {
            root: null, // Use the viewport as the root
            rootMargin: "0px",
            threshold: 0.7, // Video must be 70% visible to be considered active
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.dataset.index);
                    console.log(`Video ${index} is intersecting`);
                    setCurrentVideoIndex(index);

                    entry.target.play(); // Auto-play the intersecting video
                } else {
                    entry.target.pause(); // Pause videos that are not intersecting
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        videoRefs.current.forEach((videoRef) => {
            if (videoRef) observer.observe(videoRef);
        });

        return () => {
            videoRefs.current.forEach((videoRef) => {
                if (videoRef) observer.unobserve(videoRef);
            });
        };
    }, [videos]);

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        if (videos.length > 0) {
            const currentVideo = videos[currentVideoIndex];
            if (currentVideo) {
                fetchComments(currentVideo.id); // Fetch comments when the current video changes
            }
        }
    }, [currentVideoIndex]);

    const VideoPlayer = ({ video, index }) => (
        <div className="snap-start w-full h-full flex items-center justify-center bg-black">
            <div className="relative w-[340px] h-full">
                <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    className="w-full h-full object-cover rounded-lg"
                    src={video.file_location}
                    loop
                    playsInline
                    muted
                    data-index={index}
                />
                <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold">{video.username}</h3>
                    <p className="text-sm">{video.description}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex h-[80vh] bg-gray-100">
            {/* Video Feed Section */}
            <div className="w-2/3 bg-black overflow-y-scroll snap-y snap-mandatory">
                {videos.map((video, index) => (
                    <VideoPlayer key={video.id} video={video} index={index} />
                ))}
            </div>

            {/* Interaction Section */}
            <div className="w-1/3 bg-white p-4 overflow-y-auto">
                <div className="flex flex-col h-full">
                    {/* Interaction Buttons */}
                    <div className="flex justify-end space-x-4 mb-4">
                        <button
                            className="flex flex-col items-center"
                            onClick={() => handleToggleLike(videos[currentVideoIndex]?.id)}
                        >
                            <Heart
                                className={`w-8 h-8 ${likes[videos[currentVideoIndex]?.id]
                                    ? "text-red-500 fill-red-500"
                                    : "text-gray-500"
                                    }`}
                            />
                            <span className="text-xs">
                                {likes[videos[currentVideoIndex]?.id] ? "Liked" : "Like"}
                            </span>
                        </button>
                        <button className="flex flex-col items-center">
                            <MessageCircle className="w-8 h-8 text-gray-500" />
                            <span className="text-xs">Comment</span>
                        </button>
                        <button className="flex flex-col items-center">
                            <Share2 className="w-8 h-8 text-gray-500" />
                            <span className="text-xs">Share</span>
                        </button>
                    </div>

                    {/* Comments Section */}
                    <div className="flex-grow overflow-y-auto">
                        <h2 className="font-bold text-lg mb-4">Comments</h2>
                        {comments[videos[currentVideoIndex]?.id]?.map((comment, idx) => (
                            <div key={idx} className="flex items-start space-x-2 mb-4">
                                <p className="font-semibold">{comment.username}</p>
                                <p className="text-sm text-gray-600">{comment.text}</p>
                            </div>
                        ))}
                    </div>

                    {/* Comment Input */}
                    <div className="mt-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            className="w-full p-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleAddComment(videos[currentVideoIndex]?.id, e.target.value);
                                    e.target.value = ""; // Clear input field
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
