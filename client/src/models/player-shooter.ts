import { Direction } from "./direction";
import { Renderable } from "./renderable";
import { Shooter, computeFillColor, getStartPoint, makePointsIter } from "./shooter";
import { Vector2 } from "./vector2";

export class PlayerShooter implements Renderable {
  private shooter: Shooter 
  private _id: string

  constructor(id: string, initialCordinate: Vector2, initialDirection: Direction) {
    this.shooter = {
      cordinate: initialCordinate,
      areaLength: 30,
      direction: initialDirection,
      playerNumber: 1
    }
    this._id = id
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
