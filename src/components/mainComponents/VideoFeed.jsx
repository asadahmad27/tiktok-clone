import React, { useEffect, useRef } from "react";
import { VIDEOS } from "../../utils/data";

const VideoFeed = ({ videos }) => {
  const videoRefs = useRef([]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Play video when at least 50% in view
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    }, options);

    videoRefs.current.forEach((video) => observer.observe(video));

    return () => {
      videoRefs.current.forEach((video) => observer.unobserve(video));
    };
  }, []);

  return (
    <div className="video-feed">
      {VIDEOS.map((video, index) => (
        <div
          key={video.id}
          style={{ margin: "20px 0" }}
          className="bg-red-500 video-card"
        >
          <video
            ref={(el) => (videoRefs.current[index] = el)}
            src={video.videoUrl}
            controls={false}
            loop
            style={{ width: "100%", height: "auto" }}
            // muted // Ensure videos start muted
          >
            <source src={video.videoUrl} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
};

export default VideoFeed;
