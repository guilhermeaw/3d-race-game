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

        // Calcule a distância entre o carro e o checkpoint
        const distance = carPosition.distanceTo(checkpointPosition);

        // Verifique se a distância é menor que o limite de colisão
        if (distance < collisionDistanceThreshold) {
          // Verifique qual carro passou pelo checkpoint e atualize o estado do checkpoint
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
      console.log("newLap");
      registerNewLap(carNumber);
      clearCheckpoints(carNumber);
    }
  };

  return { checkCollisions, checkFinishLineCollision };
};
