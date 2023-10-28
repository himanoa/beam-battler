import Observable from "zen-observable";
import { Scene } from "./types";

export interface SceneController {
  gotoTitle: () => void
  get currrentScene(): Scene
  get observable(): Observable<Scene>
}
