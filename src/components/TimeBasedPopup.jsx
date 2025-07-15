import './TimeBasedPopup.css'

const TimeBasedPopup = ({ onClose, onTryNow }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-image">
          <img 
            src="assets/oakleydisplay.jpeg" 
            alt="Oakley Wind Jacket" 
          />
        </div>
        <div className="popup-text">
          <h3>Love these glasses?</h3>
          <p>Try them on virtually with our AR feature!</p>
        </div>
        <button className="popup-try-btn" onClick={onTryNow}>
          Try Now
        </button>
      </div>
    </div>
  )
}

export default TimeBasedPopup