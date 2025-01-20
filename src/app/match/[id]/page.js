// src/app/match/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useMatch } from "@/utils/context/MatchContext";
import { modifyMatchData, analyzeCricketData } from "@/utils/context/GraphData";
import CricketScore from "../component/CricketScore";
import RunRate from "../component/charts/RunRate";
import BowlerBatsmanChart from "../component/charts/BowlerBatsmanChart";
import Header from "@/app/components/Header";
import Sidebar from "../component/Sidebar";

export default function MatchDetailPage() {
  const params = useParams();
  const { id } = params; // Extract match ID from the URL
  const { fetchMatchDetails, matchData, loading, error } = useMatch();

  useEffect(() => {
    fetchMatchDetails(id);
  }, []);

  if (loading) {
    return (
      <>
        <Header />

        <div className="flex min-h-screen bg-black text-gray-300">
          <Sidebar />

          <div className="ml-20 w-full">Loading...</div>
        </div>
      </>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  const teams = matchData.info.teams;
  console.log("This is teams data", teams);

  const teamStats = analyzeCricketData(matchData).teamStats;
  const runsData = modifyMatchData(matchData);

  // Calculate overs for each team
  const getOversCount = (teamName) => {
    const stats = teamStats[teamName];
    const completeOvers = Math.floor(stats.totalBalls / 6);
    const remainingBalls = stats.totalBalls % 6;
    return remainingBalls > 0
      ? `${completeOvers}.${remainingBalls}`
      : `${completeOvers}`;
  };

  // Format score with wickets
  const getScoreWithWickets = (teamName) => {
    const runs = runsData[teamName];
    const wickets = teamStats[teamName].totalWickets;
    return `${runs}-${wickets}`;
  };

  return (
    <>
      <Header />

      <div className="flex min-h-screen bg-black text-gray-300">
        <Sidebar />

        <div className="ml-20 w-full">
          <div className="p-6 border-b border-gray-800 ">
            <CricketScore
              team1Name={teams[0]}
              team1Score={getScoreWithWickets(teams[0])}
              team1Overs={getOversCount(teams[0])}
              team2Name={teams[1]}
              team2Score={getScoreWithWickets(teams[1])}
              team2Overs={getOversCount(teams[1])}
              winner={matchData.info.outcome.winner}
            />
          </div>
          <div className="p-6 flex gap-4">
            <div className="bg-black border border-gray-700 rounded-lg inline-flex flex-none p-2 self-start">
              <RunRate />
            </div>
            <div className="bg-black border border-gray-700 rounded-lg inline-flex flex-none p-2 self-start">
              <BowlerBatsmanChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
