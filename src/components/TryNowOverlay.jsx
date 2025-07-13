import './TryNowOverlay.css'

const TryNowOverlay = ({ onClose, onItemSelect }) => {
  const items = [
    {
      id: 1,
      name: 'Classic Aviator Sunglasses',
      image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$89.99',
      type: 'sunglasses'
    },
    {
      id: 2,
      name: 'Vintage Round Glasses',
      image: 'https://images.pexels.com/photos/1456613/pexels-photo-1456613.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$69.99',
      type: 'glasses'
    },
    {
      id: 3,
      name: 'Sport Performance Glasses',
      image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$129.99',
      type: 'sunglasses'
    },
    {
      id: 4,
      name: 'Designer Cat Eye',
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$149.99',
      type: 'sunglasses'
    }
  ]

  return (
    <div className="overlay">
      <div className="overlay-content">
        <div className="overlay-header">
          <h2>Try Our Collection</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="items-grid">
          {items.map(item => (
            <div 
              key={item.id} 
              className="item-card"
              onClick={() => onItemSelect(item)}
            >
              <div className="item-image">
                <img src={item.image} alt={item.name} />
                <div className="item-overlay">
                  <span className="try-text">Try On</span>
                </div>
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-price">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TryNowOverlay