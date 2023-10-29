import PushStream from "zen-push";
import {
  KeyboardState,
  buildInitialKeyboardState,
  isSupportedKey,
} from "../models/keyboard-input";
import { KeyboardInputStream } from "./keyboard-input-stream";
import { Cell } from "../utils/cell";

export class KeyboardInputStreamImpl implements KeyboardInputStream {
  private keyboardState: KeyboardState = buildInitialKeyboardState();
  private keyboardInputStream: PushStream<KeyboardState> = new PushStream();
  private clear: (() => void) | null = null;
  private requestAnimationFrameId: Cell<number | null> = new Cell(null);

  constructor() {}

  startSubscription() {
    if (this.clear != null) {
      throw new Error("Subscription is already started");
    }

    const keyUpHandler = (event: KeyboardEvent): void => {
      if (
        isSupportedKey(event.key) &&
        this.keyboardState[event.key] == "keyDown"
      ) {
        this.keyboardState[event.key] = "keyUp";
      }
    };

    const keyDownHandler = (event: KeyboardEvent): void => {
      if (
        isSupportedKey(event.key) &&
        this.keyboardState[event.key] == "keyUp"
      ) {
        this.keyboardState[event.key] = "keyDown";
      }
    };

    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);

    const loop = () => {
      this.pushState();
      const id = requestAnimationFrame(() => loop());
      this.requestAnimationFrameId.replace(id);
    };

    requestAnimationFrame(loop);

    this.clear = () => {
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      if (this.requestAnimationFrameId.value != null) {
        cancelAnimationFrame(this.requestAnimationFrameId.value);
      }
    };
  }

  closeSubscription() {
    this.clear?.();
    this.clear = null;
  }

  get observable() {
    return this.keyboardInputStream.observable;
  }

  private pushState() {
    this.keyboardInputStream.next(this.keyboardState);
  }
}
