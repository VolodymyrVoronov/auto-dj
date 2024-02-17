import { ChangeEvent, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { useAppStore } from "../../store/app";

import getTrackDuration from "../../utils/getTrackDuration";

import styles from "./Uploader.module.css";

const Uploader = (): JSX.Element => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { tracks, uploading, setTrack, setUploading } = useAppStore();

  const onUploadInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);

    if (e.target.files) {
      for (const file of e.target.files) {
        const fileName = file.name;

        if (tracks.find((audioFile) => audioFile.name === fileName)) {
          setUploading(false);
          return;
        }

        const sourceAux = URL.createObjectURL(file);
        const audio = new Audio(sourceAux);

        const duration = await getTrackDuration(sourceAux);

        setTrack({
          src: audio.src,
          name: file.name,
          duration,
        });
      }

      if (inputRef.current) {
        inputRef.current.value = "";
      }

      setUploading(false);
    }
  };

  console.log(tracks);

  return (
    <>
      <label
        htmlFor="file-upload"
        className={cn(styles["label"], {
          [styles["label-disabled"]]: uploading,
        })}
      >
        <span className={styles["button"]}>
          Upload
          <AnimatePresence mode="wait">
            {uploading && (
              <motion.span
                key={uploading.toString()}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={styles["loader"]}
              >
                ing<span>.</span>
                <span>.</span>
                <span>.</span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
      </label>

      <input
        ref={inputRef}
        type="file"
        accept="audio/mp3"
        onChange={onUploadInputChange}
        multiple
        id="file-upload"
        className={styles["input"]}
        disabled={uploading}
      />
    </>
  );
};

export default Uploader;
