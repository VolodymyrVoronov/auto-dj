import { ChangeEvent, useState, useRef } from "react";

import styles from "./Uploader.module.css";
import getTrackDuration from "../../utils/getTrackDuration";

const Uploader = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [audioFiles, setAudioFiles] = useState<
    {
      src: string;
      duration: number;
    }[]
  >([]);

  const onUploadInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      for (const file of e.target.files) {
        const sourceAux = URL.createObjectURL(file);
        const audio = new Audio(sourceAux);

        const duration = await getTrackDuration(sourceAux);

        setAudioFiles((prevFiles) => [
          ...prevFiles,
          {
            src: audio.src,
            duration,
          },
        ]);
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  console.log(audioFiles);

  return (
    <>
      <label htmlFor="file-upload" className={styles.label}>
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
      />
    </>
  );
};

export default Uploader;
