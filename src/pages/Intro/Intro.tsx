import { motion } from "framer-motion";

import styles from "./Intro.module.css";

const Intro = (): JSX.Element => {
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
    </div>
  );
};

export default Intro;
