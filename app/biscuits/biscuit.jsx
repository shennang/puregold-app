"use client";
import supabase from "../config/supabaseClient";
import { useEffect, useState } from "react";
import Product from "../components/product";
import "../homepage/home.css";

const Beverage = ({ userId, email }) => {
  const [fetchError, setFetchError] = useState(null);
  const [beverages, setBeverages] = useState(null);
  const [loading, setLoading] = useState(true); // New state for loading indicator
  //ok na
  useEffect(() => {
    const fetchBeverages = async () => {
      try {
        const { data, error } = await supabase
          .from("product")
          .select()
          .eq("product_type_id", 2);

        if (error) {
          setFetchError("Could not fetch the beverages");
          console.error(error);
          setBeverages(null);
        } else {
          setBeverages(data);
          setFetchError(null);
        }
      } catch (error) {
        console.error("Error fetching beverages:", error.message);
        setFetchError("Could not fetch the beverages");
        setBeverages(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBeverages();
  }, []);

  return (
    <div className="page home">
      {fetchError && <p>{fetchError}</p>}
      {loading && <p>Loading...</p>} {/* Loading indicator */}
      {beverages && !loading && (
        <div className="smoothies">
          <div className="smoothie-grid">
            {beverages.map((beverage) => (
              <Product
                key={beverage.product_id}
                beverage={beverage}
                userId={userId}
                email={email}
                product_id={beverage.product_id}
                product_type_id={1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Beverage;
