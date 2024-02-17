import { ChangeEvent, useState, useRef } from "react";
import cn from "classnames";

import { useAppStore } from "../../store/app";

import getTrackDuration from "../../utils/getTrackDuration";

import styles from "./Uploader.module.css";

const Uploader = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { tracks, setTracks } = useAppStore();

  const [loading, setLoading] = useState(false);

  const onUploadInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    if (e.target.files) {
      for (const file of e.target.files) {
        const fileName = file.name;

        if (tracks.find((audioFile) => audioFile.name === fileName)) {
          setLoading(false);
          return;
        }

        const sourceAux = URL.createObjectURL(file);
        const audio = new Audio(sourceAux);

        const duration = await getTrackDuration(sourceAux);

        setTracks({
          src: audio.src,
          name: file.name,
          duration,
        });
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      setLoading(false);
    }
  };

  console.log(tracks);

  return (
    <>
      <label
        htmlFor="file-upload"
        className={cn(styles["label"], {
          [styles["label-disabled"]]: loading,
        })}
      >
        <span className={styles["button"]}>Upload</span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="audio/mp3"
        onChange={onUploadInputChange}
        multiple
        id="file-upload"
        className={styles["input"]}
        disabled={loading}
      />

      {loading && <p>Loading...</p>}

      {!loading && (
        <ul>
          {tracks.map((file, index) => (
            <li key={index}>
              <p>{file.name}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Uploader;
