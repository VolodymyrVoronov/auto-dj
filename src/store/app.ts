import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ITrack {
  id?: string;
  src: string;
  name: string;
  duration: number;
  playing?: boolean;
}

export interface IAppStore {
  tracks: ITrack[];
  uploading: boolean;
  isPlaying: boolean;
  isPaused: boolean;
  trackIndex: number;
}

export interface IAppStoreActions {
  setTrack: (track: ITrack) => void;
  setUploading: (uploading: boolean) => void;
  deleteTrack: (id: string) => void;
  setPlaying: (playing: boolean) => void;
  setPaused: (paused: boolean) => void;
  setNextTrack: () => void;
  setPreviousTrack: () => void;
}

export const useAppStore = create(
  immer<IAppStore & IAppStoreActions>((set, get) => ({
    tracks: [],
    uploading: false,
    isPlaying: false,
    isPaused: true,
    trackIndex: 0,

    setTrack: (track) => {
      set((state) => {
        const newId = window.crypto.randomUUID();

        const newTrack = {
          id: newId,
          src: track.src,
          name: track.name,
          duration: track.duration,
          playing: false,
        };

        state.tracks.push(newTrack);
      });
    },

    setUploading: (uploading) => {
      set((state) => {
        state.uploading = uploading;
      });
    },

    deleteTrack: (id) => {
      set((state) => {
        state.tracks = state.tracks.filter((track) => track.id !== id);
      });
    },

    setPlaying: (playing) => {
      set((state) => {
        state.isPlaying = playing;

        if (get().tracks.length > 0) {
          const index = get().trackIndex;
          state.tracks[index].playing = !playing;
        }
      });
    },

    setPaused: (paused) => {
      set((state) => {
        state.isPaused = paused;

        if (get().tracks.length > 0) {
          const index = get().trackIndex;
          state.tracks[index].playing = !paused;
        }
      });
    },

    setNextTrack: () => {
      set((state) => {
        const index = get().trackIndex;
        state.trackIndex = index === state.tracks.length - 1 ? 0 : index + 1;

        state.tracks.map((track) => (track.playing = false));
        state.tracks[state.trackIndex].playing = true;

        // const tId = setTimeout(() => {
        //   state.isPlaying = true;
        //   state.isPaused = false;

        //   clearTimeout(tId);
        // }, 1000);
      });
    },

    setPreviousTrack: () => {
      set((state) => {
        const index = get().trackIndex;
        state.trackIndex = index === 0 ? state.tracks.length - 1 : index - 1;

        state.tracks.map((track) => (track.playing = false));
        state.tracks[state.trackIndex].playing = true;
      });
    },
  }))
);
