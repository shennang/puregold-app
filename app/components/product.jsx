import React, { useState } from "react";
import "./product.css";
import Image from "next/image";
import temp from "../assets/protemp.jpg";
import { supabase } from "../config/supabaseClient";

const Product = ({ beverage, userId, email, product_id, product_type_id }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

      // Check if the product already exists in the cart
      const { data: existingCartItem, error: fetchError } = await supabase
        .from("cart")
        .select("*")
        .eq("customer_id", userId)
        .eq("product_name", beverage.product_name)
        .single();

      if (fetchError) {
        console.error("Error checking existing cart item:", fetchError);
      }

      if (existingCartItem) {
        // If the product exists in the cart, update the quantity
        const { data, error } = await supabase
          .from("cart")
          .update({ quantity: existingCartItem.quantity + quantity })
          .eq("id", existingCartItem.id);

        if (error) {
          setError("Error updating cart item: " + error.message);
        } else {
          setError("Product quantity updated successfully!");
          // Clear the success message after 3 seconds
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      } else {
        // If the product does not exist in the cart, insert a new row
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
          setError("Error adding product to cart: " + error.message);
        } else {
          setError("Product quantity updated successfully!");
          // Clear the success message after 3 seconds
          setTimeout(() => {
            setError(null);
          }, 2000);
        }
      }
    } catch (error) {
      setError("Error: " + error.message);
    } finally {
      setLoading(false);
      setQuantity(1);
    }
  };

  return (
    <>
      <div className="probox">
        <div className="propic">
          <Image
            className="pic"
            src={temp}
            alt="Product image"
            height={140}
            placeholder="blur"
            quality={100}
          />
        </div>
        <div className="smootie-card">
          <h3 className="name">{beverage.product_name}</h3>
          <p>{beverage.product_description}</p>
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
              {loading ? "Processing..." : "Buy"}
            </button>
          </div>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default Product;
