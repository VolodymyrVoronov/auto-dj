import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";

import { useAppStore } from "../../store/app";

import Button from "../Button/Button";

import styles from "./Controls.module.css";

const Control = memo((): JSX.Element => {
  const {
    isPlaying,
    isPaused,
    setPlaying,
    setPaused,
    setNextTrack,
    setPreviousTrack,
  } = useAppStore();

  const onPlayButtonClick = (): void => {
    setPlaying(true);
    setPaused(false);
  };

  const onPauseButtonClick = (): void => {
    setPlaying(false);
    setPaused(true);
  };

  const onBackButtonClick = (): void => {
    setPreviousTrack();

    if (isPlaying) {
      setPlaying(false);
      setPaused(true);

      const timeId = setTimeout(() => {
        setPlaying(true);
        setPaused(false);
        clearTimeout(timeId);
      }, 1000);
    }

    if (isPaused) {
      const timeId = setTimeout(() => {
        setPlaying(true);
        setPaused(false);
        clearTimeout(timeId);
      }, 1000);
    }
  };

  const onNextButtonClick = (): void => {
    setNextTrack();

    if (isPlaying) {
      setPlaying(false);
      setPaused(true);

      const timeId = setTimeout(() => {
        setPlaying(true);
        setPaused(false);
        clearTimeout(timeId);
      }, 1000);
    }

    if (isPaused) {
      const timeId = setTimeout(() => {
        setPlaying(true);
        setPaused(false);
        clearTimeout(timeId);
      }, 1000);
    }
  };

  return (
    <div className={styles["root"]}>
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className={styles["animated"]}
          />
        )}
      </AnimatePresence>

      <Button
        onClick={onBackButtonClick}
        className={cn(styles["button"], styles["back"])}
      >
        <img src="/icons/back-icon-01.png" alt="Back" />
      </Button>

      {isPlaying && (
        <Button onClick={onPauseButtonClick} className={styles["button"]}>
          <img src="/icons/pause-icon-01.png" alt="Pause" />
        </Button>
      )}

      {isPaused && (
        <Button onClick={onPlayButtonClick} className={styles["button"]}>
          <img src="/icons/play-icon-01.png" alt="Play" />
        </Button>
      )}

      <Button
        onClick={onNextButtonClick}
        className={cn(styles["button"], styles["next"])}
      >
        <img src="/icons/next-icon-01.png" alt="Next" />
      </Button>
    </div>
  );
});

export default Control;
