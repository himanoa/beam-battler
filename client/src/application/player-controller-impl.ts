import Observable from "zen-observable";
import { PlayerController } from "./player-controller";
import { KeyboardState } from "../models/keyboard-input";
import { PlayerActions } from "../models/game-actions";
import PushStream from "zen-push";
import { match } from "ts-pattern";

export class PlayerControllerImpl implements PlayerController {
  private subscription : ReturnType<Observable<object>["subscribe"]>  | undefined= undefined
  private playerActionStream : PushStream<PlayerActions> = new PushStream()

  constructor(
    private keyboardInputStream: Observable<KeyboardState>
  ) {}

  get observable() {
    return this.playerActionStream.observable
  }

  startSubscription() {
    this.subscription = this.keyboardInputStream.subscribe((k) => {
      this.handler(k)
    })
  }

  closeSubscription() {
    this.subscription?.unsubscribe()
  }

  private handler(keyboardState: KeyboardState){
    match(keyboardState)
    .with({ ArrowUp: 'keyDown', ArrowLeft: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'top-left' }
      )
    })
    .with({ ArrowUp: 'keyDown', ArrowRight: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'top-right' }
      )
    })
    .with({ ArrowDown: 'keyDown', ArrowLeft: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'bottom-left' }
      )
    })
    .with({ ArrowDown: 'keyDown', ArrowRight: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'bottom-right' }
      )
    })
    .with({ ArrowUp: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'top' }
      )
    })
    .with({ ArrowDown: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'bottom' }
      )
    })
    .with({ ArrowLeft: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'left' }
      )
    })
    .with({ ArrowRight: 'keyDown' }, () => {
      this.playerActionStream.next(
        { kind: 'playerChangeDirection', payload: 'right' }
      )
    })
    .otherwise(() => {})
  }
}
