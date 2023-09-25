import { Suspense, useEffect, useState } from "react";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";

import { Car, Deer, Ground, Mine, Rocks, Track } from "./components";

export function Scene() {
  return (
    <Suspense fallback={null}>
      <Environment files={"/textures/sky.hdr"} background={"both"} />

      <PerspectiveCamera makeDefault position={[-6, 3.9, 6.21]} fov={40} />
      {<OrbitControls target={[-2.64, -0.71, 0.03]} />}

      <Ground />
      <Track />
      <Car carNumber={"firstCar"} />
      <Car carNumber={"secondCar"} />
      <Deer />
      <Rocks />
      <Mine />
    </Suspense>
  );
}
