import { HasCollider } from "./has-collider"
import { Vector2 } from "./vector2"

export interface Teleportable extends HasCollider {
  teleport(v: Vector2): this
}

export const isTeleportable = (a: unknown): a is Teleportable => {
  return !!(a as Teleportable)["teleport" as keyof Teleportable]
}
