import { match } from "ts-pattern";
import { Direction } from "./direction";
import { Renderable } from "./renderable";
import {
  Shooter,
  computeFillColor,
  getStartPoint,
  makePointsIter,
} from "./shooter";
import { Vector2, addVector, divVector } from "./vector2";
import { CircleHitBox } from "./hit-box";
import { HasCollider } from "./has-collider";

interface X extends Renderable, HasCollider {}

export class PlayerShooter implements X {
  private shooter: Shooter;
  private _id: string;
  private moveSpeed = 5;

  constructor(
    id: string,
    initialCordinate: Vector2,
    initialDirection: Direction,
  ) {
    this.shooter = {
      cordinate: initialCordinate,
      areaLength: 30,
      direction: initialDirection,
      playerNumber: 1,
    };
    this._id = id;
  }

  changeDirection(d: Direction) {
    this.shooter.direction = d;
    return this;
  }

  move(direction: Direction): PlayerShooter {
    // NOTE:
    // 斜め移動を愚直に実装(横方向にも縦方向にもspeed分だけ可算)すると、斜め移動だけ早くなってしまう
    // その対策で斜め移動の時のみ0.71の移動係数をかけてあげる
    const speedNormalizeNumber = 0.71;

    return match(direction)
      .with("top-left", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          -this.moveSpeed * speedNormalizeNumber,
          -this.moveSpeed * speedNormalizeNumber,
        ]);
        return this;
      })
      .with("top-right", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          this.moveSpeed * speedNormalizeNumber,
          -this.moveSpeed * speedNormalizeNumber,
        ]);
        return this;
      })
      .with("bottom-left", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          -this.moveSpeed * speedNormalizeNumber,
          this.moveSpeed * speedNormalizeNumber,
        ]);
        return this;
      })
      .with("bottom-right", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          this.moveSpeed * speedNormalizeNumber,
          this.moveSpeed * speedNormalizeNumber,
        ]);
        return this;
      })
      .with("top", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          0,
          -this.moveSpeed,
        ]);
        return this;
      })
      .with("bottom", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          0,
          this.moveSpeed,
        ]);
        return this;
      })
      .with("right", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          this.moveSpeed,
          0,
        ]);
        return this;
      })
      .with("left", () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [
          -this.moveSpeed,
          0,
        ]);
        return this;
      })
      .exhaustive();
  }

  // 責務が怪しいシリーズ
  renderShotoer(ctx: CanvasRenderingContext2D) {
    const startPoint = getStartPoint(this.shooter);

    ctx.beginPath();
    ctx.moveTo(...startPoint);
    ctx.fillStyle = computeFillColor(this.shooter);
    ctx.lineWidth = 2;

    for (const point of makePointsIter(this.shooter)) {
      ctx.lineTo(...point);
    }

    ctx.stroke();
    ctx.fill();
  }

  renderHitBox(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      ...this.hitBox.cordinate,
      this.hitBox.radius,
      (0 * Math.PI) / 180,
      (360 * Math.PI) / 180,
      false,
    );
    ctx.fillStyle = "white";
    ctx.strokeStyle = "red";
    ctx.stroke();
    ctx.fill();
  }

  render(ctx: CanvasRenderingContext2D) {
    this.renderShotoer(ctx);
    this.renderHitBox(ctx);
  }
  // 責務が怪しいシリーズここまで

  get id() {
    return this._id;
  }

  get hitBox(): CircleHitBox {
    const point = divVector(
      Array.from(makePointsIter(this.shooter)).reduce(
        (acc, value) => addVector(acc, value),
        [0, 0],
      ),
      [3, 3],
    );

    return {
      kind: 'circle',
      cordinate: point,
      radius: 8,
    };
  }

  get collide() {
    return this.hitBox
  }
}
