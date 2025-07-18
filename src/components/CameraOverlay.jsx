import { useRef, useEffect, useState } from 'react'
import * as faceapi from 'face-api.js'
import CheckoutDialog from './CheckoutDialog'
import './CameraOverlay.css'
import { use } from 'react';
// This determines how wide the glasses are relative to the eye distance.
const GLASSES_WIDTH_SCALE = 2.5; 
// This allows you to shift the glasses up or down. Negative values move it up.
const GLASSES_Y_OFFSET = -5; 
const CameraOverlay = ({ selectedItem, onClose, onAddToWishlist, onAddToCart,tryNow }) => {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [isModelLoaded, setIsModelLoaded] = useState(false)
  const [isDetecting, setIsDetecting] = useState(false);
  const [glassesImage, setGlassesImage] = useState(null)
  const [showCheckoutDialog, setShowCheckoutDialog] = useState(false)
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.tinyFaceDetector.loadFromUri('/models')
        await faceapi.nets.faceLandmark68Net.loadFromUri('/models')
        setIsModelLoaded(true)
      } catch (error) {
        console.log('Face detection models not available, using fallback')
      }
    }

    loadModels()
  }, [])
  useEffect(() => {
    const img = new Image()
      img.src = selectedItem?.tryNowImage || 'assets/sunglasses.png'
      img.onload = () => setGlassesImage(img)
      img.onerror = () => {
        console.error("Failed to load glasses image:");
        setGlassesImage(null); 
      }
      console.log("Glasses image loaded:", img.src,selectedItem);
  },[selectedItem]);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 640, height: 480 } 
        })
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  useEffect(() => {
    if (!isModelLoaded || !videoRef.current) return

    const detectFaces = async () => {
      if (!videoRef.current || videoRef.current.readyState !== 4) return

      try {
        const detections = await faceapi
          .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
          .withFaceLandmarks()

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        canvas.width = videoRef.current.videoWidth
        canvas.height = videoRef.current.videoHeight

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        if (detections.length > 0 && selectedItem?.type === 'sunglasses') {
          detections.forEach(detection => {
            const landmarks = detection.landmarks
            const leftEye = landmarks.getLeftEye()
            const rightEye = landmarks.getRightEye()

            if (leftEye.length > 0 && rightEye.length > 0) {
              // Calculate glasses position
              const leftEyeCenter = leftEye.reduce((acc, point) => ({
                x: acc.x + point.x / leftEye.length,
                y: acc.y + point.y / leftEye.length
              }), { x: 0, y: 0 })

              const rightEyeCenter = rightEye.reduce((acc, point) => ({
                x: acc.x + point.x / rightEye.length,
                y: acc.y + point.y / rightEye.length
              }), { x: 0, y: 0 })

              const eyeDistance = Math.sqrt(
                Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) +
                Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
              )

              const angle = Math.atan2(
                rightEyeCenter.y - leftEyeCenter.y,
                rightEyeCenter.x - leftEyeCenter.x
              )

               const midPoint = {
                x: (leftEyeCenter.x + rightEyeCenter.x) / 2,
                y: (leftEyeCenter.y + rightEyeCenter.y) / 2
              }

              const glassesWidth = eyeDistance * GLASSES_WIDTH_SCALE
              const glassesHeight = glassesWidth * (glassesImage.naturalHeight / glassesImage.naturalWidth)

               ctx.save()
              // 3. Translate the canvas context to the midpoint between the eyes
              ctx.translate(midPoint.x, midPoint.y + GLASSES_Y_OFFSET)
              // 4. Rotate the context to match the angle of the head tilt
              ctx.rotate(angle)
              
              // 5. Draw the image. We draw it centered on the new (0,0) of our translated/rotated context.
              ctx.drawImage(
                glassesImage,
                -glassesWidth / 2, // Draw from top-left, so shift left by half the width
                -glassesHeight / 2, // Shift up by half the height
                glassesWidth,
                glassesHeight
              )
              
              ctx.restore()

              // // Draw glasses
              // ctx.save()
              // ctx.translate(leftEyeCenter.x, leftEyeCenter.y - 10)
              // ctx.rotate(angle)
              
              // // Draw sunglasses frame
              // ctx.strokeStyle = '#2a2a2a'
              // ctx.lineWidth = 3
              // ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
              
              // // Left lens
              // ctx.beginPath()
              // ctx.ellipse(-eyeDistance * 0.15, 0, eyeDistance * 0.25, eyeDistance * 0.15, 0, 0, 2 * Math.PI)
              // ctx.fill()
              // ctx.stroke()
              
              // // Right lens
              // ctx.beginPath()
              // ctx.ellipse(eyeDistance * 0.65, 0, eyeDistance * 0.25, eyeDistance * 0.15, 0, 0, 2 * Math.PI)
              // ctx.fill()
              // ctx.stroke()
              
              // // Bridge
              // ctx.beginPath()
              // ctx.moveTo(eyeDistance * 0.1, 0)
              // ctx.lineTo(eyeDistance * 0.4, 0)
              // ctx.stroke()
              
              // ctx.restore()
            }
          })
        }
      } catch (error) {
        console.error('Face detection error:', error)
      }
    }

    const interval = setInterval(detectFaces, 100)
    return () => clearInterval(interval)
  }, [isModelLoaded, selectedItem])

  const handleAddToCart = () => {
    setShowCheckoutDialog(true)
  }

  const handleAddToWishlist = () => {
    onAddToWishlist(selectedItem)
    alert('Added to wishlist!')
  }

  const handleBackButton = () => {
    onClose();
    tryNow(true); // Trigger the Try Now overlay
  }

  return (
    <div className="camera-overlay">
      <div className="camera-content">
        <div className="camera-header">
          <button onClick={handleBackButton}>{"Back"}</button>
          <h2>Try On: {selectedItem?.name}</h2>
          <button className="camera-close" onClick={onClose}>×</button>
        </div>
        
        <div className="camera-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="camera-video"
          />
          <canvas
            ref={canvasRef}
            className="camera-canvas"
          />
          {!isModelLoaded && (
            <div className="loading-overlay">
              <div className="loading-spinner"></div>
              <p>Loading AR features...</p>
            </div>
          )}
        </div>
        
        <div className="camera-actions">
          <button className="action-btn cart-btn" onClick={handleAddToCart}>
            🛒 Add to Cart
          </button>
          <button className="action-btn checkout-btn" onClick={handleAddToCart}>
            💳  1 - Click Pay
          </button>
          <button className="action-btn wishlist-btn" onClick={handleAddToWishlist}>
            ❤️ Add to Wishlist
          </button>
        </div>
        
        <div className="item-details">
          <h3>{selectedItem?.name}</h3>
          <p className="item-price">{selectedItem?.price}</p>
        </div>
      </div>
      
      {showCheckoutDialog && (
        <CheckoutDialog onClose={() => setShowCheckoutDialog(false)} />
      )}
    </div>
  )
}

export default CameraOverlay