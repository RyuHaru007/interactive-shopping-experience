import { useState } from 'react'
import VideoPlayer from './components/VideoPlayer'
import './App.css'

function App() {
  return (
    <div className="App">
      <div className="brand-logos">
        <img 
          src="src/assets/comcast.png" 
          alt="Comcast" 
          className="logo comcast-logo"
        />
        <img 
          src="src/assets/cognizant.png" 
          alt="Cognizant" 
          className="logo cognizant-logo"
        />
      </div>
      
      <div className="app-content">
        <div className="hero-section">
          <h1 className="hero-title">Interactive Shopping Experience</h1>
          <p className="hero-subtitle">
            Watch, discover, and try on products with our revolutionary AR technology
          </p>
        </div>
        
        <VideoPlayer />
        
        <div className="features-section">
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">👁️</div>
              <h3>Virtual Try-On</h3>
              <p>Experience products in real-time with our advanced AR technology</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Instant Shopping</h3>
              <p>Add items to cart directly from the video experience</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">❤️</div>
              <h3>Smart Wishlist</h3>
              <p>Save your favorite items for later with our intelligent wishlist</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App