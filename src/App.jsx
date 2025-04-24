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
        <p className="text-white-20" style={{ fontSize: '1.1rem' }}>
              Disclaimer
              Elmoon.io es una memecoin creada como homenaje paródico al estilo de Elon Musk.
              No está afiliada a Elon Musk, SpaceX, Tesla ni a ninguna entidad relacionada.
              $ELMO es un token descentralizado sin valor garantizado. Participar implica asumir los riesgos del mercado cripto.  crées que podemos añadir este disclaimer en el pié de página de la landing?
            </p>
      </div>
    </div>
  )
}

export default App 