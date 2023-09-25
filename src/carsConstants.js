export const CARS = {
  firstCar: {
    initialPosition: {
      x: -2.6,
      y: 0.2,
      z: 0.3,
    },
    modelName: "car",
    scale: 0.0012,
    commands: {
      front: "w",
      left: "a",
      right: "d",
      back: "s",
      restart: "r",
    },
  },
  secondCar: {
    initialPosition: {
      x: -2.7,
      y: 0.2,
      z: 0,
    },
    modelName: "car2",
    scale: 0.0002,
    commands: {
      front: "arrowup",
      left: "arrowleft",
      right: "arrowright",
      back: "arrowdown",
      restart: "p",
    },
  },
};
