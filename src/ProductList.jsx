import React, { useState } from 'react';
import './ProductList.css';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, removeItem, updateQuantity } from './CartSlice';


//Photos Imported
import galaxy from "./assets/Images/Galaxy.jpg";
import iphone from "./assets/Images/iphone.jpg";
import pixel from "./assets/Images/pixel.jpg";
import redmi from "./assets/Images/redmi.jpg";
import realme from "./assets/Images/realme.jpg";
import one from "./assets/Images/one.png";
import macpro from "./assets/Images/macpro2.jpg";
import dell from "./assets/Images/dell.jpg";
import rog from "./assets/Images/rog.jpg";
import lenovo from "./assets/Images/lenovo.jpg";
import HP from "./assets/Images/HP.png";
import acer from "./assets/Images/acer.jpg";
import appleWatch from "./assets/Images/appleWatch.jpg";
import galaxyWatch from "./assets/Images/galaxyWatch.jpg";
import Garmin from "./assets/Images/Garmin.jpg";
import fitbit from "./assets/Images/fitbit.jpg";
import amazfit from "./assets/Images/amazfit.jpg";
//import MAXTOP from "./assets/Images/MAXTOP.jpg";
import AirPods from "./assets/Images/AirPods.jpg";
import Sony from "./assets/Images/Sony.jpg";
import logitech from "./assets/Images/logitech.jpg";
//import POWER from "./assets/Images/POWER.jpg";
import Razer from "./assets/Images/Razer.jpg";
import ssd from "./assets/Images/ssd.jpg";
import anker from "./assets/Images/anker.jpg";


//Icon Imported
import Gadget from "./assets/Background/Gadget.png";

//Cart Icon Imported
import Cart from "./assets/Background/Cart.png";

