import React from "react";
import "./CricketScore.css";

const CricketScore = ({
  team1Name,
  team1Score,
  team1Overs,
  team2Name,
  team2Score,
  team2Overs,
  winner,
}) => {
  return (
    <>
      <div className="flex w-full">
        <div className="w-1/3 flex flex-col items-center justify-between">
          {/* Score Display Section */}
          <div className="w-full flex justify-between items-center font-thin font-nunito">
            {/* Team 1 Section */}
            <div className="flex flex-col items-center">
              <span className="text-5xl  text-white gradient-text">
                {team1Score}
              </span>
              <span className="text-lg  text-gray-300">{team1Name}</span>
              <span className="text-sm text-gray-400">{team1Overs} overs</span>
            </div>

            {/* VS Section */}
            <div className="text-3xl  text-gray-500 mx-2">vs</div>

            {/* Team 2 Section */}
            <div className="flex flex-col items-center">
              <span className="text-5xl  text-white gradient-text">
                {team2Score}
              </span>
              <span className="text-lg text-gray-300">{team2Name}</span>
              <span className="text-sm text-gray-400">{team2Overs} overs</span>
            </div>
          </div>

          {/* Winner Section */}
          <div className="w-full text-center mt-4">
            <span className="text-2xl font-nunito font-thin gradient-text">
              {winner ? `${winner} won the match` : "Match is ongoing"}
            </span>
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </>
  );
};

export default CricketScore;
