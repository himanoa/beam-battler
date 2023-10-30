import { SceneController } from "./scene";
import { VisibleEntityRepository } from "./application/repository/visible-entity-repository";
import { Kernel } from "./application/kernel";

export type ServiceLocator = {
  visibleEntityRepository: VisibleEntityRepository;
  sceneController: SceneController;
  kernel: Kernel;
};
