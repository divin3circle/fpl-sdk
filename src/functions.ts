import axios from "axios";
import puppeteer from "puppeteer";

import {
  Bootstrap,
  PlayerSummary,
  Element,
  Player,
  Fixture,
  ElementSummaryUpcomingFixture,
  GameWeekScores,
  PlayerScore,
  Manager,
  ManagerHistory,
  ClassicLeagueStandings,
} from "./interfaces";

/*
 * @notice: Base URL of the Fantasy Premier League API
 */
export const BASE_URL: string = "https://fantasy.premierleague.com/api/";
const AUTH_URL = "https://users.premierleague.com/accounts/login/";

/************* AUTHENTICATION ***********/
/*
 * @notice: Authenticate user using email and password
 * @param: email: string
 * @param: password: string
 * @return: Promise<AxiosInstance | null>
 */

export async function authenticate(
  email: string,
  password: string
): Promise<Axios.AxiosInstance | null> {
  const headers = {
    authority: "users.premierleague.com",
    "cache-control": "max-age=0",
    "upgrade-insecure-requests": "1",
    origin: "https://fantasy.premierleague.com",
    "content-type": "application/x-www-form-urlencoded",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "sec-fetch-site": "same-site",
    "sec-fetch-mode": "navigate",
    "sec-fetch-user": "?1",
    "sec-fetch-dest": "document",
    referer: "https://fantasy.premierleague.com/my-team",
    "accept-language": "en-US,en;q=0.9",
  };

  const payload = new URLSearchParams({
    login: email,
    password: password,
    app: "plfpl-web",
    redirect_uri: "https://fantasy.premierleague.com/",
  }).toString();

  const session: Axios.AxiosInstance = axios.create({
    withCredentials: true,
  });

  try {
    const response = await session.post(AUTH_URL, payload, { headers });

    if (response.status === 200) {
      console.log("Authentication successful.");
      return session; // Return the session with cookies
    } else {
      console.error("Login failed with status:", response.status);
      return null;
    }
  } catch (error: any) {
    console.error(
      "Authentication failed:",
      error.response?.data || error.message
    );
    return null;
  }
}

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

/************* LIVE GAMEWEEK FUNCTIONS ***********/

/*
 * @notice: Fetch points scores & explanations
 * of points scored by all players in a gameweek
 * @param: gameweek: number
 * @return: Promise<GameWeekScores | null>
 */
export async function getGameweekScores(
  gameweek: number
): Promise<GameWeekScores | null> {
  if (gameweek < 1 || gameweek > 38) {
    throw new Error("Gameweek number should be between 1 and 38");
    return null;
  }
  try {
    const response = await axios.get(`${BASE_URL}event/${gameweek}/live/`);
    const data = response.data as GameWeekScores;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
 * @notice: Fetch points scores & explanations
 * of points scored by a players in a gameweek
 * @param: gameweek: number
 * @return: Promise<PlayerScore | null>
 */
export async function getPlayerScoreAndExplanation(
  gameweek: number,
  playerId: number
): Promise<PlayerScore | null> {
  try {
    const gameweekscores = await getGameweekScores(gameweek);
    const playerScore = gameweekscores?.elements.find(
      (player) => player.id === playerId
    );
    if (playerScore) {
      return playerScore;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

/************* MANAGER FUNCTIONS ***********/
/*
 * @notice: Fetch manager data
 * @param: managerId: number
 * @return: Promise<Manager | null>
 */
export async function getManagerData(
  managerId: number
): Promise<Manager | null> {
  try {
    const response = await axios.get(`${BASE_URL}entry/${managerId}/`);
    return response.data as Manager;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/*
 * @notice: Fetch manager history
 * @param: managerId: number
 * @return: Promise<ManagerHistory | null>
 */
export async function getManagerHistory(
  managerId: number
): Promise<ManagerHistory | null> {
  try {
    const response = await axios.get(`${BASE_URL}entry/${managerId}/history/`);
    return response.data as ManagerHistory;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getClassicLeagueStanding(
  leagueId: number
): Promise<ClassicLeagueStandings | null> {
  try {
    const response = await axios.get(
      `${BASE_URL}leagues-classic/${leagueId}/standings/`
    );
    const data = response.data as ClassicLeagueStandings;
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
