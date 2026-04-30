import React, { useState } from "react";
import Chart from "react-apexcharts";

export const CollectionChart = () => {
  const [filter, setFilter] = useState("monthly");

  const chartData = {
    daily: [12000, 18000, 15000, 20000, 17000, 22000, 19000],
    weekly: [90000, 120000, 110000, 140000],
    monthly: [300000, 450000, 500000, 650000, 700000, 800000],
  };

  const labels = {
    daily: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
    monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  };

  const options = {
    chart: {
      type: "area",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.05,
      },
    },
    colors: ["#004b63"],
    xaxis: {
      categories: labels[filter],
    },
    tooltip: {
      y: {
        formatter: (val) => `₹${val.toLocaleString()}`,
      },
    },
  };

  const series = [
    {
      name: "Collection",
      data: chartData[filter],
    },
  ];

  return (
    <div className="chart_card">
      {/* HEADER */}
      <div className="chart_header">
        <h6>Collection Overview</h6>

        {/* FILTER */}
        <div className="filter_btns">
          <button
            className={filter === "daily" ? "active" : ""}
            onClick={() => setFilter("daily")}
          >
            Daily
          </button>
          <button
            className={filter === "weekly" ? "active" : ""}
            onClick={() => setFilter("weekly")}
          >
            Weekly
          </button>
          <button
            className={filter === "monthly" ? "active" : ""}
            onClick={() => setFilter("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* CHART */}
      <Chart options={options} series={series} type="area" height={280} />
    </div>
  );
};