// src/app/components/MatchesList.js
"use client";

import Link from "next/link";

const MatchesList = ({ matches }) => {
  return (
    <div className="w-full max-w-3xl mx-auto mt-4 p-3 bg-gray-900 rounded-md shadow-md">
      {/* Match Results Heading */}
      <h2 className="text-xl font-bold mb-3 text-center text-orange-500">
        Match Results
      </h2>

      {/* Scrollable Match List */}
      <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-gray-900">
        {matches.length === 0 ? (
          <p className="text-center p-4 text-gray-400">
            No matches were found.
          </p>
        ) : (
          matches.slice(0, 10).map((match) => (
            <Link key={match.matchId} href={`/match/${match.matchId}`}>
              <div className="p-2 bg-gray-800 text-white rounded-md transition-all duration-200 cursor-pointer hover:bg-orange-200 hover:text-black hover:shadow-lg flex flex-col items-center">
                {/* Team Names Highlighted */}
                <div className="font-semibold text-base text-center">
                  <strong>{match.teams.team1}</strong> vs{" "}
                  <strong>{match.teams.team2}</strong>
                </div>

                {/* Match Details */}
                <div className="mt-1 text-xs text-gray-500 text-center">
                  <span>{match.date}</span> | <span>{match.format}</span> |{" "}
                  <span>{match.gender}</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default MatchesList;
