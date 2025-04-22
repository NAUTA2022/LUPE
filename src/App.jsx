import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BackgroundImage from './components/BackgroundImage'

function App() {
  return (
    <div className="App" style={{ 
      position: 'relative',
      width: '100vw', 
      minHeight: '100vh', 
      margin: 0,
      padding: 0,
      overflowX: 'hidden',
      backgroundColor: 'transparent'
    }}>
      <BackgroundImage />
      <div style={{ 
        position: 'relative', 
        zIndex: 2,
        backgroundColor: 'transparent'
      }}>
        <Navbar />
        <main style={{ 
          width: '100%',
          backgroundColor: 'transparent'
        }}>
          <Hero />
        </main>
      </div>
    </div>
  )
}

export default App 