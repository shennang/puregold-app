"use client";

import { FcSalesPerformance } from "react-icons/fc";
import { BsGraphUpArrow } from "react-icons/bs";
import { VscGraph } from "react-icons/vsc";
import { VscGraphLine } from "react-icons/vsc";

import React from "react";
import { supabase } from "../../config/supabaseClient";
import { useState, useEffect } from "react";
import Nav from "../nav/nav.jsx";
import Bar from "../productbar.jsx";
import Inv from "../productinve.jsx";
import Product from "../product.jsx";

import Footer from "../../components/footer";
import "../bar.css";
import "../admin1.css";

export default function Page() {
  const [todaySale, setTodaySale] = useState(0);
  const [totalSale, setTotalSale] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    async function fetchSalesAndRevenue() {
      try {
        const today = new Date();
        const startOfToday = new Date(
          today.getFullYear(),
          today.getMonth(),
          today.getDate()
        ).toISOString();

        // Fetch today's sales and revenue
        const { data: todaySalesData, error: todaySalesError } = await supabase
          .from("purchase")
          .select("quantity, cost")
          .gte("purchase_date", startOfToday);

        if (todaySalesError) {
          console.error("Error fetching today's sales:", todaySalesError);
        } else if (todaySalesData && todaySalesData.length > 0) {
          const todayTotalQuantity = todaySalesData.reduce(
            (sum, record) => sum + record.quantity,
            0
          );
          const todayTotalCost = todaySalesData.reduce(
            (sum, record) => sum + record.cost,
            0
          );

          setTodaySale(todayTotalQuantity);
          setTodayRevenue(todayTotalCost);
        }

        // Fetch total sales
        const { data: totalSalesData, error: totalSalesError } = await supabase
          .from("purchase")
          .select("quantity")
          .gt("purchase_date", "1970-01-01");

        if (totalSalesError) {
          console.error("Error fetching total sales:", totalSalesError);
        } else if (totalSalesData && totalSalesData.length > 0) {
          const totalQuantity = totalSalesData.reduce(
            (sum, record) => sum + record.quantity,
            0
          );
          setTotalSale(totalQuantity);
        }

        // Fetch total revenue
        const { data: totalRevenueData, error: totalRevenueError } =
          await supabase
            .from("purchase")
            .select("cost")
            .gt("purchase_date", "1970-01-01");

        if (totalRevenueError) {
          console.error("Error fetching total revenue:", totalRevenueError);
        } else if (totalRevenueData && totalRevenueData.length > 0) {
          const totalCost = totalRevenueData.reduce(
            (sum, record) => sum + record.cost,
            0
          );
          setTotalRevenue(totalCost);
        }
      } catch (error) {
        console.error("Error fetching sales and revenue:", error);
      }
    }

    fetchSalesAndRevenue();
  }, []);

  return (
    <>
      <div className="navadmn">
        <Nav />
      </div>
      <div className="holder">
        <div className="topseller">
          <div className="best">
            <div className="icontop">
              <BsGraphUpArrow />
            </div>
            <p>Today Sale: {todaySale}</p>
          </div>
          <div className="best">
            <div className="icontop">
              <VscGraph />
            </div>
            <p>Total Sale: {totalSale}</p>
          </div>
          <div className="best">
            <div className="icontop">
              <VscGraphLine />
            </div>
            <p>Today Revenue: {todayRevenue}</p>
          </div>
          <div className="best">
            <div className="icontop">
              <FcSalesPerformance />
            </div>
            <p>Total Revenue: {totalRevenue}</p>
          </div>
        </div>
        <div className="tables1">
          <div className=" best1 ">
            <Product productTypeId={1} productType={"Beverages"} />
          </div>
          <div className="best1">
            <Product productTypeId={2} productType={"Snacks"} />
          </div>
          <div className="best1">
            <Product productTypeId={3} productType={"Fruits"} />
          </div>
          <div className="best1">
            <Product productTypeId={4} productType={"Vegetables"} />
          </div>
          <div className="best1">
            <Product productTypeId={5} productType={"Meat"} />
          </div>
          <div className="best1">
            <Product productTypeId={6} productType={"Dairy"} />
          </div>
          <div className="best1">
            <Product productTypeId={7} productType={"Canned Goods"} />
          </div>
          <div className="best1">
            <Product productTypeId={8} productType={"Instant Noddles"} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
