import Observable from "zen-observable";
import { PlayerActions } from "../models/player-actions";

export interface PlayerController {
  get observable(): Observable<PlayerActions>;

  startSubscription(): void;
  closeSubscription(): void;
}
