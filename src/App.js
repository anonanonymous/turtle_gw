import React from 'react'
import TurtleComponent from './TurtleComponent'
import './App.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src="/tad.png" className="App-logo" alt="logo" /> */}
      </header>
      <TurtleComponent />
      <Footer />
    </div>
  )
}

function Footer() {
  return (
    <footer>
      A project by termek
    </footer>
  )
}

export default App
