import { useState } from 'react'
import './index.css'
import { useEffect } from 'react'
import Playlist from './components/Playlist'
import Login from './components/Login'
import Navbar from './components/Navbar'
// import Playback from './components/Playback.jsx'

function App() {
  const [token, setToken] = useState('')

  // useEffect(() => {
  //   async function loading() {
  //     console.log('Loading...');
  //     await new Promise((resolve) => setTimeout(resolve, 1000))
  //     console.log('Loaded!')
  //   }
  //   loading()
  // })

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
      return <Login />
    } else {
      return (
        <div>
          <Navbar />
          {/* <Playback /> */}
          <Playlist />
        </div>
      )
    }
  }

  return <>{renderBody()}</>
}

export default App
