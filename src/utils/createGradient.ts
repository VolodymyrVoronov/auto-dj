const ctx = document.createElement("canvas").getContext("2d");

const createGradient = (
  startColor: string,
  endColor: string
): CanvasGradient => {
  const gradientWave = ctx!.createLinearGradient(
    0,
    0,
    document.body.clientWidth,
    0
  );

  gradientWave.addColorStop(0, startColor);
  gradientWave.addColorStop(1, endColor);

  return gradientWave;
};

export default createGradient;
