// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  useEffect(() => {
    (async () => {
      const response = await fetch('/api/hello?name=Vite')
      const data = await response.text()  
      console.log(data)
    })()
  })

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
      <h1>Mateofy</h1>
    </>
  )
}

export default App
