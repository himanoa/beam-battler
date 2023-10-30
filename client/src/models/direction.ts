export type Direction =
  | "top-left"
  | "top-right"
  | "left"
  | "right"
  | "top"
  | "bottom"
  | "bottom-left"
  | "bottom-right";

export const reverseDirection = (d: Direction): Direction => {
  throw new Error("unimplemented")
}
