# Un-official SDK for the FPL API

This package provides easy access to Fantasy Premier League (FPL) data through the FPL API. It allows you to fetch detailed player information, bootstrap data, and combine them for enriched player data, all with simple functions that return structured data.

## Features

- **Fetch Bootstrap Static Data**: Get general FPL data such as teams, players, and their details.
- **Fetch Player Summary**: Retrieve detailed information about a specific player, including their performance.
- **Fetch Player's Bootstrap Data**: Get player data directly from the bootstrap API endpoint.
- **Combine Bootstrap & Element Data**: Combine bootstrap and player summary data into a single object for easy use.

## Installation

You can install the package via npm:

```bash
npm install fpl-sdk
```

## Usage

### 1. Get Bootstrap Static Data

The `getBootsrapStaticData()` function fetches general static data about the players, teams, and FPL setup.

```typescript
import { getBootsrapStaticData } from "fpl-sdk";

async function fetchBootstrapData() {
  const data = await getBootsrapStaticData();
  console.log(data);
}

fetchBootstrapData();
```

### 2. Get Player Summary

The `getPlayerSummary(playerId: number)` function returns detailed information about a specific player, including performance statistics like total points, form, and transfers.

```typescript
import { getPlayerSummary } from "fpl-sdk";

async function fetchPlayerSummary(playerId: number) {
  const playerData = await getPlayerSummary(playerId);
  console.log(playerData);
}

fetchPlayerSummary(12345); // Use the player ID
```

### 3. Get Player's Bootstrap Data

The `getPlayerBootstrapData(playerId: number)` function fetches the player's bootstrap data from the FPL API, including their basic statistics.

```typescript
import { getPlayerBootstrapData } from "fpl-sdk";

async function fetchPlayerBootstrapData(playerId: number) {
  const playerData = await getPlayerBootstrapData(playerId);
  console.log(playerData);
}

fetchPlayerBootstrapData(12345); // Use the player ID
```

### 4. Get Combined Data (Bootstrap + Element)

The `getCombinedData(playerId: number)` function combines both the bootstrap and element player data into a single object. This function is helpful if you want a comprehensive view of a player.

```typescript
import { getCombinedData } from "fpl-sdk";

async function fetchCombinedPlayerData(playerId: number) {
  const combinedData = await getCombinedData(playerId);
  console.log(combinedData);
}

fetchCombinedPlayerData(12345); // Use the player ID
```

Types
This package uses TypeScript and provides the following types for the FPL data:

- Bootstrap: Contains all the general FPL setup data (teams, players, etc.).
- PlayerSummary: Contains detailed player performance data.
- Element: The basic data for each player.
- Player: A combined type that includes both bootstrap and element data for a player.

Here are some additional functions that are planned for future updates:

- Get Player Stats for a Specific Gameweek: Function to retrieve a player's points, transfers, and other statistics for a specific gameweek.
- Get Team Information: Function to fetch data for a specific team, including their rankings, matches played, and performance.
- Get Upcoming Fixtures: Function to retrieve upcoming fixtures for all teams or a specific team.
- Get Top Scoring Players: A function to return the top players based on total points for the current season.
- Get Player Form: Function to calculate a player's form over the last 5 gameweeks.

## License

This package is licensed under the MIT License.
