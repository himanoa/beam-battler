import { Direction } from "./direction";
import { Vector2 } from "./vector2";

export type Shooter = {
  cordinate: Vector2;
  areaLength: number;
  direction: Direction;
  playerNumber: 1 | 2 | 3 | 4;
};

export function computeFillColor(shooter: Shooter): string {
  switch (shooter.playerNumber) {
    case 1: {
      return "#fad4db";
    }
    case 2: {
      return "#faf5d4";
    }
    case 3: {
      return "#dad4fa";
    }
    case 4: {
      return "#d6fad4";
    }
  }
}

export function computeStrokeColor(): string {
  return "#2d334a";
}
