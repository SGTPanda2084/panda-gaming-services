import React, { useEffect, useRef } from "react";
import { create } from "amazon-ivs-player";

const streamUrl =
  "https://02c77d52de9b.us-east-1.playback.live-video.net/api/video/v1/us-east-1.016230494190.channel.PVsOZSvpaX54.m3u8";

function WatchStream() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!create.isPlayerSupported) return;

    const player = create();
    player.attachHTMLVideoElement(videoRef.current);
    player.load(streamUrl);
    player.play();

    return () => {
      player.pause();
      player.delete();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      playsInline
      className="video-player"
    />
  );
}

export default WatchStream;
