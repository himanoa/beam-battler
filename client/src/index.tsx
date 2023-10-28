import { createRoot } from 'react-dom/client'
import cls from './index.module.css'
import { Provider } from 'jotai'
import { ApplicationDIContextProvider } from './ApplicationDIContextProvider'
import { useDIContext } from './DIContext'

const el = document.querySelector('#app')

function Root(): JSX.Element {
  return (
    <ApplicationDIContextProvider>
      <App />
    </ApplicationDIContextProvider>
  )
}

function App(): JSX.Element {
  const { store } = useDIContext()

  return (
    <Provider store={store}>
      <div className={cls.container}>
      </div>
    </Provider>
  )
}

if(el) {
  createRoot(el).render(<Root />)
}

