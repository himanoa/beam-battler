import { useLayoutEffect, useMemo, useRef } from 'react'
import cls from './style.module.css'
import { Cell } from '../../utils/cell'
import { VisibleEntityRepository } from '../../application/repository/visible-entity-repository'
import { Renderable } from '../../models/renderable'
import { useUiServiceLocator } from '../../ui-service-locator-context'

export function Game() {
  const ref = useRef<HTMLCanvasElement>(null)
  const animationFrameIdCell = useMemo(() => new Cell<number | null>(null), [])
  const { visibleEntityRepository } = useUiServiceLocator()

  useLayoutEffect(() => {
    const canvasDom = ref.current
    if(canvasDom == null) {
      return
    }
    const canvasContext = canvasDom.getContext('2d')
    if(canvasContext == null) {
      return 
    }

    const animationFrameId = requestAnimationFrame(() => main(
      animationFrameIdCell,
      visibleEntityRepository,
      canvasContext
    ))

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

function main(
  animationFrameIdCell: Cell<number | null>,
  visibleEntityRepository: VisibleEntityRepository<Renderable>,
  ctx: CanvasRenderingContext2D
): void {
  for(const entity of visibleEntityRepository) {
    entity.render(ctx)
  }
  const animationFrameId = requestAnimationFrame(() => main(animationFrameIdCell, visibleEntityRepository, ctx))
  animationFrameIdCell.replace(animationFrameId)
}
