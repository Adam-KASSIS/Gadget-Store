import React, { useState, useRef } from 'react';
import ProductList from './ProductList';
import './App.css';
import AboutUs from './AboutUs';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [fadeLanding, setFadeLanding] = useState(false);
  const aboutRef = useRef(null);

  const handleGetStartedClick = () => {
    // Start fade-out immediately
    setFadeLanding(true);

    // Scroll to About Us slightly after fade starts
    setTimeout(() => {
      if (aboutRef.current) {
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100); // 100ms delay to sync with fade start

    // Show Product List after fade and scroll (~400ms)
    setTimeout(() => {
      setShowProductList(true);
    }, 400);
  };

  const handleBackToAbout = () => {
    setShowProductList(false);
    // Scroll back to About Us smoothly
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // Fade landing back in
    setFadeLanding(false);
  };

  return (
    <div className="app-container">
      <div className={`landing-page ${fadeLanding ? 'fade-out' : ''}`}>
        <div className="background-overlay"></div>
        <div className="content">
          {/* Hero Section */}
          <div className="landing_content hero_section">
            <h1>Paradise Tech</h1>
            <div className="divider"></div>
            <p>Innovation Rooted in Nature</p>
            <button
              className="get-started-button"
              onClick={handleGetStartedClick}
            >
              Enter
            </button>
          </div>

          {/* About Us Section */}
          <div ref={aboutRef} className="aboutus_container">
            <AboutUs />
          </div>
        </div>
      </div>

      {/* Product List Overlay */}
      <div
        className={`product-list-container ${
          showProductList ? 'visible' : ''
        }`}
      >
        <ProductList backToAbout={handleBackToAbout} />
      </div>
    </div>
  );
}

export default App;
