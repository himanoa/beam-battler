import { createRoot } from 'react-dom/client'
import cls from './index.module.css'
import { ApplicationDIContextProvider } from './application-di-context-provider'

const el = document.querySelector('#app')

function Root(): JSX.Element {
  return (
    <ApplicationDIContextProvider>
      <App />
    </ApplicationDIContextProvider>
  )
}

function App(): JSX.Element {
  return (
    <div className={cls.container}>
    </div>
  )
}

if(el) {
  createRoot(el).render(<Root />)
}

