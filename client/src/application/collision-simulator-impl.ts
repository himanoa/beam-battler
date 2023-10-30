import { ColideEvent, CollisionSimulator } from "./collision-simulator";
import { VisibleEntityRepository } from "./repository/visible-entity-repository";
import PushStream from "zen-push";
import { combinations } from "../utils/combinations";
import { distance } from "../models/vector2";
import { CircleHitBox, LineHitBox, findNearestPointOnLine } from "../models/hit-box";
import { PlayerActions, PlayerMoveActions, toDirection } from "../models/player-actions";
import Observable from "zen-observable";
import { filter, fromObservable, subscribe, pipe, Subscription } from 'wonka'
import { isPlayerMoveAction } from "../models/game-actions";
import { reverseDirection } from "../models/direction";
import { Cell } from "../utils/cell";

export class CollisionSimulatorImpl implements CollisionSimulator {
  private lastPlayerActions: PlayerMoveActions | null = null
  private syncLastPlayerActionsSubscription: Subscription | null =  null
  private animationFrameId: Cell<number | null> = new Cell(null) 

  constructor(
    private visibleEntityRepository: VisibleEntityRepository,
    private colideStream: PushStream<ColideEvent> = new PushStream(),
    private playerActions: Observable<PlayerActions>
  ) {
  }

  get onColide() {
    return this.colideStream.observable
  }

  startSimulation() {
    this.animationFrameId.replace(requestAnimationFrame(() => { this.loop() }))
    this.syncLastPlayerActions()
  }

  closeSimulation() {
    this.colideStream.complete()
    this.syncLastPlayerActionsSubscription?.unsubscribe()
    if(this.animationFrameId.value != null) {
      cancelAnimationFrame(this.animationFrameId.value)
    }
  }

  syncLastPlayerActions() {
    this.syncLastPlayerActionsSubscription = pipe(
      fromObservable(this.playerActions),
      filter(isPlayerMoveAction),
      subscribe((a) => this.lastPlayerActions = a)
    )
  }

  isCollided(a: CircleHitBox, b: LineHitBox): boolean {
    const np = findNearestPointOnLine(b, a)
    const d = distance(a.cordinate, np )

    return d <= a.radius
  }

  loop() {
    for(const [a, b] of combinations(Array.from(this.visibleEntityRepository))) {
      if(
        a.collide.kind === 'circle' &&
        b.collide.kind === 'line' &&
        this.isCollided(a.collide, b.collide) &&
        this.lastPlayerActions != null
      ) {
          this.colideStream.next({
            a: a.id,
            b: b.id,
            moveEntityId: a.id,
            direction: reverseDirection(toDirection(this.lastPlayerActions)),
            size: a.collide.radius
          })
      }
      if(
        b.collide.kind === 'circle' &&
        a.collide.kind === 'line' &&
        this.isCollided(b.collide, a.collide) &&
        this.lastPlayerActions != null
      ) {
          this.colideStream.next({
            a: a.id,
            b: b.id,
            moveEntityId: b.id,
            direction: reverseDirection(toDirection(this.lastPlayerActions)),
            size: b.collide.radius
          })
      }
    }
    this.animationFrameId.replace(requestAnimationFrame(() => this.loop()))
  }
}
