import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useWavesurfer } from "@wavesurfer/react";

import { useAppStore } from "../../store/app";

import formatTime from "../../utils/formatTime";
import Control from "../../components/Control/Control";

const Main = (): JSX.Element => {
  const navigate = useNavigate();

  const { tracks, uploading } = useAppStore();

  const containerRef = useRef(null);

  // console.log(audioFiles);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 250,
    waveColor: "#f97316",
    progressColor: "#b45309",
    url: tracks.length > 0 ? tracks[0].src : "",
    // interact: false,
    normalize: true,

    // plugins: useMemo(() => [Timeline.create()], []),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  // console.log(tracks[0].duration);
  console.log(Math.round(wavesurfer?.getDuration()));
  console.log(Math.round(wavesurfer?.getCurrentTime()));

  console.log(
    Math.round(wavesurfer?.getCurrentTime()) + 10 >
      Math.round(wavesurfer?.getDuration())
  );

  useEffect(() => {
    if (tracks.length === 0) {
      navigate("/", { replace: true });
    }
  }, [navigate, tracks.length]);

  return (
    <>
      <div>
        <div ref={containerRef} />

        <p>Current time: {formatTime(currentTime)}</p>
        {/* <p>Track duration: {formatTime(tracks[0].duration)}</p> */}

        <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
          <button onClick={onPlayPause} style={{ minWidth: "5em" }}>
            {isPlaying ? "Pause" : "Play"}
          </button>
        </div>
      </div>

      <Control />
    </>
  );
};

export default Main;
