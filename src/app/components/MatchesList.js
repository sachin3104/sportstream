// src/app/components/MatchesList.js
"use client";

import Link from "next/link";

const MatchesList = ({ matches }) => {
  return (
    <div className="w-[600px] font-nunito text-white  font-thin  max-w-3xl mx-auto mt-4 p-3 bg-transparent rounded-md ">
      {/* Match Results Heading */}
      {matches.length !== 0 && (
        <h2 className="mb-3 text-center text-[#90ee90]">Match Results</h2>
      )}

      {/* Scrollable Match List */}
      <div className="h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#90ee90] scrollbar-track-black">
        {matches.length === 0 ? (
          <p className="text-center p-4 font-nunito text-gray-500  font-thin">
            Try Searching for a Cricket Match
          </p>
        ) : (
          matches.slice(0, 50).map((match) => (
            <Link key={match.matchId} href={`/match/${match.matchId}`}>
              <div className="p-2 bg-transparent font-nunito text-white  font-thin rounded-md transition-all duration-200 cursor-pointer hover:bg-gray-300 hover:text-black hover:shadow-lg flex flex-col items-center">
                {/* Team Names Highlighted */}
                <div className=" text-center">
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
