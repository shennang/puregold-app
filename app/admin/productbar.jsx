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
        label: "Number of Products",
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
      const { data: productData, error: productError } = await supabase
        .from("product")
        .select("product_type_id");

      const { data: productTypeData, error: productTypeError } = await supabase
        .from("product_type")
        .select("product_type_id, product_type_name");

      if (productError) {
        setError(productError.message);
        setLoading(false);
      } else if (productTypeError) {
        setError(productTypeError.message);
        setLoading(false);
      } else {
        console.log("Product Data:", productData);
        console.log("Product Type Data:", productTypeData);
        processChartData(productData, productTypeData);
        setLoading(false);
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function processChartData(productData, productTypeData) {
    const productTypeCounts = productData.reduce((acc, product) => {
      const type = productTypeData.find(
        (type) => type.product_type_id === product.product_type_id
      );
      if (!type) {
        console.error(
          `No product type found for product_type_id: ${product.product_type_id}`
        );
        return acc;
      }
      const typeName = type.product_type_name;
      if (!acc[typeName]) {
        acc[typeName] = 0;
      }
      acc[typeName]++;
      return acc;
    }, {});

    const labels = Object.keys(productTypeCounts);
    const counts = Object.values(productTypeCounts);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Number of Products",
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
      <h2 className="graphtitle">Product Types Quantity</h2>
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
