import cls from './style.module.css'

export function Title(): JSX.Element {
  return (
    <div className={cls.container}>
      <h1 className={cls.title}>
        ビームバトラー
      </h1>
      <a className={cls.gameStart} href="">
        ゲームスタート
      </a>
    </div>
  )
}
