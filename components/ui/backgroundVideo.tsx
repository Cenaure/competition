const BackgroundVideo = () => {
  return (
    <video
      className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-45"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="/video/landingVideo.mp4" type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>
  );
};

export default BackgroundVideo;
