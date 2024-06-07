"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../homepage/navi";
import Biscuits from "./biscuit.jsx";
import Footer from "../components/footer";
import Slider from "../components/imageslider.jsx";
import Cart from "../components/cart";

export default function Page() {
  const mainRef = useRef();
  const cartRef = useRef();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Save cart data to localStorage whenever cart state changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Function to add items to the cart
  const addToCart = (cartItem) => {
    setCart((prevCart) => [...prevCart, cartItem]);
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  const updateCartItemQuantity = (index, newQuantity) => {
    const updatedCart = cart.map((item, i) =>
      i === index ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart); // Update the cart with the new quantity
  };

  const toggleMainShift = () => {
    if (mainRef.current) {
      mainRef.current.classList.toggle("shifted");
    }
  };

  const toggleCartShift = () => {
    if (mainRef.current && cartRef.current) {
      mainRef.current.classList.toggle("shifted-cart");
      cartRef.current.classList.toggle("show-cart");
    }
  };

  return (
    <>
      <Navbar
        toggleMainShift={toggleMainShift}
        toggleCartShift={toggleCartShift}
        cart={cart}
      />
      <main ref={mainRef}>
        <Slider />
        <Biscuits
          cart={cart}
          addToCart={addToCart}
          updateCartItemQuantity={updateCartItemQuantity}
        />
        <div className="fot">
          <Footer />
        </div>
      </main>
      <div ref={cartRef} className="cart-panel">
        <Cart
          cart={cart}
          removeFromCart={removeFromCart}
          updateCartItemQuantity={updateCartItemQuantity}
        />
      </div>
    </>
  );
}
