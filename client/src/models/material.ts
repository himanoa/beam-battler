import { HasCollider, hasCollider } from "./has-collider";
import { Renderable } from "./renderable";

export interface Material extends HasCollider, Renderable {}

export const isMaterial = (c: Renderable): c is Material => {
  return hasCollider(c);
};
