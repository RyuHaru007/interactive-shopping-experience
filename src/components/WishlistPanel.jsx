import './WishlistPanel.css'

const WishlistPanel = ({ items, onClose, onItemSelect }) => {
  return (
    <div className="wishlist-overlay">
      <div className="wishlist-content">
        <div className="wishlist-header">
          <h2>My Wishlist ({items.length})</h2>
          <button className="wishlist-close" onClick={onClose}>×</button>
        </div>
        
        {items.length === 0 ? (
          <div className="empty-wishlist">
            <p>Your wishlist is empty</p>
            <p className="empty-subtitle">Add items you love to see them here</p>
          </div>
        ) : (
          <div className="wishlist-items">
            {items.map(item => (
              <div 
                key={item.id} 
                className="wishlist-item"
                onClick={() => {
                  onItemSelect(item)
                  onClose()
                }}
              >
                <div className="wishlist-item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="wishlist-item-info">
                  <h4>{item.name}</h4>
                  <p className="wishlist-item-price">{item.price}</p>
                </div>
                <button className="try-again-btn">
                  Try Again
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPanel