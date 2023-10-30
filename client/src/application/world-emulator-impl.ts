import Observable from "zen-observable";
import { PlayerActions, toDirection } from "../models/player-actions";
import { PlayerShooter } from "../models/player-shooter";
import { VisibleEntityRepository } from "./repository/visible-entity-repository";
import { WorldEmulator } from "./world-emulator";
import { match } from "ts-pattern";
import { ColideEvent } from "./collision-simulator";
import { isPlayerMoveAction } from "../models/game-actions";

export class WorldEmulatorImpl implements WorldEmulator {
  private subscription: ReturnType<Observable<object>["subscribe"]> | null =
    null;

  constructor(
    private playerRepository: VisibleEntityRepository,
    private playerStream: Observable<PlayerActions>,
    private onColide: Observable<ColideEvent>,
  ) {}

  emulate() {
    const player = new PlayerShooter(
      self.crypto.randomUUID(),
      [100, 100],
      "top",
    );
    this.playerRepository.store(player);

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

    this.onColide.subscribe(() => {
      console.error("unimplemented colide handle");
    });
  }

  closeEmulator() {
    this.subscription?.unsubscribe();
  }
}
