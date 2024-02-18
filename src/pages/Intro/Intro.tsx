import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import { useAppStore } from "../../store/app";

import Uploader from "../../components/Uploader/Uploader";
import Tracks from "../../components/TrackList/TrackList";

import styles from "./Intro.module.css";
import Button from "../../components/Button/Button";

const Intro = (): JSX.Element => {
  const navigate = useNavigate();

  const { tracks, uploading } = useAppStore();

  const firstUploadRef = useRef(false);

  const [showTip, setShowTip] = useState(false);

  const onUploaderHover = (): void => {
    setShowTip(true);
  };

  const onUploaderLeave = (): void => {
    setShowTip(false);
  };

  const onPlayButtonClick = (): void => {
    navigate("/player", { replace: true });
  };

  useEffect(() => {
    if (tracks.length > 0) {
      firstUploadRef.current = true;
    }

    if (tracks.length === 0) {
      firstUploadRef.current = false;
    }
  }, [tracks.length, uploading]);

  return (
    <div className={styles["root"]}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
        className={styles["title"]}
      >
        Auto DJ
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <motion.img
          initial={{
            rotate: 0,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 5,
            type: "spring",
            delay: 1.5,
          }}
          className={styles["icon"]}
          src="./icons/vinyl-icon-01.png"
          alt="Vinyl icon"
        />
      </motion.div>

      <div className={styles["tip-container"]}>
        <AnimatePresence>
          {showTip && !tracks.length && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.5,
              }}
              className={styles["tip"]}
            >
              Select tracks you want to play
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 2.5 }}
        {...((!firstUploadRef.current || !uploading || !tracks.length) && {
          onMouseEnter: onUploaderHover,
          onMouseLeave: onUploaderLeave,
          onTap: onUploaderHover,
          onTapStart: onUploaderHover,
          onTapCancel: onUploaderLeave,
        })}
      >
        <Uploader />
      </motion.div>

      <Tracks />

      <AnimatePresence>
        {(firstUploadRef.current || !uploading) && tracks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Button
              onClick={onPlayButtonClick}
              className={styles["play"]}
              disabled={uploading}
            >
              Play <span>&#9654;</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Intro;
