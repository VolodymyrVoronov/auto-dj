import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAppStore } from "../../store/app";

import Control from "../../components/Controls/Controls";
import Player from "../../components/Player/Player";

import styles from "./Main.module.css";
import Tracks from "../../components/TrackList/TrackList";

const Main = (): JSX.Element => {
  const navigate = useNavigate();

  const { tracks, trackIndex } = useAppStore();

  useEffect(() => {
    if (tracks.length === 0) {
      navigate("/", { replace: true });
    }
  }, [navigate, tracks.length]);

  return (
    <>
      <div className={styles["track"]}>
        <AnimatePresence initial={false} mode="wait">
          {tracks[trackIndex] && (
            <motion.div
              key={tracks[trackIndex].id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Player track={tracks[trackIndex]} />
            </motion.div>
          )}
        </AnimatePresence>

        <Tracks hideDeleteButton showPlayingIndicator />
      </div>

      <Control />
    </>
  );
};

export default Main;
