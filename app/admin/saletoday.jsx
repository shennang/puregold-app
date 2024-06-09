"use client";
import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { supabase } from "../config/supabaseClient";
import "./best.css";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

function BestSellerProductsChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Quantity Sold",
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
    ],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSalesData();
  }, []);

  async function fetchSalesData() {
    try {
      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchase")
        .select("product_id, quantity");

      if (purchaseError) {
        setError(purchaseError.message);
        setLoading(false);
        return;
      }

      const { data: productData, error: productError } = await supabase
        .from("product")
        .select("product_id, product_name");

      if (productError) {
        setError(productError.message);
        setLoading(false);
        return;
      }

      console.log("Purchase Data:", purchaseData);
      console.log("Product Data:", productData);
      processChartData(purchaseData, productData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function processChartData(purchaseData, productData) {
    const productCounts = purchaseData.reduce((acc, purchase) => {
      const product = productData.find(
        (product) => product.product_id === purchase.product_id
      );
      if (!product) {
        console.error(
          `No product found for product_id: ${purchase.product_id}`
        );
        return acc;
      }
      const productName = product.product_name;
      if (!acc[productName]) {
        acc[productName] = 0;
      }
      acc[productName] += purchase.quantity;
      return acc;
    }, {});

    // Get the top 8 best-selling products
    const sortedProducts = Object.entries(productCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8);

    const labels = sortedProducts.map(([name]) => name);
    const counts = sortedProducts.map(([, count]) => count);
    const backgroundColors = labels.map(
      () =>
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)}, 0.6)`
    );

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Quantity Sold",
          data: counts,
          backgroundColor: backgroundColors,
          borderWidth: 0,
        },
      ],
    });
  }

  const chartOptions = {
    plugins: {
      legend: {
        position: "left",
        align: "start",
        labels: {
          boxWidth: 10,
          padding: 18,
        },
      },
    },
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable aspect ratio to control size directly
    width: 820, // Set width of the chart
    height: 920, // Set height of the chart
  };

  return (
    <div className="bar3">
      <h2 className="graph-title">Top 8 Best Selling Products</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="doughnut-chart">
          <Doughnut data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}

export default BestSellerProductsChart;
