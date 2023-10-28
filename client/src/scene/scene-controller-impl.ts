import { SceneController } from "./scene-controller";
import { Scene } from ".";
import PushStream from 'zen-push'

export class SceneControllerImpl implements SceneController {
  private stream: PushStream<Scene> = new PushStream()
  private scene: Scene = 'title' 

  constructor() {}

  gotoTitle() {
    this.scene = 'title'
    this.stream.next('title')
  }

  get currrentScene() {
    return this.scene
  }

  get observable() {
    return this.stream.observable
  }
}
