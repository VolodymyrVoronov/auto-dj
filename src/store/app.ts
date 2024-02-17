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
}

export interface IAppStoreActions {
  setTrack: (track: ITrack) => void;
  setUploading: (uploading: boolean) => void;
  deleteTrack: (id: string) => void;
}

export const useAppStore = create(
  immer<IAppStore & IAppStoreActions>((set) => ({
    tracks: [],
    uploading: false,

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
  }))
);
