import { VisibleEntityRepositoryImpl } from "./application/repository/visible-entity-repository-impl";
import { ServiceLocator } from "./di-context";
import { SceneControllerImpl } from "./scene";

export const applicationServiceLocator: ServiceLocator = {
  visibleEntityRepository: new VisibleEntityRepositoryImpl(),
  sceneController: new SceneControllerImpl()
}
