import { HasCollider } from "./has-collider";
import { LineHitBox } from "./hit-box";
import { Renderable } from "./renderable";
import { Vector2 } from "./vector2";

export class Line implements Renderable, HasCollider {
  public lineWidth: number  = 1
  constructor(
    private _id: string,
    private startCordinate: Vector2,
    private endCordinate: Vector2
  ) {}

  render(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.moveTo(...this.startCordinate)
    ctx.lineTo(...this.endCordinate)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = this.lineWidth
    ctx.stroke();
    ctx.fill()
  }

  get collide(): LineHitBox {
    return {
      kind: 'line',
      cordinate1: this.startCordinate,
      cordinate2: this.endCordinate,
      width: this.lineWidth
    }
  }

  get id() {
    return this._id
  }
}
