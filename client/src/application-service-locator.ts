import { Kernel } from "./application/kernel";
import { VisibleEntityRepositoryImpl } from "./application/repository/visible-entity-repository-impl";
import { ServiceLocator } from "./di-context";
import { SceneControllerImpl } from "./scene";
import { Cell } from "./utils/cell";

const visibleEntityRepository = new VisibleEntityRepositoryImpl()
const sceneController = new SceneControllerImpl()
const animationFrameIdCell = new Cell(null)

export const applicationServiceLocator: ServiceLocator = {
  visibleEntityRepository: visibleEntityRepository,
  sceneController: sceneController,
  kernel: new Kernel(visibleEntityRepository, animationFrameIdCell)
}
