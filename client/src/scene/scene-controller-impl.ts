import { SceneController } from "./scene-controller";
import { Scene } from ".";
import PushStream from 'zen-push'
import Observable from "zen-observable";

export class SceneControllerImpl implements SceneController {
  private stream: PushStream<Scene> = new PushStream()
  private scene: Scene = 'title' 

  constructor() {}

  get currrentScene() {
    return this.scene
  }

  get observable(): Observable<Scene> {
    return this.stream.observable
  }

  transitionTo(scene: Scene) {
    this.scene = scene
    this.stream.next(scene)
  }
}
