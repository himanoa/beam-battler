import { useRef } from 'react'
import cls from './style.module.css'

export function Game() {
  const ref = useRef<HTMLCanvasElement>(null)

  return (
    <canvas id="game" className={cls.game} ref={ref}>
    </canvas>
  )
}
