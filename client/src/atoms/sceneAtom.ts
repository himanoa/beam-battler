import { Atom, atom } from "jotai";
import { Scene, SceneController } from "../scene";

export type SceneAtom = Atom<Scene>;

export const createSceneAtom = (
  sceneController: SceneController,
): SceneAtom => {
  const a = atom<Scene>(sceneController.currrentScene);
  a.onMount = (set) => {
    const subscription = sceneController.observable.subscribe((nextScene) => {
      set(nextScene);
    });
    return () => subscription.unsubscribe();
  };
  return a;
};
