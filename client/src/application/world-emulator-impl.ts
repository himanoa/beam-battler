import Observable from "zen-observable";
import { PlayerActions, toDirection } from "../models/player-actions";
import { PlayerShooter } from "../models/player-shooter";
import { VisibleEntityRepository } from "./repository/visible-entity-repository";
import { WorldEmulator } from "./world-emulator";
import { match } from "ts-pattern";
import { ColideEvent } from "./collision-simulator";
import { isPlayerMoveAction } from "../models/game-actions";
import { Wall } from "../models/wall";
import { isTeleportable } from "../models/movable";
import { flip } from "../models/direction";

export class WorldEmulatorImpl implements WorldEmulator {
  private subscription: ReturnType<Observable<object>["subscribe"]> | null =
    null;

  constructor(
    private playerRepository: VisibleEntityRepository,
    private playerStream: Observable<PlayerActions>,
    private onColide: Observable<ColideEvent>,
  ) {}

  emulate() {
    const entities = this.entities();
    const [player] = entities;
    for (const e of entities) {
      this.playerRepository.store(e);
    }

    this.playerStream.subscribe((e) => {
      this.playerRepository.store(
        match(e)
          .with({ kind: "playerChangeDirection" }, ({ payload }) => {
            return player.changeDirection(payload);
          })
          .otherwise((e) => {
            if (isPlayerMoveAction(e)) {
              return player.move(toDirection(e));
            }
            return player;
          }),
      );
    });

    this.onColide.subscribe(({ moveEntityId, direction, size }) => {
      const entity = this.playerRepository.resolve(moveEntityId);
      if (
        entity == null ||
        !isTeleportable(entity) ||
        entity.collide.kind === "line"
      ) {
        return;
      }
      const dest = flip(entity.collide.cordinate, direction, size);
      this.playerRepository.store(entity.teleport(dest));
    });
  }

  closeEmulator() {
    this.subscription?.unsubscribe();
  }

  entities(): [PlayerShooter, Wall, Wall, Wall, Wall] {
    return [
      new PlayerShooter(self.crypto.randomUUID(), [100, 100], "top"),
      new Wall(self.crypto.randomUUID(), [0, 0], [0, 1080]),
      new Wall(self.crypto.randomUUID(), [0, 0], [1920, 0]),
      new Wall(self.crypto.randomUUID(), [1920, 0], [1920, 1080]),
      new Wall(self.crypto.randomUUID(), [0, 1080], [1920, 1080]),
    ];
  }
}
