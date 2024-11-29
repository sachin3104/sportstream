"use client";

import React, { createContext, useContext, useState } from "react";

const MatchContext = createContext();

export function MatchProvider({ children }) {
  const [matchData, setMatchData] = useState(null);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const fetchMatchDetails = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/matches/${id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch match details");
      }
      const data = await response.json();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <MatchContext.Provider value={{ selectedMatch, setSelectedMatch }}>
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
