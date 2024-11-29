// src/app/match/[id]/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CricketScore from "../component/CricketScore";
import RunRate from "../component/charts/RunRate";
import Header from "@/app/components/Header";
import Sidebar from "../component/Sidebar";

export default function MatchDetailPage() {
  const params = useParams();
  const { id } = params; // Extract match ID from the URL
  const [matchInfo, setMatchInfo] = useState(null);
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatchDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/matches/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch match details");
        }
        const data = await response.json();

        // Only take the `info` portion of the match data
        setMatchInfo(data.info);
        setMatchData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-8 text-blue-600">
        Loading match details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!matchInfo) {
    return (
      <div className="text-center mt-8">
        No details available for this match.
      </div>
    );
  }

  const teams = matchInfo.teams;

  return (
    <>
      {/* Header Component */}
      <Header />

      {/* Main Content */}
      <div className="flex min-h-screen bg-black text-gray-300">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Dashboard Content */}
        <div className="ml-20 w-full">
          <div className="p-6 border-b border-gray-800">
            <CricketScore
              team1Name={teams[0]}
              team1Score="120-0"
              team1Overs="15.2"
              team2Name={teams[1]}
              team2Score="118-10"
              team2Overs="20"
              winner={matchInfo.outcome.winner}
            />
          </div>
          <div className="p-6 ">
            {/* <div className="bg-gradient-to-tr from-black to-gray-800 rounded-md p-6 flex justify-center items-center text-gray-300 self-start"></div> */}

            <div className="bg-black border border-gray-700 rounded-lg inline-flex  p-2">
              <RunRate matchData={matchData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
