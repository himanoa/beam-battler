import { useLayoutEffect, useMemo, useRef } from 'react'
import cls from './style.module.css'
import { Shooter, computeFillColor, getStartPoint, makePointsIter } from '../../models/shooter'
import { Cell } from '../../utils/cell'

export function Game() {
  const ref = useRef<HTMLCanvasElement>(null)
  const animationFrameIdCell = useMemo(() => new Cell<number | null>(null), [])

  useLayoutEffect(() => {
    const canvasDom = ref.current
    if(canvasDom == null) {
      return
    }
    const canvasContext = canvasDom.getContext('2d')
    if(canvasContext == null) {
      return 
    }

    const animationFrameId = requestAnimationFrame(() => main(animationFrameIdCell, canvasContext))
    animationFrameIdCell.replace(animationFrameId)
    return () => {
      if(animationFrameIdCell.value !== null) {
        cancelAnimationFrame(animationFrameIdCell.value)
      }
    }
  }, [ref, animationFrameIdCell])

  return (
    <canvas id="game" className={cls.game} ref={ref} width={1920} height={1080}>
    </canvas>
  )
}

function main(animationFrameIdCell: Cell<number | null>, ctx: CanvasRenderingContext2D): void {
  const player: Shooter = {
    cordinate: [100, 100],
    areaLength: 30,
    hitBox: {
      cordinate: [100, 100],
      radius: 10
    },
    direction: 'bottom',
    playerNumber: 2
  }

  ctx.lineWidth = 2;

  const startPoint = getStartPoint(player)
  ctx.beginPath();
  ctx.moveTo(...startPoint)
  ctx.fillStyle = computeFillColor(player)

  for(const point of makePointsIter(player)) {
    ctx.lineTo(...point)
  }

  ctx.stroke()
  ctx.fill()
  
  const animationFrameId = requestAnimationFrame(() => main(animationFrameIdCell, ctx))
  animationFrameIdCell.replace(animationFrameId)
}
