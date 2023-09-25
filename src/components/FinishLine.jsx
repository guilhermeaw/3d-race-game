import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import { useRaceLapsStore } from "../hooks";

export function FinishLine() {
  const { scene } = useThree();
  const {
    finishLine: { startPosition, endPosition },
  } = useRaceLapsStore();

  const startPoint = new THREE.Vector3(
    startPosition.x,
    startPosition.y,
    startPosition.z,
  );

  const endPoint = new THREE.Vector3(
    endPosition.x,
    endPosition.y,
    endPosition.z,
  );

  const geometry = new THREE.BufferGeometry().setFromPoints([
    startPoint,
    endPoint,
  ]);

  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 3,
  });

  const finishLine = new THREE.Line(geometry, material);

  scene.add(finishLine);

  return null;
}
