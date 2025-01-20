"use client";

import { useState } from "react";
import DefaultLayout from "./match/component/layouts/DefaultLaout";
import SearchBar from "./components/SearchBar";
import MatchesList from "./components/MatchesList";
import Header from "./components/Header";
import Sidebar from "./match/component/Sidebar";

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
      <DefaultLayout>
        <>
          <Header />

          <div className="flex min-h-screen bg-black text-gray-300">
            <Sidebar />

            <div className="ml-20 w-full">
              <div className="p-6 border-b border-gray-800 flex justify-center items-center">
                <SearchBar onSearch={handleSearch} />
              </div>
              <div className="p-6 flex justify-center items-center gap-4">
                <div className="bg-black border border-gray-700 rounded-lg  p-2 w-auto">
                  {loading ? (
                    <div className="text-center text-gray-400 font-medium">
                      Loading matches...
                    </div>
                  ) : error ? (
                    <div className="text-center text-red-600 font-medium">
                      {error}
                    </div>
                  ) : (
                    <MatchesList matches={matches} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      </DefaultLayout>
    </>
  );
}
