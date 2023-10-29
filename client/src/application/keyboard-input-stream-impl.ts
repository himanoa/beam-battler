import PushStream from "zen-push";
import { KeyboardState, buildInitialKeyboardState, isSupportedKey } from "../models/keyboard-input";
import { KeyboardInputStream } from "./keyboard-input-stream";

export class KeyboardInputStreamImpl implements KeyboardInputStream {
  private keyboardState: KeyboardState = buildInitialKeyboardState()
  private keyboardInputStream: PushStream<KeyboardState> = new PushStream()
  private clear: (() => void) | null = null

  constructor() {}

  startSubscription() {
    if(this.clear != null) {
      throw new Error("Subscription is already started")
    }

    const keyUpHandler = (event: KeyboardEvent): void => {
      if(isSupportedKey(event.key) && this.keyboardState[event.key] == 'keyDown') {
        this.keyboardState[event.key] = 'keyUp'
        this.pushState()
      }
    }

    const keyDownHandler = (event: KeyboardEvent): void => {
      if(isSupportedKey(event.key) && this.keyboardState[event.key] == 'keyUp') {
        this.keyboardState[event.key] = 'keyDown'
        this.pushState()
      }
    }

    document.addEventListener('keydown', keyDownHandler) 
    document.addEventListener('keyup', keyUpHandler) 

    this.clear = () => {
      document.removeEventListener('keydown', keyDownHandler)
      document.removeEventListener('keyup', keyUpHandler)
    }
  }

  closeSubscription() {
    this.clear?.()
    this.clear = null
  }

  get observable() {
    return this.keyboardInputStream.observable
  }

  private pushState() {
    this.keyboardInputStream.next(this.keyboardState)
  }
}
