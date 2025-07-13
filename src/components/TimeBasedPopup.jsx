import './TimeBasedPopup.css'

const TimeBasedPopup = ({ onClose, onTryNow }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-image">
          <img 
            src="https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400" 
            alt="Stylish Sunglasses" 
          />
        </div>
        <div className="popup-text">
          <h3>Love these sunglasses?</h3>
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