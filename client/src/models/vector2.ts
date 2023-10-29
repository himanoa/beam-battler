// [x, y]
export type Vector2 = [number, number];

export const map: <T>(source: Vector2, fn: (source: Vector2) => T) => T = (
  source: Vector2,
  fn,
) => {
  return fn(source);
};

export const addVector: (v1: Vector2, v2: Vector2) => Vector2 = (v1, v2) => {
  return map(v1, (v1) => [v1[0] + v2[0], v1[1] + v2[1]]);
};

export const divVector: (v1: Vector2, v2: Vector2) => Vector2 = (v1, v2) => {
  return map(v1, (v1) => [v1[0] / v2[0], v1[1] / v2[1]]);
};
