import { useGLTF } from "@react-three/drei";
import { ColliderBox } from "./ColliderBox";

export function Rocks(props) {
  const { nodes, materials } = useGLTF("/models/Rocks.glb");
  return (
    <group position={[0, 0, -0.85]} {...props} dispose={null}>
      <ColliderBox position={[0, 0, -0.85]} scale={[0.3, 1, 0.3]} />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Rock_3.geometry}
        material={materials.Stone_Dark}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={150}
      />
    </group>
  );
}

useGLTF.preload("/models/Rocks.glb");
