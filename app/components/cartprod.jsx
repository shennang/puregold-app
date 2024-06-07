import React, { useState, useEffect } from "react";
import "./cart.css";
import { supabase } from "../config/supabaseClient"; // Import your Supabase client

const CartItem = ({ item, userId, onUpdate }) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      const { error } = await supabase
        .from("cart")
        .delete()
        .eq("id", item.id)
        .eq("customer_id", userId);
      if (error) {
        console.error("Error removing item:", error);
      } else {
        onUpdate(); // Call onUpdate to trigger a re-fetch of the cart items
      }
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsRemoving(false);
    }
  };

  const handleQuantityChange = async (e) => {
    const newQuantity = e.target.valueAsNumber;
    setQuantity(newQuantity);
    try {
      const { error } = await supabase
        .from("cart")
        .update({ quantity: newQuantity })
        .eq("id", item.id)
        .eq("customer_id", userId);
      if (error) {
        console.error("Error updating quantity:", error);
      } else {
        onUpdate(); // Call onUpdate to trigger a re-fetch of the cart items
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <div className={`team ${isRemoving ? "removing" : ""}`}>
      <div className="cartbox">
        <div className="containercart">
          <h3 className="namecart">{item.product_name}</h3>
          <button className="del" onClick={handleRemove}>
            Delete
          </button>
        </div>
        <div className="quantity">
          <p className="quanticart">Quantity:</p>
          <input
            type="number"
            className="inputnum"
            value={quantity}
            onChange={handleQuantityChange}
            min="0"
          />
          <div className="price">
            <p className="cartprice">₱{item.price}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
