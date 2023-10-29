import { MouseEventHandler, useCallback } from "react";
import { useUiServiceLocator } from "../../ui-service-locator-context";
import cls from "./style.module.css";

export function Title(): JSX.Element {
  const { sceneController } = useUiServiceLocator();

  const onGameStartClick = useCallback<MouseEventHandler>(
    (e) => {
      e.preventDefault();
      sceneController.transitionTo("game");
    },
    [sceneController],
  );

  return (
    <div className={cls.container}>
      <h1 className={cls.title}>ビームバトラー</h1>
      <a className={cls.gameStart} href="" onClick={onGameStartClick}>
        ゲームスタート
      </a>
    </div>
  );
}
