import { match } from "ts-pattern";
import { Direction, flip } from "./direction";
import { Renderable } from "./renderable";
import { Shooter, computeFillColor } from "./shooter";
import { Vector2, addVector } from "./vector2";
import { CircleHitBox } from "./hit-box";
import { HasCollider } from "./has-collider";
import { Teleportable } from "./movable";

export class PlayerShooter implements Renderable, HasCollider, Teleportable {
  private shooter: Shooter;
  private _id: string;
  private moveSpeed = 6;

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

  teleport(v: Vector2) {
    this.shooter.cordinate = v;
    return this;
  }

  move(direction: Direction) {
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

  renderHitBox(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(
      ...this.hitBox.cordinate,
      this.hitBox.radius,
      (0 * Math.PI) / 180,
      (360 * Math.PI) / 180,
      false,
    );
    ctx.fillStyle = computeFillColor(this.shooter);
    ctx.stroke();
    ctx.fill();

    ctx.moveTo(...this.hitBox.cordinate);
    ctx.lineTo(
      ...flip(
        this.hitBox.cordinate,
        this.shooter.direction,
        this.hitBox.radius,
      ),
    );
    ctx.strokeStyle = "black";
    ctx.stroke();
  }

  render(ctx: CanvasRenderingContext2D) {
    this.renderHitBox(ctx);
  }
  // 責務が怪しいシリーズここまで

  get id() {
    return this._id;
  }

  get hitBox(): CircleHitBox {
    return {
      kind: "circle",
      cordinate: this.shooter.cordinate,
      radius: 18,
    };
  }

  get collide() {
    return this.hitBox;
  }
}
