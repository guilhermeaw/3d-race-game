import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export function Checkpoint(props) {
  const { firstCheck, secondCheck } = props;
  const leftCheckpointRef = useRef();
  const rightCheckpointRef = useRef();

  const position = new THREE.Vector3(props.x, props.y, props.z);
  const radius = 0.1;

  const leftMaterial = new THREE.MeshBasicMaterial({
    color: firstCheck ? 0xe55b13 : 0xffffff,
  });

  const leftGeometry = new THREE.SphereGeometry(
    radius,
    32,
    32,
    0,
    Math.PI,
    0,
    Math.PI,
  );

  const leftCheckpoint = new THREE.Mesh(leftGeometry, leftMaterial);

  leftCheckpoint.position.copy(position);

  const rightMaterial = new THREE.MeshBasicMaterial({
    color: secondCheck ? 0xff0000 : 0xffffff,
  });

  const rightGeometry = new THREE.SphereGeometry(
    radius,
    32,
    32,
    0,
    Math.PI,
    0,
    Math.PI,
  );

  const rightCheckpoint = new THREE.Mesh(rightGeometry, rightMaterial);

  const rightPosition = new THREE.Vector3(props.x, props.y, props.z);
  rightCheckpoint.position.copy(rightPosition);

  rightCheckpoint.rotation.y = Math.PI / 1;

  useFrame(() => {
    leftCheckpoint.rotation.x += 0.01;
    leftCheckpoint.rotation.y += 0.01;
    rightCheckpoint.rotation.x += 0.01;
    rightCheckpoint.rotation.y += 0.01;
  });

  return (
    <>
      <primitive ref={leftCheckpointRef} object={leftCheckpoint} />
      <primitive ref={rightCheckpointRef} object={rightCheckpoint} />
    </>
  );
}
