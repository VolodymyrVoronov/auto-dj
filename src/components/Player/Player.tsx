import { useEffect, useRef } from "react";
import { useWavesurfer } from "@wavesurfer/react";

import { ITrack, useAppStore } from "../../store/app";

import createGradient from "../../utils/createGradient";
import formatTime from "../../utils/formatTime";

import styles from "./Player.module.css";

const waveGradient = createGradient("#f58c8c", "#99befa");
const progressGradient = createGradient("#ef4444", "#3b82f6");

interface IPlayerProps {
  track: ITrack;
}

const Player = ({ track }: IPlayerProps): JSX.Element => {
  const {
    isPlaying: isTrackPlaying,
    isPaused,
    setPlaying,
    setPaused,
    setNextTrack,
  } = useAppStore();

  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 100,
    waveColor: waveGradient,
    progressColor: progressGradient,
    cursorWidth: 0,
    url: track.src,
    autoplay: false,
    normalize: true,
    interact: false,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setPlaying(true);
      setPaused(false);

      clearTimeout(timerId);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isTrackPlaying) {
      wavesurfer?.play();
    }

    if (isPaused) {
      wavesurfer?.pause();
    }
  }, [isPaused, isTrackPlaying, wavesurfer]);

  useEffect(() => {
    if (wavesurfer?.media.ended) {
      setNextTrack();

      setPlaying(false);
      setPaused(true);

      const timeId = setTimeout(() => {
        setPlaying(true);
        setPaused(false);
        clearTimeout(timeId);
      }, 2000);
    }
  }, [isPlaying, wavesurfer?.media.ended]);

  return (
    <>
      <div ref={containerRef} />

      <div className={styles["info"]}>
        <p>{formatTime(currentTime)}</p>
        <p>Current track: {track.name.replace(".mp3", "")}</p>
      </div>
    </>
  );
};

export default Player;
