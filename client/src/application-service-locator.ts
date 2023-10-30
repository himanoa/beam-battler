import { CollisionSimulator } from "./application/collision-simulator";
import { CollisionSimulatorImpl } from "./application/collision-simulator-impl";
import { Kernel } from "./application/kernel";
import { KeyboardInputStreamImpl } from "./application/keyboard-input-stream-impl";
import { PlayerControllerImpl } from "./application/player-controller-impl";
import { VisibleEntityRepositoryImpl } from "./application/repository/visible-entity-repository-impl";
import { WorldEmulatorImpl } from "./application/world-emulator-impl";
import { ServiceLocator } from "./di-context";
import { SceneControllerImpl } from "./scene";

const visibleEntityRepository = new VisibleEntityRepositoryImpl();
const sceneController = new SceneControllerImpl();
const keyboardInputStream = new KeyboardInputStreamImpl();
const playerController = new PlayerControllerImpl(
  keyboardInputStream.observable,
);
const collisionSimulator: CollisionSimulator = new CollisionSimulatorImpl(
  visibleEntityRepository,
  playerController.observable
)

const worldEmulator = new WorldEmulatorImpl(
  visibleEntityRepository,
  playerController.observable,
  collisionSimulator.onColide
);

export const applicationServiceLocator: ServiceLocator = {
  visibleEntityRepository: visibleEntityRepository,
  sceneController: sceneController,
  kernel: new Kernel(
    visibleEntityRepository,
    keyboardInputStream,
    playerController,
    worldEmulator,
    collisionSimulator
  ),
};
