"use client";

import React, { createContext, useContext, useState } from "react";
import { modifyMatchData, analyzeCricketData } from "./GraphData";

const MatchContext = createContext();

export function MatchProvider({ children }) {
  const [matchData, setMatchData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teamScoreData, setTeamScoreData] = useState(null);
  const [graph, setGraph] = useState(null);

  const fetchMatchDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/matches/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }
      const data = await response.json();
      // console.log(data);
      setMatchData(data);
      setTeamScoreData(modifyMatchData(data));
      setGraph(analyzeCricketData(data));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <MatchContext.Provider
      value={{ fetchMatchDetails, matchData, loading, error, graph }}
    >
      {children}
    </MatchContext.Provider>
  );
}

export function useMatch() {
  const context = useContext(MatchContext);
  if (!context) {
    throw new Error("useMatch must be used within a MatchProvider");
  }
  return context;
}
