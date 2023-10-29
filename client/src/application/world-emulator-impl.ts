import Observable from "zen-observable";
import { PlayerActions } from "../models/game-actions";
import { PlayerShooter } from "../models/player-shooter";
import { VisibleEntityRepository } from "./repository/visible-entity-repository";
import { WorldEmulator } from "./world-emulator";
import { match } from "ts-pattern";
import { Renderable } from "../models/renderable";

export class WorldEmulatorImpl implements WorldEmulator {
  private subscription: ReturnType<Observable<object>["subscribe"]> | null = null

  constructor(
    private playerRepository: VisibleEntityRepository<Renderable>,
    private playerStream: Observable<PlayerActions>
  ) {
  }

  emulate() {
    const player = new PlayerShooter(
      self.crypto.randomUUID(),
      [100, 100],
      'top'
    )
    this.playerRepository.store(player)

    this.playerStream.subscribe((e) => {
      this.playerRepository.store(match(e)
        .with({ kind: 'playerMoveUp' }, () => {
          return player.move('top')
        })
        .with({ kind: 'playerMoveDown' }, () => {
          return player.move('bottom')
        })
        .with({ kind: 'playerMoveLeft' }, () => {
          return player.move('left')
        })
        .with({ kind: 'playerMoveRight' }, () => {
          return player.move('right')
        })
        .with({ kind: 'playerMoveUpLeft' }, () => {
          return player.move('top-left')
        })
        .with({ kind: 'playerMoveUpRight' }, () => {
          return player.move('top-right')
        })
        .with({ kind: 'playerMoveDownLeft' }, () => {
          return player.move('bottom-left')
        })
        .with({ kind: 'playerMoveDownRight' }, () => {
          return player.move('bottom-right')
        }).otherwise(() => player))
    })
  }

  closeEmulator() {
    this.subscription?.unsubscribe()
  }
}
