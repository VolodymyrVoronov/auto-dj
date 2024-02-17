import audioContext from "./audioContext";

const getTrackDuration = async (sourceAux: string): Promise<number> => {
  const res = await fetch(sourceAux);
  const buffer = await res.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(buffer);

  return +(audioBuffer.duration / 60).toFixed(2);
};

export default getTrackDuration;
