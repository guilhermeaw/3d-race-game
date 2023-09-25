import * as THREE from "three";
import { useThree } from "@react-three/fiber";

import { useRaceLapsStore } from "../hooks";

export function FinishLine() {
  const { scene } = useThree();
  const {
    finishLine: { startPosition, endPosition },
  } = useRaceLapsStore();

  // Defina os pontos inicial e final da linha de chegada.
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

  // Crie uma geometria para a linha de chegada.
  const geometry = new THREE.BufferGeometry().setFromPoints([
    startPoint,
    endPoint,
  ]);

  // Crie um material para a linha (cor e outros atributos).
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 3,
  }); // Cor branca

  // Crie a linha de chegada.
  const finishLine = new THREE.Line(geometry, material);

  // Adicione a linha de chegada à cena.
  scene.add(finishLine);

  return null;
}
