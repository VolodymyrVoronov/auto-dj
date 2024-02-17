import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Uploader from "../../components/Uploader/Uploader";

import styles from "./Intro.module.css";

const Intro = (): JSX.Element => {
  const [showTip, setShowTip] = useState(false);

  const onUploaderHover = (): void => {
    setShowTip(true);
  };

  const onUploaderLeave = (): void => {
    setShowTip(false);
  };

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
          src="./icons/vinyl-icon-02.png"
          alt="Vinyl icon"
        />
      </motion.div>

      <div className={styles["tip-container"]}>
        <AnimatePresence>
          {showTip && (
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
        onMouseEnter={onUploaderHover}
        onMouseLeave={onUploaderLeave}
        onTap={onUploaderHover}
        onTapStart={onUploaderHover}
        onTapCancel={onUploaderLeave}
      >
        <Uploader />
      </motion.div>
    </div>
  );
};

export default Intro;
