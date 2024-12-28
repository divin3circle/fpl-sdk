import axios from "axios";

import {
  Bootstrap,
  PlayerSummary,
  Element,
  Player,
  Fixture,
  ElementSummaryUpcomingFixture,
} from "./interfaces";

/*
 * @notice: Base URL of the Fantasy Premier League API
 */
export const BASE_URL: string = "https://fantasy.premierleague.com/api/";

/************* BOOTSRAP ***********/
/*
 * @notice: Fetch Bootstrap Static Data
 * @return: Promise<Bootstrap | null>
 */
export async function getBootsrapStaticData(): Promise<Bootstrap | null> {
  try {
    const response = await axios.get(`${BASE_URL}bootstrap-static/`);
    return response.data as Bootstrap;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/************* PLAYER FUNCTIONS ***********/
/*
 * @notice: Fetch a player’s detailed information divided into 3 section
 * @param: playerId: number
 * @return: Promise<PlayerSummary | null>
 */
export async function getPlayerSummary(
  playerId: number
): Promise<PlayerSummary | null> {
  try {
    const response = await axios.get(`${BASE_URL}element-summary/${playerId}/`);
    return response.data as PlayerSummary;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
 * @notice: Fetch player's bootstrap data
 * @param: playerId: number
 * @return: Promise<Element | null>
 */
export async function getPlayerBootstrapData(
  playerId: number
): Promise<Element | null> {
  try {
    const responseFromBootstrap = await axios.get(
      `${BASE_URL}bootstrap-static/`
    );
    const dataFromBootstrap = responseFromBootstrap.data as Bootstrap;
    const player = dataFromBootstrap.elements.find(
      (player) => player.id === playerId
    ) as Element;
    if (player) {
      return player;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
 * @notice: Combines bootstrap & element player data
 * @param: playerId: number
 * @return: Promise<Player | null>
 */
export async function getCombinedData(playerId: number) {
  try {
    const bootstrap = await getPlayerBootstrapData(playerId);
    const elementSummary = await getPlayerSummary(playerId);
    if (bootstrap && elementSummary) {
      const player: Player = {
        ...bootstrap,
        ...elementSummary,
      };
      return player;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
 * @notice: Get player's upcoming fixtures
 * @param: playerId: number
 * @return: Promise<Fixture[] | null>
 */
export async function getPlayerUpcomingFixtures(
  playerId: number
): Promise<ElementSummaryUpcomingFixture[] | null> {
  try {
    const playerSummary = await getPlayerSummary(playerId);
    const remainingFixtures = playerSummary?.fixtures;
    if (remainingFixtures) {
      return remainingFixtures;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/************* FIXTURES FUNCTIONS ***********/
/*
 * @notice: Fetch all fixtures of the season
 * @return: Promise<Fixture[] | null>
 */
export async function getAllFixtures(): Promise<Fixture[] | null> {
  try {
    const response = await axios.get(`${BASE_URL}fixtures/`);
    const fixtures = response.data as Fixture[];
    return fixtures;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
 * @notice: Fetch fixture data of a specific gameweek
 * @param: gameweek: number
 * @return: Promise<Fixture[] | null>
 */
export async function getGameWeekFixtures(
  gameweek: number
): Promise<Fixture[] | null> {
  if (gameweek < 1 || gameweek > 38) {
    throw new Error("Gameweek number should be between 1 and 38");
    return null;
  }
  try {
    const response = await axios.get(`${BASE_URL}fixtures/?event=${gameweek}`);
    const fixtures = response.data as Fixture[];
    return fixtures;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*
 * @notice: Fetch all upcoming fixtures
 * @return: Promise<Fixture[] | null>
 */
export async function getAllUpcomingFixtures(): Promise<Fixture[] | null> {
  try {
    const response = await axios.get(`${BASE_URL}fixtures?future=1`);
    const fixtures = response.data as Fixture[];
    return fixtures;
  } catch (error) {
    console.log(error);
    return null;
  }
}

/*
 * @notice: Fetch upcoming gameweek number
 * @return: Promise<number | null>
 */
export async function getUpcomingGameweekNumber(): Promise<number | null> {
  try {
    const fixtures = await getAllUpcomingFixtures();
    if (fixtures) {
      return fixtures[0].event;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}
