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

function SalesChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Today's Sales",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Total Sales",
        data: [],
        backgroundColor: "rgba(255, 233, 39, 0.919)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
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
      const today = new Date().toISOString().split("T")[0];

      const { data: purchaseData, error: purchaseError } = await supabase
        .from("purchase")
        .select("product_id, quantity, purchase_date");

      if (purchaseError) {
        setError(purchaseError.message);
        setLoading(false);
        return;
      }

      const { data: productData, error: productError } = await supabase
        .from("product")
        .select("product_id, product_name, product_type_id");

      if (productError) {
        setError(productError.message);
        setLoading(false);
        return;
      }

      const { data: productTypeData, error: productTypeError } = await supabase
        .from("product_type")
        .select("product_type_id, product_type_name");

      if (productTypeError) {
        setError(productTypeError.message);
        setLoading(false);
        return;
      }

      console.log("Purchase Data:", purchaseData);
      console.log("Product Data:", productData);
      console.log("Product Type Data:", productTypeData);
      processChartData(purchaseData, productData, productTypeData, today);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function processChartData(purchaseData, productData, productTypeData, today) {
    const totalSalesCounts = {};
    const todaySalesCounts = {};

    purchaseData.forEach((purchase) => {
      const product = productData.find(
        (product) => product.product_id === purchase.product_id
      );
      if (!product) {
        console.error(`No product found for product_id: ${purchase.product_id}`);
        return;
      }
      const productType = productTypeData.find(
        (type) => type.product_type_id === product.product_type_id
      );
      if (!productType) {
        console.error(
          `No product type found for product_type_id: ${product.product_type_id}`
        );
        return;
      }
      const productTypeName = productType.product_type_name;

      // Update total sales
      if (!totalSalesCounts[productTypeName]) {
        totalSalesCounts[productTypeName] = 0;
      }
      totalSalesCounts[productTypeName] += purchase.quantity;

      // Update today's sales if the purchase date is today
      if (purchase.purchase_date.startsWith(today)) {
        if (!todaySalesCounts[productTypeName]) {
          todaySalesCounts[productTypeName] = 0;
        }
        todaySalesCounts[productTypeName] += purchase.quantity;
      }
    });

    const labels = Object.keys(totalSalesCounts);
    const totalCounts = Object.values(totalSalesCounts);
    const todayCounts = labels.map((label) => todaySalesCounts[label] || 0);

    setChartData({
      labels: labels,
      datasets: [
        {
          label: "Today's Sales",
          data: todayCounts,
          backgroundColor: "rgba(75, 192, 192, 0.6)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
        {
          label: "Total Sales",
          data: totalCounts,
          backgroundColor: "rgba(0, 47, 255, 0.919)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    });
  }

  return (
    <div className="barg3">
      <h2 className="graphtitle">Sales</h2>
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

export default SalesChart;
