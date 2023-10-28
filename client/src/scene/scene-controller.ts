import { Scene } from "./types";

export interface SceneController {
  gotoTitle: () => void
  get currrentScene(): Scene
}
