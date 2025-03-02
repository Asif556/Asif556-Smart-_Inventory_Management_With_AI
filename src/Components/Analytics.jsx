import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Nav from "./Nav";
import "./Analytics.css";
import BackButton from "./BackButton ";

const categoryData = [
  { name: "Fruits", value: 30 },
  { name: "Vegetables", value: 40 },
  { name: "Dairy", value: 20 },
  { name: "Beverages", value: 10 },
];

const freshnessData = [
  { name: "Fresh", value: 60 },
  { name: "Expiring Soon", value: 25 },
  { name: "Expired", value: 15 },
];

const COLORS = ["#4CAF50", "#FFA500", "#FF0000", "#3F51B5"];

const Analytics = () => {
  return (
    <div className="analytics-page">
      <Nav />
      <div className="analytics-container">
        <h1>Inventory Analytics</h1>
        <p>Gain insights into your inventory through interactive charts.</p>

        <div className="charts-container">
          {/* Category Distribution Chart */}
          <div className="chart-box">
            <h2>Category Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Freshness Status Chart */}
          <div className="chart-box">
            <h2>Freshness Status</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={freshnessData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  dataKey="value"
                  label
                >
                  {freshnessData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <BackButton/>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
