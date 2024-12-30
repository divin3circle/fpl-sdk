import {
  Fixture,
  GameWeekScores,
  Manager,
  Player,
  PlayerScore,
} from "./../src/interfaces";
import {
  getAllFixtures,
  getAllUpcomingFixtures,
  getClassicLeagueStanding,
  getCombinedData,
  getGameWeekFixtures,
  getGameweekScores,
  getManagerData,
  getPlayerScoreAndExplanation,
  getUpcomingGameweekNumber,
} from "../src/index";

const PLAYER_ID = 351; // Erling Haaland
const GAMEWEEK = 18;

const main = async () => {
  // const player: Player | null = await getCombinedData(PLAYER_ID);
  // console.log(JSON.stringify(player, null, 2));
  // const fixtures: Fixture[] | null = await getAllFixtures();
  // console.log(JSON.stringify(fixtures, null, 2));
  // const fixtures: Fixture[] | null = await getGameWeekFixtures(GAMEWEEK);
  // console.log(JSON.stringify(fixtures, null, 2));
  // const allUpcomingFixtures = await getAllUpcomingFixtures();
  // console.log(JSON.stringify(allUpcomingFixtures, null, 2));
  // const gwScores: GameWeekScores | null = await getGameweekScores(19);
  // console.log(JSON.stringify(gwScores, null, 2));
  // const playerScore: PlayerScore | null = await getPlayerScoreAndExplanation(
  //   GAMEWEEK,
  //   PLAYER_ID
  // );
  // console.log(JSON.stringify(playerScore, null, 2));
  // const manager: Manager | null = await getManagerData(3105429);
  // console.log(JSON.stringify(manager, null, 2));
  const lgStanding = await getClassicLeagueStanding(1346286);
  console.log(JSON.stringify(lgStanding, null, 2));
};

main();
