import React from 'react'
import Spline from '@splinetool/react-spline'
import FondoAnimado from './FondoAnimado'

const Hero = () => {
  return (
    <div style={{ 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: '4rem 0'
    }}>
      <FondoAnimado />
      
      {/* Iluminación naranja difuminada superior */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 0%, rgba(255, 165, 0, 0.1) 0%, transparent 70%)',
        zIndex: 0
      }} />
      {/* Iluminación naranja difuminada inferior - más sutil */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'radial-gradient(circle at 0% 100%, rgba(255, 165, 0, 0.05) 0%, transparent 50%)',
        zIndex: 0
      }} />
      
      <div className="container-fluid bg-transparent" style={{ position: 'relative', zIndex: 1 }}>
        <div className="row align-items-center justify-content-center px-4 mx-auto bg-transparent" style={{ maxWidth: '1600px' }}>
          <div className="col-md-6 col-lg-5 bg-transparent order-md-2">
            <div style={{ 
              width: '100%', 
              height: '700px', 
              backgroundColor: 'transparent',
              overflow: 'hidden',
              position: 'relative'
            }}>
              {/* Imagen para móvil */}
              <div className="d-md-none" style={{ 
                width: '100%', 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src="/assets/Elon.png" 
                  alt="Elon" 
                  style={{
                    width: 'auto',
                    height: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </div>
              {/* Spline para pantallas medianas y grandes */}
              <div className="d-none d-md-block" style={{ width: '100%', height: '100%', position: 'relative' }}>
                <Spline 
                  scene="https://prod.spline.design/hS0tcOmPPCrxkMJM/scene.splinecode"
                  style={{ 
                    width: '100%', 
                    height: '100%'
                  }}
                  onLoad={(spline) => {
                    console.log('Spline loaded successfully');
                    spline.setSize(window.innerWidth, window.innerHeight);
                  }}
                  onError={(error) => {
                    console.error('Spline error:', error);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-5 bg-transparent order-md-1">
            <h1 className="display-3 fw-bold mb-4 text-white">I WANT YOU FOR SPACE FORCE</h1>
            <p className="lead mb-4 text-white" style={{ fontSize: '1.25rem' }}>
            $ELONMOON isn't just a token, it's a movement fueled by Elon's vision.
Join this exclusive platform where you can be among the first to buy $ELONMOON and take part in a journey beyond the limits of traditional finance.
Ready for liftoff?
            </p>
            <div className="d-flex gap-3 mb-4">
              <button className="btn btn-primary btn-lg">Connect Wallet</button>
              <button className="btn btn-outline-light btn-lg">More info</button>
            </div>
            <p className="text-white-50" style={{ fontSize: '1.1rem' }}>
            Over 1 million users are already on board.
            Now, Elon is pointing at you.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero 