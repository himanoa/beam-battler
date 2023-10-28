import { SceneAtom } from "./atoms/sceneAtom";
import { SceneController } from "./scene";

export type UiServiceLocator =  {
  sceneController: SceneController
  sceneAtom: SceneAtom
}

