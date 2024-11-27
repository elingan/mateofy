import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import SpotifyWeb from './components/SpotifyWeb'

function App() {
  const [token, setToken] = useState('')

  useEffect(() => {
    async function getToken() {
      const response = await fetch('/api/auth/token')
      const token = await response.text()
      setToken(token)
    }
    getToken()
  }, [])

  function renderBody() {
    if (token === '') {
      return <a href='/api/auth/login'>Login</a>
    } else {
      return <SpotifyWeb />
    }
  }

  return (
    <>
      {/* <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      {renderBody()}
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  )
}

export default App
