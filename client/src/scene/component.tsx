import { useAtom } from "jotai"
import { useDIContext } from "../di-context"
import { Title } from "./title/component"

export function SceneRender(): JSX.Element {
  const { sceneController } =  useDIContext()
  const [scene] = useAtom(sceneManager.sceneAtom)

  switch(scene) {
    case 'title':
      return <Title />
    
  }
}
