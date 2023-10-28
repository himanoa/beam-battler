import { createRoot } from 'react-dom/client'

const el = document.querySelector('#app')

function App(): JSX.Element {
  return (
    <p>Hello</p>
  )
}

if(el) {
  createRoot(el).render(<App />)
}

