import { NextResponse } from "next/server";
import {
  preloadMetadata,
  metadataCache,
  teamIndex,
  genderIndex,
  dateIndex,
  typeIndex,
  formatIndex,
} from "../preload";

// Handler function for the GET request to serve metadata with efficient search
export async function GET(req) {
  try {
    // Ensure that metadata is preloaded
    await preloadMetadata(); // This will only run if metadata is not already loaded

    // Parse the incoming URL to extract query parameters
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.toLowerCase() || "";

    // If no query is provided, return the entire metadata
    if (!query) {
      return NextResponse.json(metadataCache, { status: 200 });
    }

    // Split the query into keywords for flexible searching (e.g., "India male T20")
    const keywords = query
      .split(" ")
      .map((keyword) => keyword.trim().toLowerCase());
    console.log("Search keywords:", keywords);

    // Initialize filteredMatchIds with all match IDs from metadataCache (to perform intersection)
    let filteredMatchIds = new Set(metadataCache.map((match) => match.matchId));

    // Iterate over each keyword and filter the matches accordingly
    keywords.forEach((keyword) => {
      let keywordMatchIds = new Set();
      console.log(`Searching for keyword: ${keyword}`);

      // Safely search in the team index
      if (teamIndex.has(keyword)) {
        console.log(`Keyword found in team index: ${keyword}`);
        teamIndex
          .get(keyword)
          .forEach((match) => keywordMatchIds.add(match.matchId));
      }

      // Safely search in the gender index
      if (genderIndex[keyword]) {
        console.log(`Keyword found in gender index: ${keyword}`);
        genderIndex[keyword].forEach((match) =>
          keywordMatchIds.add(match.matchId)
        );
      }

      // Safely search in the date index
      if (dateIndex[keyword]) {
        console.log(`Keyword found in date index: ${keyword}`);
        dateIndex[keyword].forEach((match) =>
          keywordMatchIds.add(match.matchId)
        );
      }

      // Safely search in the type index
      if (typeIndex[keyword]) {
        console.log(`Keyword found in type index: ${keyword}`);
        typeIndex[keyword].forEach((match) =>
          keywordMatchIds.add(match.matchId)
        );
      }

      // Safely search in the format index
      if (formatIndex[keyword]) {
        console.log(`Keyword found in format index: ${keyword}`);
        formatIndex[keyword].forEach((match) =>
          keywordMatchIds.add(match.matchId)
        );
      }

      // Intersect current filteredMatchIds with keywordMatchIds
      filteredMatchIds = new Set(
        [...filteredMatchIds].filter((matchId) => keywordMatchIds.has(matchId))
      );
    });

    // Convert filteredMatchIds to an array of match objects for the final response
    const finalMatches = Array.from(filteredMatchIds).map((matchId) =>
      metadataCache.find((match) => match.matchId === matchId)
    );

    // Return the filtered matches or an appropriate message if none were found
    if (finalMatches.length > 0) {
      return NextResponse.json(finalMatches, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "No matches found for the given query" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in GET /api/matches/metadata:", error.message);
    return NextResponse.json(
      { error: "Server error while processing metadata request" },
      { status: 500 }
    );
  }
}
