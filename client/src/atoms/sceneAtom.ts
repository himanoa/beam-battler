import { atom } from "jotai";
import { Scene } from "../scene";
import Observable from "zen-observable";

export const createSceneAtom = (stream: Observable<Scene>) => {
  const a = atom<Scene | null>(null)
  a.onMount = (set) => {
    const subscription = stream.subscribe((nextScene) => {
      set(nextScene)
    })
    return () => subscription.unsubscribe()
  }
  return a
}

