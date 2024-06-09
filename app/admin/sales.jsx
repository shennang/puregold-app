"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler,
} from "chart.js";
import { supabase } from "../config/supabaseClient";
import "./bar.css";
import "./admin1.css";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  Filler
);

function SalesLineChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Total Sales",
        data: [],
        backgroundColor: "rgba(255, 159, 64, 0.6)", // Orange fill color
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 3,
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
        .select("product_id, quantity, purchase_date");

      if (purchaseError) {
        setError(purchaseError.message);
        setLoading(false);
        return;
      }

      processChartData(purchaseData);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function processChartData(purchaseData) {
    const dailySales = {};

    purchaseData.forEach((purchase) => {
      const purchaseDate = purchase.purchase_date.split("T")[0];
      if (!dailySales[purchaseDate]) {
        dailySales[purchaseDate] = 0;
      }
      dailySales[purchaseDate] += purchase.quantity;
    });

    const sortedDates = Object.keys(dailySales).sort();
    const salesCounts = sortedDates.map((date) => dailySales[date]);

    setChartData({
      labels: sortedDates,
      datasets: [
        {
          label: "Total Sales",
          data: salesCounts,
          backgroundColor: "rgba(137, 182, 234, 0.586)", // Orange fill color
          borderColor: "#2200ff",
          borderWidth: 2,

          fill: {
            target: "origin",
            below: "rgba(46, 129, 244, 0.874)", // Color above the line
          },
        },
      ],
    });
  }

  const options = {
    scales: {
      y: {
        ticks: {
          stepSize: 100,
        },
      },
      x: {
        grid: {
          color: "rgba(0, 255, 204, 0.5)", // Change the color of X axis grid lines
        },
      },
      y: {
        grid: {
          color: "rgba(0, 255, 204, 0.5)", // Change the color of Y axis grid lines
        },
      },
    },
  };

  return (
    <div className="line-chart-container">
      <h2 className="graphtitle1">Daily Sales</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="lin">
          <Line data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}

export default SalesLineChart;
