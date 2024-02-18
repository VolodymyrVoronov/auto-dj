import { memo } from "react";
import { useAppStore } from "../../store/app";

import Button from "../Button/Button";

import styles from "./Control.module.css";

const Control = memo((): JSX.Element => {
  const { isPlaying, isPaused, setPlaying, setPaused } = useAppStore();

  const onPlayButtonClick = (): void => {
    setPlaying(true);
    setPaused(false);
  };

  const onPauseButtonClick = (): void => {
    setPlaying(false);
    setPaused(true);
  };

  const onBackButtonClick = (): void => {};

  const onNextButtonClick = (): void => {};

  console.log(isPlaying, isPaused);

  return (
    <div className={styles["root"]}>
      <Button onClick={onBackButtonClick} className={styles["button"]}>
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

      <Button onClick={onNextButtonClick} className={styles["button"]}>
        <img src="/icons/next-icon-01.png" alt="Next" />
      </Button>
    </div>
  );
});

export default Control;
