import { PlayerActions, PlayerMoveActions } from "./player-actions";

export type GameActions = PlayerActions;

export const isPlayerMoveAction = (a: GameActions): a is PlayerMoveActions => {
  return [
    "playerMoveDown",
    "playerMoveUp",
    "playerMoveRight",
    "playerMoveleft",
    "playerMoveUpLeft",
    "playerMoveUpRight",
    "playerMoveDownLeft",
    "playerMoveDownRight",
  ].includes(a.kind)
}
