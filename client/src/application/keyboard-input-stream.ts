import Observable from "zen-observable";
import { KeyboardState } from "../models/keyboard-input";


export interface KeyboardInputStream {
  get observable(): Observable<KeyboardState>

  startSubscription(): void

  closeSubscription(): void
}
