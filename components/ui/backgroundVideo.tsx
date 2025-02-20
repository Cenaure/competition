"use client";

import { useState, useRef } from "react";

const BackgroundVideo = () => {
  const [showFirst, setShowFirst] = useState(true);
  const firstVideoRef = useRef<null | HTMLVideoElement>(null);
  const secondVideoRef = useRef<null | HTMLVideoElement>(null);

  const handleVideoChange = () => {
    setShowFirst((prev) => !prev);

    setTimeout(() => {
      if (showFirst && secondVideoRef.current) {
        secondVideoRef.current.currentTime = 0;
        secondVideoRef.current.play();
      } else if (!showFirst && firstVideoRef.current) {
        firstVideoRef.current.currentTime = 0;
        firstVideoRef.current.play();
      }
    }, 100);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-[-1]">
      <video
        ref={firstVideoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          showFirst ? "opacity-45" : "opacity-0"
        }`}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoChange}
      >
        <source src="/video/firstVideo.mp4" type="video/mp4" />
      </video>

      <video
        ref={secondVideoRef}
        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
          showFirst ? "opacity-0" : "opacity-45"
        }`}
        autoPlay
        muted
        playsInline
        onEnded={handleVideoChange}
      >
        <source src="/video/secondVideo.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
