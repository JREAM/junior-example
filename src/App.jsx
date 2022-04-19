import { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'

function App() {

  useEffect(() => {
    return;
    // fetch('https://endpoint')
    //   .then(res => res.json())
    //   .then(data => {
    //   console.log(data)
    // })
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>

        <p>
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
      </header>
    </div>
  )
}

export default App
