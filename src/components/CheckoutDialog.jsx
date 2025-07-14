import './CheckoutDialog.css'

const CheckoutDialog = ({ onClose }) => {
  return (
    <div className="checkout-overlay">
      <div className="checkout-content">
        <button className="checkout-close" onClick={onClose}>×</button>
        
        <div className="success-icon">
          <div className="checkmark-circle">
            <div className="checkmark"></div>
          </div>
        </div>
        
        <div className="checkout-text">
          <h2>Order Confirmation</h2>
          <p className="thank-you">Thank you for your order!</p>
          
          <div className="delivery-info">
            <p>Your items will be delivered within 3 days to the following address:</p>
            
            <div className="address-block">
              <div className="address-line">Paul Clarke</div>
              <div className="address-line">2nd Floor, Central Saint Giles</div>
              <div className="address-line">1 St Giles High Street</div>
              <div className="address-line">West End, London</div>
              <div className="address-line">WC2H 8AG</div>
            </div>
            
            <p className="notification-text">We'll notify you once your order is out for delivery.</p>
          </div>
        </div>
        
        <button className="continue-btn" onClick={onClose}>
          Continue Shopping
        </button>
      </div>
    </div>
  )
}

export default CheckoutDialog