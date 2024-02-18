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
}

export interface IAppStoreActions {
  setTrack: (track: ITrack) => void;
  setUploading: (uploading: boolean) => void;
  deleteTrack: (id: string) => void;

  setPlaying: (playing: boolean) => void;
  setPaused: (paused: boolean) => void;
}

export const useAppStore = create(
  immer<IAppStore & IAppStoreActions>((set) => ({
    tracks: [],
    uploading: false,

    isPlaying: false,
    isPaused: true,

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
      });
    },

    setPaused: (paused) => {
      set((state) => {
        state.isPaused = paused;
      });
    },
  }))
);
