import './index.css'
import { useState } from 'react'
import { useEffect } from 'react'
import Playlist from './components/Playlist'
import Login from './components/Login'
import Navbar from './components/Navbar'
import { getAccessToken } from './services/auth.js'

function App() {
  const [error, setError] = useState()
  const [token, setToken] = useState()

  useEffect(() => {
    getAccessToken()
      .then((token) => {
        setToken(token)
      })
      .catch(({ message }) => {
        setError(message)
      })
  }, [])

  function renderBody() {
    if (!token) {
      return <Login />
    } else {
      return (
        <div>
          <Navbar />
          <Playlist />
        </div>
      )
    }
  }

  return <>{renderBody()}</>
}

export default App
