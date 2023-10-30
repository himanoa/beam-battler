import { ColideEvent, CollisionSimulator } from "./collision-simulator";
import { VisibleEntityRepository } from "./repository/visible-entity-repository";
import PushStream from "zen-push";
import { combinations } from "../utils/combinations";
import { distance } from "../models/vector2";
import {
  CircleHitBox,
  LineHitBox,
  findNearestPointOnLine,
} from "../models/hit-box";
import {
  PlayerActions,
  PlayerMoveActions,
  toDirection,
} from "../models/player-actions";
import Observable from "zen-observable";
import {
  filter,
  fromObservable,
  subscribe,
  pipe,
  Subscription,
  fromIterable,
  toArray,
} from "wonka";
import { isPlayerMoveAction } from "../models/game-actions";
import { flip, not } from "../models/direction";
import { isMaterial } from "../models/material";
import { isTeleportable } from "../models/movable";

export class CollisionSimulatorImpl implements CollisionSimulator {
  private lastPlayerActions: PlayerMoveActions | null = null;
  private syncLastPlayerActionsSubscription: Subscription | null = null;
  private colideStream: PushStream<ColideEvent> = new PushStream();

  constructor(
    private visibleEntityRepository: VisibleEntityRepository,
    private playerActions: Observable<PlayerActions>,
  ) {}

  get onColide() {
    return this.colideStream.observable;
  }

  startSimulation() {
    console.log("CollisionSimulator is start simulation");
    this.syncLastPlayerActions();
  }

  closeSimulation() {
    this.colideStream.complete();
    this.syncLastPlayerActionsSubscription?.unsubscribe();
  }

  syncLastPlayerActions() {
    this.syncLastPlayerActionsSubscription = pipe(
      fromObservable(this.playerActions),
      filter(isPlayerMoveAction),
      subscribe((a) => (this.lastPlayerActions = a)),
    );
  }

  isCollided(a: CircleHitBox, b: LineHitBox): boolean {
    const np = findNearestPointOnLine(b, a);
    const d = distance(a.cordinate, np);

    return d <= a.radius;
  }

  resolveColider() {
    for (const [a, b] of combinations(
      pipe(
        fromIterable(this.visibleEntityRepository),
        filter(isMaterial),
        toArray,
      ),
    )) {
      const hanpatsu = 6;
      if (
        a.collide.kind === "circle" &&
        b.collide.kind === "line" &&
        isTeleportable(a) &&
        this.isCollided(a.collide, b.collide) &&
        this.lastPlayerActions != null
      ) {
        const dest = flip(
          a.collide.cordinate,
          not(toDirection(this.lastPlayerActions)),
          hanpatsu,
        );
        this.visibleEntityRepository.store(a.teleport(dest));
      }
      if (
        b.collide.kind === "circle" &&
        a.collide.kind === "line" &&
        isTeleportable(b) &&
        this.isCollided(b.collide, a.collide) &&
        this.lastPlayerActions != null
      ) {
        const dest = flip(
          b.collide.cordinate,
          not(toDirection(this.lastPlayerActions)),
          hanpatsu,
        );
        this.visibleEntityRepository.store(b.teleport(dest));
      }
    }
  }
}
