"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./bar.css";
import { supabase } from "../config/supabaseClient";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Product({ productTypeId, productType }) {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantity in Stock",
        data: [],
        backgroundColor: [],
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Critical Stock",
        data: [],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Enough Stock",
        data: [],
        backgroundColor: "rgba(255, 159, 64, 0.6)",
        borderColor: "rgba(255, 159, 64, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, [productTypeId]);

  async function fetchProductData() {
    try {
      // Fetch inventory data
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("product_id, product_type_id, quantity_in_stock")
        .eq("product_type_id", productTypeId);

      if (inventoryError) {
        setError(inventoryError.message);
        setLoading(false);
        return;
      }

      const productCounts = inventoryData.reduce((acc, inventory) => {
        if (!acc[inventory.product_id]) {
          acc[inventory.product_id] = 0;
        }
        acc[inventory.product_id] += inventory.quantity_in_stock;
        return acc;
      }, {});

      const labels = Object.keys(productCounts);

      const enoughStockCounts = [];
      const criticalStockCounts = [];
      const normalStockCounts = [];
      const backgroundColors = [];

      Object.values(productCounts).forEach((count) => {
        if (count <= 79 && count >= 0) {
          criticalStockCounts.push(count);
          enoughStockCounts.push(0);
          normalStockCounts.push(0);
          backgroundColors.push("rgba(255, 99, 132, 0.6)");
        } else if (count >= 80 && count <= 140) {
          enoughStockCounts.push(count);
          criticalStockCounts.push(0);
          normalStockCounts.push(0);
          backgroundColors.push("rgba(255, 159, 64, 0.6)");
        } else {
          normalStockCounts.push(count);
          enoughStockCounts.push(0);
          criticalStockCounts.push(0);
          backgroundColors.push("rgba(75, 192, 192, 0.6)");
        }
      });

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Quantity in Stock",
            data: normalStockCounts,
            backgroundColor: backgroundColors,
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
          {
            label: "Critical Stock",
            data: criticalStockCounts,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
          {
            label: "Enough Stock",
            data: enoughStockCounts,
            backgroundColor: "rgba(255, 159, 64, 0.6)",
            borderColor: "rgba(255, 159, 64, 1)",
            borderWidth: 1,
          },
        ],
      });
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  return (
    <div className="products_graph">
      <h2 className="graphtitle">{productType} Products Quantity in Stock</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <Bar data={chartData} />
      )}
    </div>
  );
}

export default Product;
