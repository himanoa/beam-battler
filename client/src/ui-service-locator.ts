import { Kernel } from "./application/kernel";
import { VisibleEntityRepository } from "./application/repository/visible-entity-repository";
import { SceneAtom } from "./atoms/sceneAtom";
import { SceneController } from "./scene";

export type UiServiceLocator = {
  sceneController: SceneController;
  sceneAtom: SceneAtom;
  visibleEntityRepository: VisibleEntityRepository;
  kernel: Kernel;
};
