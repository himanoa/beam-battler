import { Cell } from "../utils/cell";
import { CollisionSimulator } from "./collision-simulator";
import { KeyboardInputStream } from "./keyboard-input-stream";
import { PlayerController } from "./player-controller";
import { VisibleEntityRepository } from "./repository/visible-entity-repository";
import { WorldEmulator } from "./world-emulator";

export class Kernel {
  private animationFrameIdCell: Cell<number | null> = new Cell(null);

  constructor(
    private visibleEntityRepository: VisibleEntityRepository,
    private keyboardInputStream: KeyboardInputStream,
    private playerController: PlayerController,
    private worldEmulator: WorldEmulator,
    private collisionSimulator: CollisionSimulator,
  ) {}

  start(canvasCtx: CanvasRenderingContext2D) {
    this.worldEmulator.emulate();
    this.collisionSimulator.startSimulation();
    this.keyboardInputStream.startSubscription();
    this.playerController.startSubscription();
    this.runMainLoop(canvasCtx);
  }

  cleanUp() {
    this.worldEmulator.closeEmulator();
    this.collisionSimulator.startSimulation();
    this.keyboardInputStream.closeSubscription();
    this.playerController.closeSubscription();

    const id = this.animationFrameIdCell.value;
    if (id) {
      cancelAnimationFrame(id);
    }
  }

  private runMainLoop(canvasCtx: CanvasRenderingContext2D) {
    canvasCtx.clearRect(0, 0, canvasCtx.canvas.width, canvasCtx.canvas.height);
    this.collisionSimulator.resolveColider()

    for (const entity of this.visibleEntityRepository) {
      entity.render(canvasCtx);
    }

    const animationFrameId = requestAnimationFrame(() =>
      this.runMainLoop(canvasCtx),
    );
    this.animationFrameIdCell.replace(animationFrameId);
  }
}
