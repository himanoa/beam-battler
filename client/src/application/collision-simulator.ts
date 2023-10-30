import Observable from "zen-observable";
import { Direction } from "../models/direction";

// 衝突した二つのEntityのID
// IDはVisibleEntityRepositoryに入ってるやつ
export type ColideEvent = {
  a: string;
  b: string;
  moveEntityId: string;
  direction: Direction;
  size: number;
};

export interface CollisionSimulator {
  onColide: Observable<ColideEvent>;
  startSimulation(): void;
  closeSimulation(): void;
  resolveColider(): void;
}
