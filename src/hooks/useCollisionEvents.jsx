import * as THREE from "three";

import { useRaceLapsStore } from "./useRaceLapsStore";
import { useCheckpointsStore } from "./useCheckpointsStore";

export const useCollisionEvents = () => {
  const { registerNewLap, finishLine } = useRaceLapsStore();
  const { checkpoints, registerCheckpoint, clearCheckpoints } =
    useCheckpointsStore();

  const collisionDistanceThreshold = 0.2;

  const checkCollisions = (carPosition, carNumber) => {
    for (const checkpoint of checkpoints) {
      if (!checkpoint[carNumber]) {
        const checkpointPosition = new THREE.Vector3(
          checkpoint.position.x,
          checkpoint.position.y,
          checkpoint.position.z,
        );

        const distance = carPosition.distanceTo(checkpointPosition);

        if (distance < collisionDistanceThreshold) {
          registerCheckpoint(checkpoint.id, carNumber);
        }

        break;
      }
    }
  };

  const checkFinishLineCollision = (carPosition, carNumber) => {
    const { startPosition, endPosition } = finishLine;

    const linePosition = new THREE.Vector3(
      startPosition.x,
      startPosition.y,
      (startPosition.z + endPosition.z) / 2,
    );

    const distance = carPosition.distanceTo(linePosition);

    const hasCrossedFinishLine = distance < collisionDistanceThreshold;

    if (hasCrossedFinishLine) {
      registerNewLap(carNumber);
      clearCheckpoints(carNumber);
    }
  };

  return { checkCollisions, checkFinishLineCollision };
};
