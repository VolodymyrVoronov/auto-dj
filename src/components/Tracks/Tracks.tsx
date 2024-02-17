import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { useAppStore } from "../../store/app";

import Button from "../Button/Button";

import styles from "./Tracks.module.css";

const Tracks = memo((): JSX.Element => {
  const { tracks, uploading, deleteTrack } = useAppStore();

  const onDeleteButtonClick = (id?: string): void => {
    if (id) {
      deleteTrack(id);
    }
  };

  return (
    <div className={styles["root"]}>
      <AnimatePresence>
        {tracks.map((track, index) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={styles["track"]}
          >
            <span className={styles["name"]}>
              {track.name.replace(".mp3", "")}
            </span>

            <Button
              onClick={() => onDeleteButtonClick(track.id)}
              disabled={uploading}
            >
              &#10006;
            </Button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
});

Tracks.displayName = "Tracks";

export default Tracks;
