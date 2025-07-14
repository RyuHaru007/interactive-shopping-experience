import { useState, useRef, useEffect } from 'react'
import TryNowOverlay from './TryNowOverlay'
import CameraOverlay from './CameraOverlay'
import WishlistPanel from './WishlistPanel'
import TimeBasedPopup from './TimeBasedPopup'
import './VideoPlayer.css'

const VideoPlayer = () => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [showTryNowOverlay, setShowTryNowOverlay] = useState(false)
  const [showCameraOverlay, setShowCameraOverlay] = useState(false)
  const [showWishlist, setShowWishlist] = useState(false)
  const [showTimeBasedPopup, setShowTimeBasedPopup] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [wishlistItems, setWishlistItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [hasTriggeredPopup, setHasTriggeredPopup] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const triggerTime = 24 // Show popup at 10 seconds

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const current = video.currentTime
      setCurrentTime(current)
      
      // Trigger popup at specific time (only when playing normally)
      if (current >= triggerTime && current <= triggerTime + 1 && 
          isPlaying && !hasTriggeredPopup) {
        setShowTimeBasedPopup(true)
        setHasTriggeredPopup(true)
      }
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration)
    }

    const handleEnded = () => {
      setIsPlaying(false)
    }

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('ended', handleEnded)
    }
  }, [isPlaying, hasTriggeredPopup])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (isPlaying) {
      video.pause()
    } else {
      video.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleSeek = (e) => {
    const video = videoRef.current
    const progress = e.target.value
    video.currentTime = (progress / 100) * duration
    setCurrentTime(video.currentTime)
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100
    setVolume(newVolume)
    videoRef.current.volume = newVolume
  }

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleTryNowClick = () => {
    setShowTryNowOverlay(true)
  }

  const handleItemSelect = (item) => {
    setSelectedItem(item)
    setShowTryNowOverlay(false)
    setShowCameraOverlay(true)
  }

  const addToWishlist = (item) => {
    if (!wishlistItems.find(i => i.id === item.id)) {
      setWishlistItems([...wishlistItems, item])
    }
  }

  const addToCart = (item) => {
    setCartItems([...cartItems, item])
  }

  const toggleFullscreen = async () => {
    const container = document.querySelector('.video-player-container')
    
    if (!document.fullscreenElement) {
      try {
        await container.requestFullscreen()
      } catch (error) {
        console.error('Error entering fullscreen:', error)
      }
    } else {
      try {
        await document.exitFullscreen()
      } catch (error) {
        console.error('Error exiting fullscreen:', error)
      }
    }
  }

  return (
    <div className="video-player-container">
      <div className="video-wrapper">
        <video
          ref={videoRef}
          className="video-element"
          preload="metadata"
        >
          <source src="src/assets/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        <div className="video-controls">
          <button className="play-button" onClick={togglePlay}>
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          
          <div className="progress-container">
            <input
              type="range"
              min="0"
              max="100"
              value={duration ? (currentTime / duration) * 100 : 0}
              onChange={handleSeek}
              className="progress-bar"
            />
          </div>
          
          <div className="time-display">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
          
          <div className="volume-container">
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="volume-bar"
            />
          </div>
          
          <button className="try-now-btn" onClick={handleTryNowClick}>
            Try Now
          </button>
          
          <button 
            className="wishlist-btn"
            onClick={() => setShowWishlist(!showWishlist)}
          >
            ❤️ ({wishlistItems.length})
          </button>
          
          <button className="fullscreen-btn" onClick={toggleFullscreen}>
            {isFullscreen ? '⛶' : '⛶'}
          </button>
        </div>
      </div>

      {showTimeBasedPopup && (
        <TimeBasedPopup
          onClose={() => setShowTimeBasedPopup(false)}
          onTryNow={() => {
            setShowTimeBasedPopup(false)
            setShowTryNowOverlay(true)
          }}
        />
      )}

      {showTryNowOverlay && (
        <TryNowOverlay
          onClose={() => setShowTryNowOverlay(false)}
          onItemSelect={handleItemSelect}
        />
      )}

      {showCameraOverlay && (
        <CameraOverlay
          selectedItem={selectedItem}
          onClose={() => setShowCameraOverlay(false)}
          onAddToWishlist={addToWishlist}
          onAddToCart={addToCart}
          tryNow={setShowTryNowOverlay}
        />
      )}

      {showWishlist && (
        <WishlistPanel
          items={wishlistItems}
          onClose={() => setShowWishlist(false)}
          onItemSelect={handleItemSelect}
        />
      )}
    </div>
  )
}

export default VideoPlayer