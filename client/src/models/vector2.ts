// [x, y]
export type Vector2 = [number, number]

export const addVector = (v1: Vector2, v2: Vector2): Vector2 => {
  return [v1[0] + v2[0], v1[1] + v2[1]]
}
