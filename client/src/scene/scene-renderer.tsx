import { useAtom } from "jotai";
import { Title } from "./title/component";
import { useUiServiceLocator } from "../ui-service-locator-context";
import { match } from "ts-pattern";
import { Game } from "./game/component";

export function SceneRenderer(): JSX.Element {
  const { sceneAtom } = useUiServiceLocator();
  const [scene] = useAtom(sceneAtom);

  return match(scene)
    .with("title", () => {
      return <Title />;
    })
    .with("game", () => {
      return <Game />;
    })
    .exhaustive();
}
