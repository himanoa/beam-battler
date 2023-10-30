import { HitBox } from "./hit-box";

export interface HasCollider {
  get collide(): HitBox;
}

export const hasCollider = (c: object): c is HasCollider => {
  return Object.hasOwn(c, 'collide') != null
}
