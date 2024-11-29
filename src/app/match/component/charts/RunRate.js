import { useEffect, useRef } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { RxBorderWidth } from "react-icons/rx";
import { useMatch } from "@/utils/context/MatchContext";
// import { tailwindColors } from '../utils/tailwindColors';

// Register necessary components from Chart.js
Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineController
);

const RunRate = () => {
  const { matchData } = useMatch();
  function getRunRatePerOver(teamName) {
    const teamInnings = matchData.innings.find(
      (inning) => inning.team === teamName
    );
    const runRates = [];

    teamInnings.overs.forEach((over) => {
      let totalRuns = 0;
      over.deliveries.forEach((delivery) => {
        totalRuns += delivery.runs.total;
      });
      runRates.push(totalRuns); // Run rate for an over is the total runs in that over.
    });

    return runRates;
  }
  const teamNames = matchData.info.teams;
  const team1Runrate = getRunRatePerOver(teamNames[0]);
  const team2Runrate = getRunRatePerOver(teamNames[1]);
  const teamRunRates = [team1Runrate, team2Runrate];

  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const runRateChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: Array.from(
          { length: teamRunRates[0].length },
          (_, i) => `${i + 1}`
        ),
        datasets: teamRunRates.map((runRate, index) => ({
          label: `${teamNames[index]}`,
          data: runRate,
          borderWidth: 1,
          borderColor: index === 0 ? "#90ee90" : "#ef4444", // Tailwind colors: blue for team 1, red for team 2
          fill: false,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "category",
            beginAtZero: true,
            title: {
              display: true,
              text: "Over",
            },
            grid: {
              color: "#374151",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Runs",
            },
            grid: {
              color: "#374151",
            },
          },
        },
      },
    });

    return () => {
      runRateChart.destroy();
    };
  }, [teamRunRates, teamNames]);

  return (
    <div className="container w-auto  mx-auto p-2">
      <h2 className="text-l font-thin font-nunito mb-4">
        Run-rate Comparision
      </h2>
      <div className="relative h-60 w-[600px]">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default RunRate;
