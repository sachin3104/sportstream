import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { LRUCache } from "lru-cache"; // Importing LRUCache

// Set up LRU cache to store frequently accessed match data
const matchCache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 10,
});

// Handler function for the GET request to serve specific match data
export async function GET(req, context) {
  try {
    // Extract the match ID from the request parameters and await it
    const { params } = context;
    const { id } = await params;

    // Check if match data is already in the cache
    if (matchCache.has(id)) {
      console.log(`Cache Hit for Match ID: ${id}`);
      return NextResponse.json(matchCache.get(id), { status: 200 });
    }

    // Define the path to the specific match file using the match ID
    const matchFilePath = path.join(
      process.cwd(),
      "..",
      "CricketData",
      `${id}.json`
    );

    // Check if the match file exists
    if (!fs.existsSync(matchFilePath)) {
      console.error(`Match file not found for ID: ${id}`);
      return NextResponse.json(
        { error: `Match with ID ${id} not found` },
        { status: 404 }
      );
    }

    // Read the match file content asynchronously
    const fileContent = await fs.promises.readFile(matchFilePath, "utf-8");
    const matchData = JSON.parse(fileContent);

    // Store match data in the LRU cache for future requests
    matchCache.set(id, matchData);
    console.log(`Cache Miss for Match ID: ${id}. Data loaded and cached.`);

    // Respond with the match data as JSON
    return NextResponse.json(matchData, { status: 200 });
  } catch (error) {
    console.error(`Error reading match file ${id}.json:`, error.message);
    return NextResponse.json(
      { error: "Failed to fetch match data" },
      { status: 500 }
    );
  }
}
