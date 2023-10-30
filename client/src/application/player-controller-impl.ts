import Observable from "zen-observable";
import { PlayerController } from "./player-controller";
import { KeyboardState } from "../models/keyboard-input";
import { PlayerActions } from "../models/player-actions";
import PushStream from "zen-push";
import { match } from "ts-pattern";

export class PlayerControllerImpl implements PlayerController {
  private subscription:
    | ReturnType<Observable<object>["subscribe"]>
    | undefined = undefined;
  private playerActionStream: PushStream<PlayerActions> = new PushStream();

  constructor(private keyboardInputStream: Observable<KeyboardState>) {}

  get observable() {
    return this.playerActionStream.observable;
  }

  startSubscription() {
    this.subscription = this.keyboardInputStream.subscribe((k) => {
      this.handler(k);
    });
  }

  closeSubscription() {
    this.subscription?.unsubscribe();
  }

  private handler(keyboardState: KeyboardState) {
    match(keyboardState)
      .with({ ArrowUp: "keyDown", ArrowLeft: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "top-left",
        });
        this.playerActionStream.next({ kind: "playerMoveUpLeft" });
      })
      .with({ ArrowUp: "keyDown", ArrowRight: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "top-right",
        });
        this.playerActionStream.next({ kind: "playerMoveUpRight" });
      })
      .with({ ArrowDown: "keyDown", ArrowLeft: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "bottom-left",
        });
        this.playerActionStream.next({ kind: "playerMoveDownLeft" });
      })
      .with({ ArrowDown: "keyDown", ArrowRight: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "bottom-right",
        });
        this.playerActionStream.next({ kind: "playerMoveDownRight" });
      })
      .with({ ArrowUp: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "top",
        });
        this.playerActionStream.next({ kind: "playerMoveUp" });
      })
      .with({ ArrowDown: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "bottom",
        });
        this.playerActionStream.next({ kind: "playerMoveDown" });
      })
      .with({ ArrowLeft: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "left",
        });
        this.playerActionStream.next({ kind: "playerMoveLeft" });
      })
      .with({ ArrowRight: "keyDown" }, () => {
        this.playerActionStream.next({
          kind: "playerChangeDirection",
          payload: "right",
        });
        this.playerActionStream.next({ kind: "playerMoveRight" });
      })
      .otherwise(() => {});
  }
}
