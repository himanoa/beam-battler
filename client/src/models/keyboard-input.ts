export type KeyboardInput = {
  kind: 'keyDown',
  key: string
} | {
  kind: 'keyUp',
  key: string
}


export type KeyState = KeyboardInput["kind"]

export type KeyboardState = {
  ArrowLeft: KeyState,
  ArrowRight: KeyState,
  ArrowUp: KeyState,
  ArrowDown: KeyState
}
