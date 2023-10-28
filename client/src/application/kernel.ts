import { PlayerShooter } from "../models/player-shooter";
import { Renderable } from "../models/renderable";
import { Cell } from "../utils/cell";
import { VisibleEntityRepository } from "./repository/visible-entity-repository";

export class Kernel {
  constructor(
    private visibleEntityRepository: VisibleEntityRepository<Renderable>,
    private animationFrameIdCell: Cell<number | null>,
  ) {
  }

  start(canvasCtx: CanvasRenderingContext2D) {
    this.visibleEntityRepository.store(new PlayerShooter(
      self.crypto.randomUUID(),
      [100, 100],
      'top'
    ))
    this.runMainLoop(canvasCtx)
  }

  cleanUp() {
    const id = this.animationFrameIdCell.value
    if(id) {
      cancelAnimationFrame(id)
    }
  }

  private runMainLoop(canvasCtx: CanvasRenderingContext2D) {
    for(const entity of this.visibleEntityRepository) {
      entity.render(canvasCtx)
    }

    const animationFrameId = requestAnimationFrame(() => this.runMainLoop(canvasCtx))
    this.animationFrameIdCell.replace(animationFrameId)
  }

}
