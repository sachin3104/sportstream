export function modifyMatchData(originalData) {
  let teamRunsSummary = {};

  originalData.innings.forEach((inning) => {
    const teamName = inning.team;
    let totalRuns = 0;
    inning.overs.forEach((over) => {
      over.deliveries.forEach((delivery) => {
        totalRuns += delivery.runs.batter;
        if (delivery.runs.extras) {
          totalRuns += delivery.runs.extras;
        }
      });
    });
    teamRunsSummary[teamName] = totalRuns;
  });
  console.log("Teams Runs Summary", teamRunsSummary);
  return teamRunsSummary;
}

export function analyzeCricketData(data) {
  // Initialize structures to store matchup data and team statistics
  const matchUpData = {}; // { bowler: { batsman: { runs: 0, balls: 0, wickets: 0 } } }
  const teamStats = {}; // { teamName: { totalRuns: 0, totalBalls: 0, totalWickets: 0 } }

  data.innings.forEach((inning) => {
    const teamName = inning.team;

    // Initialize team stats if not already present
    if (!teamStats[teamName]) {
      teamStats[teamName] = {
        totalRuns: 0,
        totalBalls: 0,
        totalWickets: 0,
      };
    }

    inning.overs.forEach((over) => {
      over.deliveries.forEach((delivery) => {
        const { batter, bowler, runs, wickets } = delivery;

        // Update Batsman vs Bowler match-up data
        if (!matchUpData[bowler]) {
          matchUpData[bowler] = {};
        }
        if (!matchUpData[bowler][batter]) {
          matchUpData[bowler][batter] = {
            runs: 0,
            balls: 0,
            wickets: 0,
          };
        }
        // Update deliveries and runs
        matchUpData[bowler][batter].runs += runs.batter;
        matchUpData[bowler][batter].balls += 1;

        // Update wicket if present
        if (wickets && wickets.length > 0) {
          matchUpData[bowler][batter].wickets += 1;
        }

        // Update team statistics
        teamStats[teamName].totalRuns += runs.total;
        teamStats[teamName].totalBalls += 1;
        if (wickets && wickets.length > 0) {
          teamStats[teamName].totalWickets += 1;
        }
      });
    });
  });

  // Calculate team metrics
  for (const team in teamStats) {
    const stats = teamStats[team];
    stats.runRate = (stats.totalRuns / stats.totalBalls) * 6; // Runs per over
    stats.wicketFrequency = stats.totalBalls / (stats.totalWickets || 1); // Average balls per wicket
  }
  // console.log("match Data", matchUpData);
  // console.log("Team Stats", teamStats);

  return {
    matchUpData,
    teamStats,
  };
}
