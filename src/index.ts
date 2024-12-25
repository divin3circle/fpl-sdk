import axios from "axios";

import { Bootstrap, PlayerSummary } from "./interfaces";

/*
 * @notice: Base URL of the Fantasy Premier League API
 */
export const BASE_URL: string = "https://fantasy.premierleague.com/api/";

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

/*
 * @notice: Fetcha player’s detailed information divided into 3 section
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

const playerSummary = await getPlayerSummary(351);
if (playerSummary) {
  console.log(playerSummary);
}
