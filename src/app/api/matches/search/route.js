import { NextResponse } from "next/server";
import { metadataCache, teamIndex, genderIndex } from "../preload";

// Handler function for the GET request
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 }
    );
  }

  // Split the query into keywords (e.g., "India male")
  const keywords = query.split(" ");

  // To store filtered results
  let filteredMatches = new Set();

  keywords.forEach((keyword) => {
    // Search in team index
    if (teamIndex[keyword]) {
      teamIndex[keyword].forEach((match) => filteredMatches.add(match));
    }

    // Search in gender index
    if (genderIndex[keyword]) {
      genderIndex[keyword].forEach((match) => filteredMatches.add(match));
    }

    // Add more conditions as needed (e.g., typeIndex)
  });

  // Convert Set to Array and filter for more than one criteria if necessary
  let finalMatches = Array.from(filteredMatches);

  if (keywords.length > 1) {
    // Further refine matches by ensuring all keywords apply
    finalMatches = finalMatches.filter((match) => {
      return keywords.every((keyword) => {
        return (
          match.teams.team1.toLowerCase().includes(keyword) ||
          match.teams.team2.toLowerCase().includes(keyword) ||
          match.gender.toLowerCase() === keyword ||
          match.type.toLowerCase() === keyword
        );
      });
    });
  }

  console.timeEnd(`Search Time for Query: "${query}"`);

  if (finalMatches.length > 0) {
    return NextResponse.json(finalMatches, { status: 200 });
  } else {
    return NextResponse.json({ error: "No matches found" }, { status: 404 });
  }
}
