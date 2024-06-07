import React, { useRef, useState, useEffect } from "react";
import "./home.css";
import "./bg home.css";
import "./cart.css";
import "./nav.css";
import Image from "next/image";
import Link from "next/link";
import Logo from "../components/images.png";
import PropTypes from "prop-types";
import { usePathname, useRouter } from "next/navigation"; // Import useRouter
import { supabase } from "../config/supabaseClient"; // Import supabase client

function Navbar({ toggleMainShift, toggleCartShift, productCount }) {
  const navRef = useRef();
  const pathname = usePathname();
  const router = useRouter(); // Initialize useRouter
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isMenuShown, setIsMenuShown] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleClosePopup = async () => {
    setIsPopupOpen(false);
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/"); // Route to home page after sign out
    } else {
      console.error("Error signing out:", error);
    }
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
    setIsMenuShown(!isMenuShown);
    if (typeof toggleMainShift === "function") {
      toggleMainShift();
    }
  };

  return (
    <header className="headir">
      <div className="imgnav-container">
        <div className="imgnav" onClick={togglePopup}>
          <Image
            src={Logo}
            alt="PureGold logo"
            width={50}
            height={50}
            placeholder="blur"
            quality={100}
          />
        </div>
        <div className={`popup ${isPopupOpen ? "slide-in" : "slide-out"}`}>
          <p className="logp" onClick={handleClosePopup}>
            Log Out
          </p>
        </div>
      </div>
      <nav ref={navRef} className="navig">
        <Link href="/homepage">
          <div
            className={`navname ${pathname === "/homepage" ? "active" : ""}`}
          >
            Beverages
          </div>
        </Link>
        <Link href="/can">
          <div className={`navname ${pathname === "/can" ? "active" : ""}`}>
            Canned goods
          </div>
        </Link>
        <Link href="/noodles">
          <div className={`navname ${pathname === "/noodles" ? "active" : ""}`}>
            Instant Noodles
          </div>
        </Link>
        <Link href="/biscuits">
          <div
            className={`navname ${pathname === "/biscuits" ? "active" : ""}`}
          >
            Snacks
          </div>
        </Link>
        <Link href="/dairy">
          <div className={`navname ${pathname === "/dairy" ? "active" : ""}`}>
            Dairy Products
          </div>
        </Link>
        <Link href="/fruits">
          <div className={`navname ${pathname === "/fruits" ? "active" : ""}`}>
            Fruits
          </div>
        </Link>
        <Link href="/vegetables">
          <div
            className={`navname ${pathname === "/vegetables" ? "active" : ""}`}
          >
            Vegetables
          </div>
        </Link>
        <Link href="/meat">
          <div className={`navname ${pathname === "/meat" ? "active" : ""}`}>
            Meat
          </div>
        </Link>
        <div className="cart">
          <button className="cartbut" onClick={toggleCartShift}>
            Cart
          </button>
          <p className="numcart">{productCount}</p>
        </div>
      </nav>
      <button
        className={`nav-btn ${isMenuShown ? "bold" : ""}`}
        onClick={showNavbar}
      >
        MENU
      </button>
    </header>
  );
}

Navbar.propTypes = {
  toggleMainShift: PropTypes.func.isRequired,
  toggleCartShift: PropTypes.func.isRequired,
};

export default Navbar;
