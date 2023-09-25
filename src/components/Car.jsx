import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import { CARS } from "../carsConstants";
import { WheelDebug } from "./WheelDebug";
import {
  useCheckpointsStore,
  useCollisionEvents,
  useControls,
  useWheels,
} from "../hooks";

export function Car({ carNumber }) {
  const CAR = CARS[carNumber];

  const result = useLoader(GLTFLoader, `/models/${CAR.modelName}.glb`).scene;
  const { checkCollisions, checkFinishLineCollision } = useCollisionEvents();
  const { checkpoints } = useCheckpointsStore();

  const position = [
    CAR.initialPosition.x,
    CAR.initialPosition.y,
    CAR.initialPosition.z,
  ];

  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
      rotation: [0, Math.PI / 2, 0],
    }),
    useRef(null),
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null),
  );

  useControls(vehicleApi, chassisApi, carNumber);

  useFrame(() => {
    const isAllCheckpointsPassed = () => {
      const checkpointsNotPassed = checkpoints.filter(
        (checkpoint) => !checkpoint[carNumber],
      );

      return checkpointsNotPassed.length === 0;
    };

    const position = new Vector3(0, 0, 0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    const passedAllCheckpoints = isAllCheckpointsPassed();

    if (!passedAllCheckpoints) {
      checkCollisions(position, carNumber);
      return;
    }

    checkFinishLineCollision(position, carNumber);
  });

  useEffect(() => {
    if (!result) return;

    let mesh = result;
    mesh.scale.set(CAR.scale, CAR.scale, CAR.scale);

    mesh.children[0].position.set(-365, -18, -67);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive
          object={result}
          rotation-y={Math.PI}
          position={[0, -0.09, 0]}
        />
      </group>

      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