function ProductList({ backToAbout }) {
    const [showCart, setShowCart] = useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const gadgetsArray = [
        {
            category: "Smartphones",
            gadgets: [
                { id: 1, name: "iPhone 15 Pro Max", image: iphone, description: "Flagship Apple smartphone with A17 chip.", cost: 4500 },
                { id: 2, name: "Samsung Galaxy S23 Ultra", image:  galaxy, description: "High-end Android smartphone with 200MP camera.", cost: 4200 },
                { id: 3, name: "Google Pixel 8 Pro", image: pixel, description: "Pure Android experience with excellent AI camera.", cost: 3800 },
                { id: 4, name: "Xiaomi Redmi Note 13", image: redmi, description: "Affordable smartphone with solid performance.", cost: 1200 },
                { id: 5, name: "Realme Narzo 60", image: realme, description: "Budget-friendly phone with large display.", cost: 900 },
                { id: 6, name: "OnePlus 12", image: one, description: "Premium Android phone with fast charging.", cost: 3000 },
            ]
        },
        {
            category: "Laptops",
            gadgets: [
                { id: 7, name: "MacBook Pro 16\" M3", image: macpro, description: "High-end laptop for professionals.", cost: 9000 },
                { id: 8, name: "Dell XPS 15", image: dell, description: "Powerful Windows laptop with sleek design.", cost: 7200 },
                { id: 9, name: "Asus ROG Strix G15", image: rog, description: "Gaming laptop with RTX 4070 GPU.", cost: 6500 },
                { id: 10, name: "Lenovo IdeaPad 3", image: lenovo, description: "Affordable laptop for students.", cost: 1800 },
                { id: 11, name: "HP Pavilion 15", image: HP, description: "Mid-range laptop for everyday use.", cost: 2500 },
                { id: 12, name: "Acer Aspire 5", image: acer, description: "Budget-friendly laptop with good performance.", cost: 1600 },
            ]
        },
        {
            category: "Smartwatches",
            gadgets: [
                { id: 13, name: "Apple Watch Series 9", image: appleWatch, description: "Top-tier smartwatch with health tracking.", cost: 2000 },
                { id: 14, name: "Samsung Galaxy Watch 6", image: galaxyWatch, description: "Premium Android-compatible smartwatch.", cost: 1800 },
                { id: 15, name: "Garmin Forerunner 955", image: Garmin, description: "Best for fitness enthusiasts.", cost: 1500 },
                { id: 16, name: "Fitbit Versa 4", image: fitbit, description: "Affordable smartwatch for tracking health metrics.", cost: 600 },
                { id: 17, name: "Amazfit GTS 4", image: amazfit, description: "Budget smartwatch with long battery life.", cost: 400 },
            ]
        },
        {
            category: "Accessories",
            gadgets: [
                { id: 18, name: "AirPods Pro 2", image: AirPods, description: "High-end wireless earbuds with noise cancellation.", cost: 1000 },
                { id: 19, name: "Sony WH-1000XM5", image: Sony, description: "Premium over-ear headphones.", cost: 1200 },
                { id: 20, name: "Logitech MX Master 3", image: logitech, description: "High-end wireless mouse for productivity.", cost: 450 },
                { id: 21, name: "Anker PowerCore 26800", image: anker, description: "Portable high-capacity power bank.", cost: 250 },
                { id: 22, name: "Razer BlackWidow V4", image: Razer, description: "Mechanical keyboard for gamers.", cost: 700 },
                { id: 23, name: "Samsung T7 SSD 1TB", image: ssd, description: "High-speed external SSD.", cost: 550 },
            ]
        }
    ];

    // Function to find the category of a product by its ID
    const findProductCategory = (productId) => {
        for (const section of gadgetsArray) {
            const product = section.gadgets.find(gadget => gadget.id === productId);
            if (product) {
                return section.category;
            }
        }
        return 'Other'; // fallback category
    };

    // Function to group cart items by category
    const groupCartItemsByCategory = () => {
        const groupedItems = {};
        
        cart.items.forEach(item => {
            const category = findProductCategory(item.id);
            if (!groupedItems[category]) {
                groupedItems[category] = [];
            }
            groupedItems[category].push(item);
        });
        
        return groupedItems;
    };

    // ALL HANDLER FUNCTIONS DEFINED HERE
    const handleAddToCart = (product) => {
        dispatch(addItem(product));
    };

    const handleCheckout = () => {
        alert("Coming soon");
    };

    const calculateCartTotal = () => {
        return cart.items.reduce((total, item) => total + (item.cost * item.quantity), 0);
    };

    const handleIncrement = (item) => {
        console.log('Increment clicked for:', item.name);
        const updatedItem = { ...item };
        updatedItem.quantity++;
        dispatch(updateQuantity(updatedItem));
    };

    const handleDecrement = (item) => {
        console.log('Decrement clicked for:', item.name);
        const updatedItem = { ...item };
        if (updatedItem.quantity === 1) {
            dispatch(removeItem(updatedItem));
        } else {
            updatedItem.quantity--;
            dispatch(updateQuantity(updatedItem));
        }
    };

    const handleRemove = (item) => {
        console.log('Remove clicked for:', item.name);
        dispatch(removeItem(item));
    };

    return (
        <div>
            {/* Navbar */}
            <div className="navbar">
                <div 
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} 
                    onClick={() => {
                        console.log('Logo clicked, calling backToAbout');
                        if (backToAbout) {
                            backToAbout();
                        }
                    }}
                >
                    <img 
                        src= {Gadget}
                        alt="Gadget Store Logo" 
                        style={{ width: '70px', height: '70px' }} 
                    />
                    <div style={{ marginLeft: '10px' }}>
                        <h3 onClick={() => {
                            console.log('Store name clicked, calling backToAbout');
                            if (backToAbout) {
                                backToAbout();
                            }
                        }}>Gadget Store</h3>
                        <i>Where Tech Meets Style</i>
                    </div>
                </div>

                <div className="ul">
                    <div>
                        <a href="#" onClick={(e) => { 
                            e.preventDefault(); 
                            console.log('About Us link clicked');
                            if (backToAbout) {
                                backToAbout(); 
                            }
                        }}>About Us</a>
                    </div>
                    <div 
                        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
                        onClick={() => setShowCart(true)}
                    >
                        <img 
                            src= {Cart}
                            alt="Cart" 
                            style={{ width: '60px', height: '60px' }} 
                        />
                        <span>Cart ({cart.totalQuantity})</span>
                    </div>
                </div>
            </div>

            {!showCart ? (
                <div>
                    {gadgetsArray.map((section) => (
                        <div className="product-grid" key={section.category}>
                            <h2 className="plant_heading">{section.category}</h2>
                            <div className="product-list">
                                {section.gadgets.map((product) => {
                                    const quantityInCart = cart.items.find(i => i.id === product.id)?.quantity || 0;
                                    return (
                                        <div className="product-card" key={product.id}>
                                            <h3 className="product-title">{product.name}</h3>
                                            <img 
                                                className="product-image" 
                                                src={product.image} 
                                                alt={product.name}
                                                style={{
                                                    width: '100%',
                                                    height: '200px',
                                                    objectFit: 'contain',
                                                    objectPosition: 'center',
                                                    backgroundColor: '#f8f9fa',
                                                    borderRadius: '8px',
                                                    border: '1px solid #e0e0e0'
                                                }}
                                            />
                                            <p className="product-price">{product.cost} TND</p>
                                            <p>{product.description}</p>
                                            <button 
                                                className={`product-button ${quantityInCart > 0 ? 'added-to-cart' : ''}`} 
                                                onClick={() => handleAddToCart(product)}
                                            >
                                                {quantityInCart > 0 ? `In Cart (${quantityInCart})` : 'Add to Cart'}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="cart-container">
                    <h2 className="cart-title">Your Shopping Cart</h2>
                    {cart.items.length === 0 ? (
                        <div className="cart-empty">
                            <p>Your cart is empty.</p>
                            <button onClick={() => setShowCart(false)} className="product-button">Start Shopping</button>
                        </div>
                    ) : (
                        <>
                            {Object.entries(groupCartItemsByCategory()).map(([category, items]) => (
                                <div key={category} className="product-grid">
                                    {/* Category Header - Same style as main page */}
                                    <h2 className="plant_heading">{category}</h2>
                                    
                                    {/* Items in this category */}
                                    <div className="cart-category-items">
                                        {items.map((item) => (
                                            <div key={item.id} className="cart-item">
                                                {/* Product Image */}
                                                <img 
                                                    src={item.image} 
                                                    alt={item.name}
                                                    className="cart-item-image"
                                                />
                                                
                                                {/* Product Details */}
                                                <div className="cart-item-details">
                                                    <h3 className="cart-item-name">{item.name}</h3>
                                                    <p className="cart-item-price">
                                                        {item.cost} TND each
                                                    </p>
                                                    <p className="cart-item-subtotal">
                                                        Subtotal: {item.cost * item.quantity} TND
                                                    </p>
                                                </div>

                                                {/* Cart Controls - Fixed for Mobile */}
                                                <div className="cart-controls">
                                                    <div className="quantity-container">
                                                        <button className="cart-quantity-btn" onClick={() => handleDecrement(item)}>-</button>
                                                        <span className="quantity">{item.quantity}</span>
                                                        <button className="cart-quantity-btn" onClick={() => handleIncrement(item)}>+</button>
                                                    </div>
                                                    <button className="cart-remove-btn" onClick={() => handleRemove(item)}>Remove</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            {/* Cart Total */}
                            <div className="cart-total">
                                <h3>Total: {calculateCartTotal()} TND</h3>
                                <p>({cart.totalQuantity} item{cart.totalQuantity !== 1 ? 's' : ''} in cart)</p>
                            </div>
                        </>
                    )}
                    
                    {/* Action Buttons */}
                    <div className="cart-actions">
                        <button 
                            onClick={() => setShowCart(false)} 
                            className="product-button continue-shopping-btn"
                        >
                            Continue Shopping
                        </button>
                        {cart.items.length > 0 && (
                            <button 
                                onClick={handleCheckout} 
                                className="product-button checkout-btn"
                            >
                                Proceed to Checkout
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;