import { Direction } from "./direction"

type GameAction<K extends string, P = unknown> = {
  kind: K,
  payload: P
}

type PlayerActionsMap = {
  playerMoveDown: GameAction<'playerMoveDown'>
  playerMoveUp: GameAction<'playerMoveUp'>
  playerMoveRight: GameAction<'playerMoveRight'>
  playerMoveleft: GameAction<'playerMoveLeft'>
  playerChangeDirection: GameAction<'playerChangeDirection', Direction>
  playerStop: GameAction<'playerStop'>
}

export type PlayerActions = PlayerActionsMap[keyof PlayerActionsMap]

export type GameActions = PlayerActions
