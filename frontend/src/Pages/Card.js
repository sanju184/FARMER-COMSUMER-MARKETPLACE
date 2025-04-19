

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Card.css";

// const Cart = () => {
//     const navigate = useNavigate();
//     const [cart, setCart] = useState([]);

//     useEffect(() => {
//         const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
//         setCart(storedCart);
//     }, []);

//     const removeFromCart = (index) => {
//         const updatedCart = cart.filter((_, i) => i !== index);
//         setCart(updatedCart);
//         localStorage.setItem("cart", JSON.stringify(updatedCart));
//     };

//     const getTotalPrice = () => {
//         return cart.reduce((total, item) => total + item.price, 0);
//     };

//     const placeOrder = () => {
//         alert("Order placed successfully!");
//         localStorage.removeItem("cart");
//         setCart([]);
//         navigate('/');
//     };

//     return (
//         <div className="cart-container">
//             <h2>Shopping Cart</h2>
//             {cart.length === 0 ? (
//                 <p>Your cart is empty.</p>
//             ) : (
//                 <div>
//                     {cart.map((item, index) => (
//                         <div key={index} className="cart-item">
//                             <img src={`${item.image}`} alt={item.name} />
//                             <div>
//                                 <h3>{item.name}</h3>
//                                 <p>{item.description}</p>
//                                 <p className="cart-price">Price: ₹{item.price}</p>
//                                 <button onClick={() => removeFromCart(index)} className="remove-btn">Remove</button>
//                             </div>
//                         </div>
//                     ))}
//                     <h3>Total Price: ₹{getTotalPrice()}</h3>
//                     <button className="order-btn" onClick={placeOrder}>Place Order</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Cart;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Card.css";

const Cart = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useState([]);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price, 0);
    };

    const placeOrder = () => {
        setShowPaymentModal(true); // Show payment modal after placing the order
    };

    const handlePayment = () => {
        alert(`Payment of ₹${getTotalPrice()} via ${selectedPaymentMethod} was successful!`);
        localStorage.removeItem("cart");
        setCart([]);
        setShowPaymentModal(false);
        navigate('/');
    };

    return (
        <div className="cart-container">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    {cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={`${item.image}`} alt={item.name} />
                            <div>
                                <h3>{item.name}</h3>
                                <p>{item.description}</p>
                                <p className="cart-price">Price: ₹{item.price}</p>
                                <button onClick={() => removeFromCart(index)} className="remove-btn">Remove</button>
                            </div>
                        </div>
                    ))}
                    <h3>Total Price: ₹{getTotalPrice()}</h3>
                    <button className="order-btn" onClick={placeOrder}>Place Order</button>
                </div>
            )}

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="payment-modal">
                    <h3>Select Payment Method</h3>
                    <div>
                        <button onClick={() => setSelectedPaymentMethod('Credit Card')}>Credit Card</button>
                        <button onClick={() => setSelectedPaymentMethod('UPI')}>UPI</button>
                        <button onClick={() => setSelectedPaymentMethod('PayPal')}>PayPal</button>
                    </div>
                    {selectedPaymentMethod && (
                        <div>
                            <p>You have selected {selectedPaymentMethod}.</p>
                            <button className="confirm-payment-btn" onClick={handlePayment}>Confirm Payment</button>
                        </div>
                    )}
                    <button className="cancel-btn" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default Cart;