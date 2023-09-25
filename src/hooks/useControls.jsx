import { useEffect, useState } from "react";

import { CARS } from "../carsConstants";

export const useControls = (vehicleApi, chassisApi, player) => {
  let [controls, setControls] = useState({});

  const commands = CARS[player].commands;

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({
        ...controls,
        [e.key.toLowerCase()]: false,
      }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    if (!vehicleApi || !chassisApi) return;

    if (controls[commands.front]) {
      vehicleApi.applyEngineForce(150, 2);
      vehicleApi.applyEngineForce(150, 3);
    } else if (controls[commands.back]) {
      vehicleApi.applyEngineForce(-150, 2);
      vehicleApi.applyEngineForce(-150, 3);
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls[commands.left]) {
      vehicleApi.setSteeringValue(0.35, 2);
      vehicleApi.setSteeringValue(0.35, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);
    } else if (controls[commands.right]) {
      vehicleApi.setSteeringValue(-0.35, 2);
      vehicleApi.setSteeringValue(-0.35, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);
    } else {
      for (let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    // if (controls.arrowdown)
    //   chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, +1]);
    // if (controls.arrowup) chassisApi.applyLocalImpulse([0, -5, 0], [0, 0, -1]);
    // if (controls.arrowleft)
    //   chassisApi.applyLocalImpulse([0, -5, 0], [-0.5, 0, 0]);
    // if (controls.arrowright)
    //   chassisApi.applyLocalImpulse([0, -5, 0], [+0.5, 0, 0]);

    // if (controls.f) chassisApi.applyLocalImpulse([0, -2, 0], [0, 0, -1]);

    if (controls[commands.restart]) {
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, Math.PI / 2, 0);
    }
  }, [controls, vehicleApi, chassisApi]);

  return controls;
};
