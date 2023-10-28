import { ServiceLocator } from "./di-context";
import { SceneControllerImpl } from "./scene";

export const applicationServiceLocator: ServiceLocator = {
  sceneController: new SceneControllerImpl()
}
