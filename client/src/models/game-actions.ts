import { Direction } from "./direction";

type GameAction<K extends string, P = null> = P extends null
  ? {
      kind: K;
    }
  : {
      kind: K;
      payload: P;
    };

type PlayerActionsMap = {
  playerMoveDown: GameAction<"playerMoveDown">;
  playerMoveUp: GameAction<"playerMoveUp">;
  playerMoveRight: GameAction<"playerMoveRight">;
  playerMoveleft: GameAction<"playerMoveLeft">;
  playerMoveUpLeft: GameAction<"playerMoveUpLeft">;
  playerMoveUpRight: GameAction<"playerMoveUpRight">;
  playerMoveDownLeft: GameAction<"playerMoveDownLeft">;
  playerMoveDownRight: GameAction<"playerMoveDownRight">;
  playerChangeDirection: GameAction<"playerChangeDirection", Direction>;
  playerStop: GameAction<"playerStop">;
};

export type PlayerActions = PlayerActionsMap[keyof PlayerActionsMap];

export type GameActions = PlayerActions;
