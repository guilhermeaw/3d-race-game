import { create } from "zustand";

const checkpoints = [
  {
    id: 1,
    position: { x: -4.45, y: 0.1, z: 1.5 },
    firstCar: false,
    secondCar: false,
  },
  {
    id: 2,
    position: { x: -1, y: 0.1, z: 1 },
    firstCar: false,
    secondCar: false,
  },
  {
    id: 3,
    position: { x: 0.95, y: 0.1, z: -1 },
    firstCar: false,
    secondCar: false,
  },
];

export const useCheckpointsStore = create((set) => ({
  checkpoints,
  isAllCheckpointsPassed: (carNumber) => {
    const checkpoints = set((state) => state.checkpoints);
    const checkpointsNotPassed = checkpoints.filter(
      (checkpoint) => !checkpoint[carNumber],
    );

    return checkpointsNotPassed.length === 0;
  },
  registerCheckpoint: (checkId, carNumber) => {
    set((state) => ({
      checkpoints: state.checkpoints.map((checkpoint) => {
        if (checkpoint.id === checkId) {
          return {
            ...checkpoint,
            [carNumber]: true,
          };
        }

        return checkpoint;
      }),
    }));
  },
  clearCheckpoints: (carNumber) => {
    set((state) => ({
      checkpoints: state.checkpoints.map((checkpoint) => {
        return {
          ...checkpoint,
          [carNumber]: false,
        };
      }),
    }));
  },
}));
