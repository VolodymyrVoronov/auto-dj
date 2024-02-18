import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWavesurfer } from "@wavesurfer/react";

import { useAppStore } from "../../store/app";

const formatTime = (seconds: number): string =>
  [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");

const Main = (): JSX.Element => {
  const navigate = useNavigate();

  const { tracks, uploading } = useAppStore();

  const containerRef = useRef(null);

  const [audioFiles, setAudioFiles] = useState<string[]>([]);

  const onUploadInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const sourceAux = URL.createObjectURL(e.target.files[0]);
      console.log("BLOB", sourceAux);
      const audio = new Audio(sourceAux);

      setAudioFiles((prevFiles) => [...prevFiles, audio.src]);
    }
  };

  // console.log(audioFiles);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 250,
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    url: audioFiles[0],
    // interact: false,
    normalize: true,

    // plugins: useMemo(() => [Timeline.create()], []),
  });

  const onPlayPause = useCallback(() => {
    wavesurfer?.playPause();
  }, [wavesurfer]);

  useEffect(() => {
    if (tracks.length === 0) {
      navigate("/", { replace: true });
    }
  }, [navigate, tracks.length]);

  return (
    <div>
      <div ref={containerRef} />

      <p>Current time: {formatTime(currentTime)}</p>

      <div style={{ margin: "1em 0", display: "flex", gap: "1em" }}>
        <button onClick={onPlayPause} style={{ minWidth: "5em" }}>
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>

      <input
        type="file"
        accept="audio/mp3"
        onChange={onUploadInputChange}
        multiple
      />

      {/* {audioFiles.map((file, index) => (
        <div key={index}>
          <audio controls src={URL.createObjectURL(file)} />
        </div>
      ))} */}
    </div>
  );
};

export default Main;
