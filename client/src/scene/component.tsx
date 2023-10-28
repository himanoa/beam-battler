import { useAtom } from "jotai"
import { useDIContext } from "../DIContext"
import { Title } from "./title/component"

export function SceneRender(): JSX.Element {
  const { sceneManager } =  useDIContext()
  const [scene] = useAtom(sceneManager.sceneAtom)

  switch(scene) {
    case 'title':
      return <Title />
  }
}
