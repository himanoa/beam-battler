export type GameAction<K extends string, P = null> = P extends null
  ? {
      kind: K;
    }
  : {
      kind: K;
      payload: P;
    };
