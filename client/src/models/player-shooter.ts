import { match } from "ts-pattern";
import { Direction } from "./direction";
import { Renderable } from "./renderable";
import { Shooter, computeFillColor, getStartPoint, makePointsIter } from "./shooter";
import { Vector2, addVector } from "./vector2";

export class PlayerShooter implements Renderable {
  private shooter: Shooter 
  private _id: string
  private moveSpeed = 5

  constructor(id: string, initialCordinate: Vector2, initialDirection: Direction) {
    this.shooter = {
      cordinate: initialCordinate,
      areaLength: 30,
      direction: initialDirection,
      playerNumber: 1
    }
    this._id = id
  }

  changeDirection(d: Direction) {
    this.shooter.direction = d
    return this
  }

  move(direction: Direction): PlayerShooter {
    // TODO: 当たり判定などを判定して移動先を決定しないといけないので、ここにある実装は後々作り直す
    const speedNormalizeNumber = 0.7071
    return match(direction)
      .with('top-left', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [-this.moveSpeed * speedNormalizeNumber, -this.moveSpeed * speedNormalizeNumber])
        return this
      })
      .with('top-right', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [this.moveSpeed * speedNormalizeNumber, -this.moveSpeed *speedNormalizeNumber])
        return this
      })
      .with('bottom-left', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [-this.moveSpeed * speedNormalizeNumber, this.moveSpeed *speedNormalizeNumber])
        return this
      })
      .with('bottom-right', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [this.moveSpeed * speedNormalizeNumber, this.moveSpeed *speedNormalizeNumber])
        return this
      })
      .with('top', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [0, -this.moveSpeed])
        return this
      })
      .with('bottom', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [0, this.moveSpeed])
        return this
      })
      .with('right', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [this.moveSpeed, 0])
        return this
      })
      .with('left', () => {
        this.shooter.cordinate = addVector(this.shooter.cordinate, [-this.moveSpeed, 0])
        return this
      })
      .exhaustive()
  }

  render(ctx: CanvasRenderingContext2D) {
    const startPoint = getStartPoint(this.shooter)

    ctx.beginPath()
    ctx.moveTo(...startPoint)
    ctx.fillStyle = computeFillColor(this.shooter)
    ctx.lineWidth = 2;

    for(const point of makePointsIter(this.shooter)) {
      ctx.lineTo(...point)
    }

    ctx.stroke()
    ctx.fill()
  }

  get id() {
    return this._id
  }
}
