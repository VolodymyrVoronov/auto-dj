class AudioContextSingleton {
  private static instance: AudioContext;

  private constructor() {}

  public static getInstance(): AudioContext {
    if (!this.instance) {
      this.instance = new AudioContext();
    }

    return this.instance;
  }
}

const audioContext = AudioContextSingleton.getInstance();

export default audioContext;
