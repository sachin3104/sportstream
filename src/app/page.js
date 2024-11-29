"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import MatchesList from "./components/MatchesList";

export default function HomePage() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle the search query
  const handleSearch = async (query) => {
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      // Making a request to the backend endpoint
      const response = await fetch(
        `/api/matches/metadata?query=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("No matches found");
      }
      const data = await response.json();
      setMatches(data);
    } catch (err) {
      setError(err.message);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-800 text-gray-300">
        <div className="w-full max-w-3xl flex flex-col items-center space-y-4 px-4">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} />

          {/* Loading / Error / Matches List */}
          {loading ? (
            <div className="text-center text-gray-400 font-medium">
              Loading matches...
            </div>
          ) : error ? (
            <div className="text-center text-orange-500 font-medium">
              {error}
            </div>
          ) : (
            <MatchesList matches={matches} />
          )}
        </div>
      </div>
    </>
  );
}
