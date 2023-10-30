import { Vector2 } from "./vector2";

export type CircleHitBox = {
  kind: 'circle',
  cordinate: Vector2;
  radius: number;
}

export type LineHitBox = {
  kind: 'line'
  cordinate1: Vector2
  cordinate2: Vector2
}

export type HitBox = CircleHitBox | LineHitBox;

export function fillColor(): string {
  return "red";
}

export function findNearestPointOnLine(line: LineHitBox, circle: CircleHitBox): Vector2 {
  const [x1, y1] = line.cordinate1;
  const [x2, y2] = line.cordinate2;
  const [cx, cy] = circle.cordinate;

  // 線分の長さの二乗
  const lineLengthSquared = (x2 - x1) ** 2 + (y2 - y1) ** 2;

  // 線分がほぼ点に等しい場合
  if (lineLengthSquared === 0) {
    return line.cordinate1;
  }

  // 円の中心と線分の端点との相対位置を利用したパラメータtを計算
  const t = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / lineLengthSquared;

  // tが[0, 1]の範囲外の場合、最近傍点は線分の端点
  if (t < 0) return line.cordinate1;
  if (t > 1) return line.cordinate2;

  // 線分上の最近傍点を計算
  const nearestPoint: Vector2 = [
    x1 + t * (x2 - x1),
    y1 + t * (y2 - y1)
  ];

  return nearestPoint;
}
