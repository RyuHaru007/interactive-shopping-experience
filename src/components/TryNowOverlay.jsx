import './TryNowOverlay.css'

const TryNowOverlay = ({ onClose, onItemSelect }) => {
  const items = [
    {
      id: 1,
      name: 'Classic Wayfarer Sunglasses',
      image: 'assets/raybans.jpg',
      price: '$89.99',
      tryNowImage: 'assets/sunglasses.png',
      type: 'sunglasses'
    },
    {
      id: 2,
      name: 'Vintage Round Glasses',
      image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=400',
      tryNowImage: 'assets/oakley.png',
      price: '$69.99',
      type: 'sunglasses'
    }
  ]
  const similarItems = [
    {
      id: 1,
      name: 'Aviator Sunglasses',
      image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=400',
      tryNowImage: 'assets/roundglasses.png',
      price: '$189.99',
      type: 'sunglasses'
    },
    {
      id: 2,
      name: 'Cat-Eye Glasses',
      image: 'assets/cateye.jpg',
      tryNowImage: 'assets/sunglasses.png',
      price: '$39.99',
      type: 'sunglasses'
    },
    {
      id: 3,
      name: 'Blue Sunglasses',
      image: 'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=400',
      price: '$9.99',
      tryNowImage: 'assets/sunglasses.png',
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

        <div className="overlay-subheader">
          <h2>Similar Products</h2>
        </div>
        <div className="items-grid">
          {similarItems.map(item => (
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