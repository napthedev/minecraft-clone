import { create } from "zustand";

interface Store {
  cubes: { key: string; pos: [number, number, number] }[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
}

export const useStore = create<Store>()((set) => ({
  cubes: [],
  addCube: (x: number, y: number, z: number) =>
    set((prev) =>
      prev.cubes.some(({ pos }) => pos.join("") === `${x}${y}${z}`)
        ? {}
        : {
            cubes: [
              ...prev.cubes,
              {
                key: Math.random().toString(36).slice(2),
                pos: [x, y, z],
              },
            ],
          }
    ),
  removeCube: (x, y, z) =>
    set((prev) => ({
      cubes: prev.cubes.filter(({ pos }) => pos.join("") !== `${x}${y}${z}`),
    })),
}));
