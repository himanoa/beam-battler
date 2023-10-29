import Observable from "zen-observable";
import { Scene } from "./types";

export interface SceneController {
  transitionTo(scene: Scene): void;

  get currrentScene(): Scene;
  get observable(): Observable<Scene>;
}
