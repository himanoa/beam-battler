import { match } from "ts-pattern";
import { Direction } from "./direction";
import { GameAction } from "./game-action";

type PlayerMoveActionsMap = {
  playerMoveDown: GameAction<"playerMoveDown">;
  playerMoveUp: GameAction<"playerMoveUp">;
  playerMoveRight: GameAction<"playerMoveRight">;
  playerMoveleft: GameAction<"playerMoveLeft">;
  playerMoveUpLeft: GameAction<"playerMoveUpLeft">;
  playerMoveUpRight: GameAction<"playerMoveUpRight">;
  playerMoveDownLeft: GameAction<"playerMoveDownLeft">;
  playerMoveDownRight: GameAction<"playerMoveDownRight">;
}

type PlayerActionsMap = {
  playerChangeDirection: GameAction<"playerChangeDirection", Direction>;
  playerStop: GameAction<"playerStop">;
};

export type PlayerMoveActions = PlayerMoveActionsMap[keyof PlayerMoveActionsMap]

export type PlayerActions = PlayerActionsMap[keyof PlayerActionsMap] |  PlayerMoveActions;


export const toDirection = (a: PlayerMoveActions): Direction => {
  return match<PlayerMoveActions["kind"], Direction>(a.kind)
    .with('playerMoveUp', () => 'top')
    .with('playerMoveDown', () => 'bottom')
    .with('playerMoveLeft', () => 'left')
    .with('playerMoveRight', () => 'right')
    .with('playerMoveUpLeft', () => 'top-left')
    .with('playerMoveUpRight', () => 'top-right')
    .with('playerMoveDownLeft', () => 'bottom-left')
    .with('playerMoveDownRight', () => 'bottom-right')
    .exhaustive()
}
