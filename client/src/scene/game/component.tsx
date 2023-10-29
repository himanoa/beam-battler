import { useLayoutEffect, useMemo, useRef } from 'react'
import cls from './style.module.css'
import { Cell } from '../../utils/cell'
import { useUiServiceLocator } from '../../ui-service-locator-context'

export function Game() {
  const ref = useRef<HTMLCanvasElement>(null)
  const animationFrameIdCell = useMemo(() => new Cell<number | null>(null), [])
  const {
    kernel
  } = useUiServiceLocator()

  useLayoutEffect(() => {
    const canvasDom = ref.current
    if(canvasDom == null) {
      return
    }
    const canvasContext = canvasDom.getContext('2d')
    if(canvasContext == null) {
      return 
    }

    kernel.start(canvasContext)

    return () => kernel.cleanUp()
  }, [ref, animationFrameIdCell])

  return (
    <canvas id="game" className={cls.game} ref={ref} width={1920} height={1080}>
    </canvas>
  )
}
