import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatsCardWithChart = ({ data }) => {
  // Example data prop structure:
  // data = {
  //   users: 50,
  //   admins: 5,
  //   blogs: 80,
  //   messages: 30,
  //   comments: 70,
  //   authors: 10
  // };

  const chartData = {
    labels: ["Users", "Admins", "Blogs", "Messages", "Comments", "Authors"],
    datasets: [
      {
        label: "Count",
        data: [
          data.users,
          data.admins,
          data.blogs,
          data.messages,
          data.comments,
          data.authors,
        ],
        backgroundColor: [
          "#4ade80", // green
          "#3b82f6", // blue
          "#f97316", // orange
          "#ef4444", // red
          "#8b5cf6", // purple
          "#facc15", // yellow
        ],
        borderColor: "#fff",
        borderWidth: 2,
        hoverOffset: 20,
      },
    ],
  };

  const options = {
    cutout: "70%", // circle thickness, 70% makes a donut
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 15,
          padding: 15,
          font: { size: 14, weight: "bold" },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}`,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Card className="max-w-md mx-auto p-3 shadow-lg rounded-lg bg-white">
      <CardHeader className="text-center mb-6">
        <CardTitle className="text-2xl font-semibold text-gray-800">
          Stats Data
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <div className="w-64 h-64">
          <Doughnut
            data={chartData}
            options={{
              ...options,
              cutout: "50%", // thicker donut (50% cutout)
              plugins: {
                ...options.plugins,
                legend: {
                  position: "bottom",
                  labels: {
                    font: { size: 14, weight: "bold" },
                    padding: 20,
                    boxWidth: 18,
                  },
                },
              },
              maintainAspectRatio: false,
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCardWithChart;
