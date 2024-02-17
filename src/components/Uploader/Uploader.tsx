import React from "react";

import styles from "./Uploader.module.css";

const Uploader = (): JSX.Element => {
  return (
    <>
      <label htmlFor="file-upload" className={styles.label}>
        <span className={styles["button"]}>Upload</span>
      </label>
      <input
        type="file"
        accept="audio/mp3"
        onChange={(e) => console.log(e.target.files)}
        multiple
        id="file-upload"
        className={styles["input"]}
      />
    </>
  );
};

export default Uploader;
