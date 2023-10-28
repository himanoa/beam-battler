import { Scene } from './types'
import Observable from 'zen-observable'

export interface SceneController {
  get observable(): Observable<Scene>
  gotoTitle: () => void
}
