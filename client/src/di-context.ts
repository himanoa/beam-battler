import { SceneController } from "./scene";
import { VisibleEntityRepository } from "./application/repository/visible-entity-repository";
import { Renderable } from "./models/renderable";
import { Kernel } from "./application/kernel";

export type ServiceLocator = {
  visibleEntityRepository: VisibleEntityRepository<Renderable>,
  sceneController: SceneController
  kernel: Kernel
}
