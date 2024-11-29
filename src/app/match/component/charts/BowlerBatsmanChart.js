"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { useMatch } from "@/utils/context/MatchContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const convertToChartData = (batsmanVsBowlerData) => {
  const chartDataArray = []; // Initialize an empty array

  Object.keys(batsmanVsBowlerData).forEach((bowler) => {
    const batsmenData = batsmanVsBowlerData[bowler];
    const labels = Object.keys(batsmenData);
    const runsData = labels.map((batsman) => batsmenData[batsman].runs);
    const chartData = {
      bowler: bowler, // Add a 'bowler' key to keep track of which bowler this data belongs to
      labels: labels,
      datasets: [
        {
          label: `${bowler}`,
          data: runsData,
          backgroundColor: [
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(54, 162, 235, 0.2)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(201, 203, 207, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(54, 162, 235, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    // Push each formatted bowler data to the array
    chartDataArray.push(chartData);
  });

  console.log("chart Data Array", chartDataArray);
  return chartDataArray;
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: true,
      text: "Batsmens performance with against Bowler", // Chart title
    },
  },
  scales: {
    y: {
      beginAtZero: true, // Ensures y-axis starts at 0
      title: {
        display: true, // Show the title label on x-axis
        text: "Runs", // Text for the x-axis label
      },
      grid: {
        color: "#374151",
      },
    },
    x: {
      beginAtZero: true, // Ensures y-axis starts at 0
      title: {
        display: true, // Show the title label on x-axis
        text: "Batsmen", // Text for the x-axis label
      },
      grid: {
        color: "#374151",
      },
    },
  },
};

const BowlerBatsmanChart = () => {
  const { graph } = useMatch();
  const cData = convertToChartData(graph.matchUpData);
  const [selectedBowler, setSelectedBowler] = useState(cData[0]);

  const handleChange = (event) => {
    const selectedBowlerName = event.target.value;
    const selectedBowlerData = cData.find(
      (bowler) => bowler.bowler === selectedBowlerName
    );
    setSelectedBowler(selectedBowlerData);
  };

  return (
    <div className="container w-auto  mx-auto p-2">
      <div>
        <label className="text-l font-thin font-nunito mb-4" htmlFor="dropdown">
          Bowler:
        </label>
        <select
          id="dropdown"
          onChange={handleChange}
          value={selectedBowler?.bowler || ""}
          className="m-2 border border-gray-700 p-1 text-xs font-thin font-nunito  text-white bg-gradient-to-t from-black to-gray-800 rounded-2xl"
        >
          {cData.map((data, index) => (
            <option key={index}>{data.bowler}</option>
          ))}
        </select>
      </div>
      <div className="relative h-60 w-[500px]">
        <Bar data={selectedBowler} options={chartOptions} />
      </div>
    </div>
  );
};

export default BowlerBatsmanChart;
