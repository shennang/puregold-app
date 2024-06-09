import React, { useState, useEffect } from "react";
import "./product.css";
import { supabase } from "../config/supabaseClient";

const Product = ({ beverage, userId, email, product_id, product_type_id }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const imageExtensions = ["jpg", "png", "jfif", "jpeg"]; // Add more if needed

    const loadImage = async () => {
      for (let ext of imageExtensions) {
        const imageUrl = `http://127.0.0.1:54321/storage/v1/object/public/image/${product_id}.${ext}`;
        try {
          const response = await fetch(imageUrl);
          if (response.ok) {
            setImageUrl(imageUrl);
            return;
          }
        } catch (error) {
          console.error(`Error loading image ${imageUrl}:`, error);
        }
      }
      // If none of the images were found
      setImageUrl(null);
    };

    loadImage();
  }, [product_id]);

  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (value >= 0) {
      setQuantity(value);
    }
  };

  const handleBuy = async () => {
    try {
      setLoading(true);
      setError(null);

      // Example: Add the product to the cart in Supabase
      const { data, error } = await supabase.from("cart").insert([
        {
          product_name: beverage.product_name,
          price: beverage.product_price,
          quantity: quantity,
          created_at: new Date(),
          customer_id: userId,
          email: email,
          product_id: product_id,
          product_type_id: product_type_id,
        },
      ]);

      if (error) {
        throw new Error(`Error adding product to cart: ${error.message}`);
      }

      setError("Product added to cart successfully!");
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setError(null);
      }, 3000);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="probox">
        <div className="propic">
          {imageUrl ? (
            <img
              className="pic"
              src={imageUrl}
              alt="Product image"
              height={300}
              width={300}
            />
          ) : (
            <div className="placeholder">Image Loading...</div>
          )}
        </div>
        <div className="smootie-card">
          <h3 className="name">{beverage.product_name}</h3>
          <div className="rateng">Price: ₱{beverage.product_price}</div>
          <div className="quantityprod">
            <p className="quantiprod">Quantity:</p>
            <input
              type="number"
              className="inputnumprod"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <div className="but">
            <button
              className="bot"
              onClick={handleBuy}
              disabled={loading || quantity === 0}
            >
              {loading ? "Processing..." : "Add to Cart"}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Product;
