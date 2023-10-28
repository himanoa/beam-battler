import { Atom, atom } from "jotai";
import { Scene, SceneController } from "../scene";
import Observable from "zen-observable";

export type SceneAtom = Atom<Scene>

export const createSceneAtom = (sceneController: SceneController): SceneAtom => {
  const a = atom<Scene | null>(null)
  a.onMount = (set) => {
    const subscription = stream.subscribe((nextScene) => {
      set(nextScene)
    })
    return () => subscription.unsubscribe()
  }
  return a
}

