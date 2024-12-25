import axios from "axios";

import { Bootstrap } from "./interfaces";

/*
 * @notice: Base URL of the Fantasy Premier League API
 */
export const BASE_URL: string = "https://fantasy.premierleague.com/api/";

/*
 * @notice: Fetch Bootstrap Static Data
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
