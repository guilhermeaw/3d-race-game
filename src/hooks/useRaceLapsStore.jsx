import { create } from "zustand";

const finishLine = {
  startPosition: {
    x: -3,
    y: 0.01,
    z: -0.25,
  },
  endPosition: {
    x: -3,
    y: 0.01,
    z: 0.25,
  },
};

export const useRaceLapsStore = create((set) => ({
  finishLine,
  firstCarLap: 1,
  secondCarLap: 1,
  registerNewLap: (carNumber) => {
    set((state) => ({
      [`${carNumber}Lap`]: state[`${carNumber}Lap`] + 1,
    }));
  },
}));
