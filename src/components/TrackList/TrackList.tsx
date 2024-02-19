import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { useAppStore } from "../../store/app";

import Button from "../Button/Button";
import PlayIndicator from "../PlayIndicator/PlayIndicator";

import styles from "./TrackList.module.css";

interface ITrackProps {
  hideDeleteButton?: boolean;
  showPlayingIndicator?: boolean;
}

const Tracks = ({
  hideDeleteButton = false,
  showPlayingIndicator = false,
}: ITrackProps): JSX.Element => {
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
            <span
              className={cn(styles["name"], {
                [styles["playing"]]: track.playing,
              })}
            >
              {track.name.replace(".mp3", "")}
            </span>

            {!hideDeleteButton && (
              <Button
                onClick={() => onDeleteButtonClick(track.id)}
                disabled={uploading}
              >
                &#10006;
              </Button>
            )}

            {track.playing && showPlayingIndicator && <PlayIndicator />}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Tracks;
