import { SceneController } from "./scene-controller";
import { Scene } from ".";
import PushStream from 'zen-push'
import Observable from "zen-observable";

export class SceneControllerImpl implements SceneController {
  private stream: PushStream<Scene>

  constructor() {
    this.stream = new PushStream<Scene>()
  }

  get observable(): Observable<Scene> {
    return this.stream.observable
  }

  gotoTitle() {
    this.stream.next('title')
  }
}
