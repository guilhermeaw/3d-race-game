import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/cannon";

import { Scene } from "./Scene";
import { useRaceLapsStore } from "./hooks/useRaceLapsStore";

export const App = () => {
  const { firstCarLap, secondCarLap } = useRaceLapsStore();

  return (
    <>
      <Canvas>
        <Physics broadphase="SAP" gravity={[0, -2.6, 0]}>
          <Scene />
        </Physics>
      </Canvas>

      <div className="controls">
        <p>Player 1</p>
        <hr />
        <p>
          Pressione <b>w a s d</b> para se mover
        </p>
        <p>
          Pressione <b>r</b> para resetar
        </p>

        <br />

        <p>Player 2</p>
        <hr />
        <p>
          Use as <b>setas</b> para se mover
        </p>
        <p>
          Pressione <b>p</b> para resetar
        </p>
      </div>

      <div className="lap">
        <p>Player 1: volta {firstCarLap}</p>
        <p>Player 2: volta {secondCarLap}</p>
      </div>
    </>
  );
};
