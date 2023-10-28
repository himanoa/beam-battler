import { ServiceLocator } from "./DIContext";
import { SceneControllerImpl } from "./scene";

export const serviceLocator: ServiceLocator = {
  sceneController: new SceneControllerImpl()
}
