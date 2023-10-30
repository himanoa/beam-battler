import { HitBox } from "./hit-box";

export interface HasCollider {
  get collide(): HitBox;
}
