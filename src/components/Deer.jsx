import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations } from "@react-three/drei";
import { ColliderBox } from "./ColliderBox";

export function Deer(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Deer.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Idle_Headlow.play();
  }, [actions]);

  return (
    <group
      scale={0.1}
      position={[-6, 0, -1]}
      ref={group}
      {...props}
      dispose={null}
    >
      <ColliderBox position={[-6, 0, -1]} scale={[0.1, 1, 0.1]} />

      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="AnimalArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={50}
          >
            <primitive object={nodes.Body} />
            <primitive object={nodes.IKBackLegL} />
            <primitive object={nodes.IKFrontLegL} />
            <primitive object={nodes.IKBackLegR} />
            <primitive object={nodes.IKFrontLegR} />
          </group>
          <group name="Deer" rotation={[-Math.PI / 2, 0, 0]} scale={50}>
            <skinnedMesh
              name="Deer_1"
              geometry={nodes.Deer_1.geometry}
              material={materials.Main_Light}
              skeleton={nodes.Deer_1.skeleton}
            />
            <skinnedMesh
              name="Deer_2"
              geometry={nodes.Deer_2.geometry}
              material={materials.Main}
              skeleton={nodes.Deer_2.skeleton}
            />
            <skinnedMesh
              name="Deer_3"
              geometry={nodes.Deer_3.geometry}
              material={materials.Main_Dark}
              skeleton={nodes.Deer_3.skeleton}
            />
            <skinnedMesh
              name="Deer_4"
              geometry={nodes.Deer_4.geometry}
              material={materials.Hooves}
              skeleton={nodes.Deer_4.skeleton}
            />
            <skinnedMesh
              name="Deer_5"
              geometry={nodes.Deer_5.geometry}
              material={materials.Eye_Lighter}
              skeleton={nodes.Deer_5.skeleton}
            />
            <skinnedMesh
              name="Deer_6"
              geometry={nodes.Deer_6.geometry}
              material={materials.Eye_Black}
              skeleton={nodes.Deer_6.skeleton}
            />
            <skinnedMesh
              name="Deer_7"
              geometry={nodes.Deer_7.geometry}
              material={materials.Eye_White}
              skeleton={nodes.Deer_7.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Deer.glb");
