import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ITrack {
  id?: number;
  src: string;
  name: string;
  duration: number;
  playing?: boolean;
}

export interface IAppStore {
  tracks: ITrack[];
}

export interface IAppStoreActions {
  setTracks: (track: ITrack) => void;
}

export const useAppStore = create(
  immer<IAppStore & IAppStoreActions>((set) => ({
    tracks: [],

    setTracks: (track) => {
      set((state) => {
        const newTrack = {
          id: state.tracks.length + 1,
          src: track.src,
          name: track.name,
          duration: track.duration,
          playing: false,
        };

        state.tracks.push(newTrack);
      });
    },
  }))
);
