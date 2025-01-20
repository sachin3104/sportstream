import fs from "fs";
import path from "path";

let metadataCache = null;
let teamIndex = new Map();
let genderIndex = {};
let dateIndex = {};
let typeIndex = {};
let formatIndex = {};
let isMetadataLoaded = false;

// Function to preload metadata and create indexes
export const preloadMetadata = async () => {
  try {
    if (isMetadataLoaded) {
      return;
    }
    // Define the path to the BIGGER DATASET
    // const metadataPath = path.join(
    //   process.cwd(),
    //   "..",
    //   "CricketData",
    //   "metadata.json"
    // );

    // Path to DATASET in src/data/CricketData
    const metadataPath = path.join(
      process.cwd(),
      "src",
      "data",
      "CricketData",
      "metadata.json"
    );

    if (!fs.existsSync(metadataPath)) {
      console.error("Metadata file does not exist at:", metadataPath);
      throw new Error(`Metadata file does not exist at path: ${metadataPath}`);
    }

    // Load metadata into memory
    const fileContent = await fs.promises.readFile(metadataPath, "utf-8");
    // console.log(fileContent);
    try {
      metadataCache = JSON.parse(fileContent);
    } catch (jsonError) {
      throw new Error(`Failed to parse metadata.json: ${jsonError.message}`);
    }

    // Initialize indexes
    teamIndex = new Map();
    genderIndex = {};
    dateIndex = {};
    typeIndex = {};
    formatIndex = {};

    // Build the indexes based on the metadata
    metadataCache.forEach((match) => {
      const { teams, gender, date, type, format } = match;

      // Index by partial team names (both team1 and team2), converted to lowercase for consistency
      [teams.team1, teams.team2].forEach((team) => {
        const teamLower = team.toLowerCase();

        // Split the team name into components (e.g., "south africa" => ["south", "africa"])
        const teamParts = teamLower.split(" ");

        // Index each component as well as the full name
        teamParts.forEach((part) => {
          if (!teamIndex.has(part)) {
            teamIndex.set(part, []);
          }
          teamIndex.get(part).push(match);
        });

        // Also index the full team name
        if (!teamIndex.has(teamLower)) {
          teamIndex.set(teamLower, []);
        }
        teamIndex.get(teamLower).push(match);
      });

      // Index by gender
      const genderLower = gender.toLowerCase();
      if (!genderIndex[genderLower]) {
        genderIndex[genderLower] = [];
      }
      genderIndex[genderLower].push(match);

      // Index by date
      if (!dateIndex[date]) {
        dateIndex[date] = [];
      }
      dateIndex[date].push(match);

      // Index by type (e.g., "international", "domestic")
      const typeLower = type.toLowerCase();
      if (!typeIndex[typeLower]) {
        typeIndex[typeLower] = [];
      }
      typeIndex[typeLower].push(match);

      // Index by format (e.g., "T20", "ODI", "Test")
      const formatLower = format.toLowerCase();
      if (!formatIndex[formatLower]) {
        formatIndex[formatLower] = [];
      }
      formatIndex[formatLower].push(match);
    });

    console.log("Metadata and indexes successfully preloaded.");
    console.log("Indexes created:");
    console.log("Team Index:", Array.from(teamIndex.keys()));
    console.log("Gender Index:", Object.keys(genderIndex));
    console.log("Date Index:", Object.keys(dateIndex));
    console.log("Type Index:", Object.keys(typeIndex));
    console.log("Format Index:", Object.keys(formatIndex));

    console.log("Metadata and indexes successfully preloaded");
    isMetadataLoaded = true;
  } catch (error) {
    console.error("Error loading metadata.json during server startup:", error);
  }
};

// Call the function to preload metadata when the server starts
// preloadMetadata();

export {
  metadataCache,
  teamIndex,
  genderIndex,
  dateIndex,
  typeIndex,
  formatIndex,
};
