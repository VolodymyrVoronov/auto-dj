import React, { ChangeEvent, useState } from "react";

const Main = (): JSX.Element => {
  const [audioFiles, setAudioFiles] = useState<File[]>([]);

  const onUploadInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setAudioFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/mp3" onChange={onUploadInputChange} />

      {audioFiles.map((file, index) => (
        <div key={index}>
          <audio controls src={URL.createObjectURL(file)} />
        </div>
      ))}
    </div>
  );
};

export default Main;
