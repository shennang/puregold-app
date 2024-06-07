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

function ProductTypeChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantity in Stock",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProductData();
  }, []);

  async function fetchProductData() {
    try {
      const { data: inventoryData, error: inventoryError } = await supabase
        .from("inventory")
        .select("product_type_id, quantity_in_stock");

      const { data: productTypeData, error: productTypeError } = await supabase
        .from("product_type")
        .select("product_type_id, product_type_name");

      if (inventoryError) {
        setError(inventoryError.message);
        setLoading(false);
      } else if (productTypeError) {
        setError(productTypeError.message);
        setLoading(false);
      } else {
        console.log("Inventory Data:", inventoryData);
        console.log("Product Type Data:", productTypeData);
        processChartData(inventoryData, productTypeData);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function processChartData(inventoryData, productTypeData) {
    const productTypeCounts = inventoryData.reduce((acc, inventory) => {
      const type = productTypeData.find(
        (type) => type.product_type_id === inventory.product_type_id
      );
      if (!type) {
        console.error(
          `No product type found for product_type_id: ${inventory.product_type_id}`
        );
        return acc;
      }
      const typeName = type.product_type_name;
      if (!acc[typeName]) {
        acc[typeName] = 0;
      }
      acc[typeName] += inventory.quantity_in_stock;
      return acc;
    }, {});

    const labels = Object.keys(productTypeCounts);
    const counts = Object.values(productTypeCounts);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Quantity in Stock",
          data: counts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    });
  }

  return (
    <div className="barg3">
      <h2 className="graphtitle">Product Types Quantity in Stock</h2>
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

export default ProductTypeChart;
