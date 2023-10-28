import { Direction } from "./direction"
import { HitBox } from "./hit-box"
import { Vector2 } from "./vector2"

export type Shooter = {
  cordinate: Vector2
  areaLength: number
  hitBox: HitBox,
  direction: Direction,
  playerNumber: 1 | 2 | 3 | 4
}

export function getStartPoint(s: Shooter): Vector2 {
  const [x,y] = s.cordinate
  switch(s.direction) {
    case 'left': {
      return [x - s.areaLength, y]
    }
    case 'right': {
      return [x + s.areaLength, y]
    }
    case 'top': {
      return [x, y - s.areaLength]
    }
    case 'bottom': {
      return [x, y + s.areaLength]
    }
  }
}
export function *makePointsIter(s: Shooter): Generator<Vector2> {
  const [x,y] = s.cordinate
  switch(s.direction) {
    case 'left': {
      yield [x - s.areaLength, y]
      yield [x + s.areaLength, y - s.areaLength]
      yield [x + s.areaLength, y + s.areaLength]
      yield [x - s.areaLength, y]
      break
    }
    case 'right': {
      yield [x + s.areaLength, y]
      yield [x - s.areaLength, y - s.areaLength]
      yield [x - s.areaLength, y + s.areaLength]
      yield [x + s.areaLength, y]
      break
    }
    case 'top': {
      yield [x, y - s.areaLength]
      yield [x - s.areaLength, y + s.areaLength]
      yield [x + s.areaLength, y + s.areaLength]
      yield [x, y - s.areaLength]
      break
    }
    case 'bottom': {
      yield [x, y + s.areaLength]
      yield [x - s.areaLength, y - s.areaLength]
      yield [x + s.areaLength, y - s.areaLength]
      yield [x, y + s.areaLength]
      break
    }
  }
}

export function computeFillColor(shooter: Shooter): string {
  switch(shooter.playerNumber) {
    case 1: {
      return '#fad4db'
    }
    case 2: {
      return '#faf5d4'
    }
    case 3: {
      return '#dad4fa'
    }
    case 4: {
      return '#d6fad4'
    }
  }
}

export function computeStrokeColor(): string {
  return '#2d334a'
}