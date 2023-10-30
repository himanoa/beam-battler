import { match } from "ts-pattern";
import { Vector2 } from "./vector2";

export type Direction =
  | "top-left"
  | "top-right"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export const not = (d: Direction): Direction => {
  return match<Direction, Direction>(d)
    .with("top-right", () => "bottom-left")
    .with("top-left", () => "bottom-right")
    .with("bottom-right", () => "top-left")
    .with("bottom-left", () => "top-right")
    .with("top", () => "bottom")
    .with("bottom", () => "top")
    .with("left", () => "right")
    .with("right", () => "left")
    .exhaustive();
};

export const includeRight = (direction: Direction): boolean => {
  return ["top-right", "bottom-right", "right"].includes(direction);
};

export const includeLeft = (direction: Direction): boolean => {
  return ["top-left", "bottom-left", "left"].includes(direction);
};

export const includeTop = (direction: Direction): boolean => {
  return ["top-left", "top-right", "top"].includes(direction);
};

export const includeBottom = (direction: Direction): boolean => {
  return ["bottom-left", "bottom-right", "bottom"].includes(direction);
};

export const flip = (
  sourceVector: Vector2,
  direction: Direction,
  power: number,
): Vector2 => {
  const x = (() => {
    if (includeLeft(direction)) {
      return sourceVector[0] - power;
    }
    if (includeRight(direction)) {
      return sourceVector[0] + power;
    }
    return sourceVector[0];
  })();

  const y = (() => {
    if (includeTop(direction)) {
      return sourceVector[1] - power;
    }
    if (includeBottom(direction)) {
      return sourceVector[1] + power;
    }
    return sourceVector[1];
  })();

  return [x, y];
};
