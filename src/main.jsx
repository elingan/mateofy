import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'

const root = createRoot(document.getElementById('root'))
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)

const cover = document.getElementById('cover')
setTimeout(() => {
  cover.style.opacity = 0
  cover.remove()
}, 2000)
