import axios from "axios";
import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { Browser, Page, Cookie } from "puppeteer";

puppeteer.use(StealthPlugin());
function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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
async function getFreeProxy(): Promise<string | null> {
  try {
    const response = await axios.get<string>(
      "https://api.proxyscrape.com/v2/?request=getproxies&protocol=http&timeout=1000&country=all"
    );
    const proxies = response.data.split("\n").filter(Boolean);
    const randomProxy = proxies[Math.floor(Math.random() * proxies.length)];
    console.log("Using proxy:", randomProxy);
    return randomProxy;
  } catch (error: any) {
    console.error("Failed to fetch proxy:", error.message);
    return null;
  }
}

export async function authenticate(
  email: string,
  password: string
): Promise<Cookie[] | null> {
  const proxy = await getFreeProxy();
  if (!proxy) {
    console.error("No proxy available, cannot proceed.");
    return null;
  }
  const browser: Browser = await puppeteer.launch({
    headless: false,
    // args: [`--proxy-server=${proxy}`],
  });

  const page: Page = await browser.newPage();

  try {
    // Navigate to the login page
    await page.goto("https://users.premierleague.com/accounts/login/", {
      waitUntil: "networkidle2",
    });
    await delay(Math.random() * 3000 + 2000);

    await page.waitForSelector('input[name="login"]', { timeout: 70000 });
    await page.type('input[name="login"]', email);

    await delay(Math.random() * 3000 + 2000);
    await page.type('input[name="password"]', password);

    await delay(Math.random() * 3000 + 2000);
    await page.click('button[type="submit"]');

    await page.waitForNavigation({ waitUntil: "networkidle2" });

    const cookies = await page.cookies();
    const plProfileCookie = cookies.find(
      (cookie) => cookie.name === "pl_profile"
    );

    if (cookies) {
      console.log("Login successful, cookie:", cookies);
      return cookies;
    } else {
      console.error("Login failed, no pl_profile cookie found.");
      return null;
    }
  } catch (error: any) {
    console.error("Authentication failed:", error.message);
    return null;
  } finally {
    await browser.close();
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
