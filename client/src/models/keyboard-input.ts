export type KeyboardInput = {
  kind: 'keyDown',
  key: string
} | {
  kind: 'keyUp',
  key: string
}


export type KeyState = KeyboardInput["kind"]

export const supportedKeys = [
  'ArrowLeft',
  'ArrowRight',
  'ArrowUp',
  'ArrowDown'
] as const

export type KeyboardState = {
  [K in typeof supportedKeys[number]]: KeyState
}

export const isSupportedKey = (key: string): key is keyof KeyboardState  => {
  return (supportedKeys as readonly string[]).includes(key)
}

export const buildInitialKeyboardState = (): KeyboardState => {
  return {
    ArrowLeft: 'keyUp',
    ArrowRight: 'keyUp',
    ArrowUp: 'keyUp',
    ArrowDown: 'keyUp',
  }
}
