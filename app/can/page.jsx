"use client";
import React, { useRef, useState, useEffect } from "react";
import Navbar from "../homepage/navi";
import Can from "./cangoods.jsx";
import Footer from "../components/footer";
import Slider from "../components/imageslider.jsx";
import Cart from "../components/cart";
import supabase from "../config/supabaseClient";

export default function Page() {
  const mainRef = useRef();
  const cartRef = useRef();
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);
  const [productCount, setProductCount] = useState(0); // State to hold product count

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      console.log(user);
      setUserId(user?.id);
      setEmail(user?.email);
      // console.log(user?.email);
    }
    getUser();
  }, []);

  // Function to toggle the main section shift class
  const toggleMainShift = () => {
    mainRef.current?.classList.toggle("shifted");
  };

  // Function to toggle the cart panel visibility
  const toggleCartShift = () => {
    mainRef.current?.classList.toggle("shifted-cart");
    cartRef.current?.classList.toggle("show-cart");
  };

  // Function to update the product count
  const handleProductCountChange = (count) => {
    setProductCount(count);
  };

  return (
    <>
      <Navbar
        toggleMainShift={toggleMainShift}
        toggleCartShift={toggleCartShift}
        productCount={productCount}
      />
      <main ref={mainRef}>
        <Slider />
        <Can userId={userId} email={email} />
        <div className="fot">
          <Footer />
        </div>
      </main>
      <div ref={cartRef} className="cart-panel">
        <Cart
          userId={userId}
          onProductCountChange={handleProductCountChange}
          email={email}
        />
      </div>
    </>
  );
}
