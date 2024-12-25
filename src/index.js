import axios from "axios";
/*
 * @notice: Base URL of the Fantasy Premier League API
 */
export const BASE_URL = "https://fantasy.premierleague.com/api/";
/*
 * @notice: Fetch Bootstrap Static Data
 * @return: Promise<Bootstrap | null>
 */
export async function getBootsrapStaticData() {
    try {
        const response = await axios.get(`${BASE_URL}bootstrap-static/`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
/*
 * @notice: Fetch a player’s detailed information divided into 3 section
 * @param: playerId: number
 * @return: Promise<PlayerSummary | null>
 */
export async function getPlayerSummary(playerId) {
    try {
        const response = await axios.get(`${BASE_URL}element-summary/${playerId}/`);
        return response.data;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
/*
 * @notice: Fetch player's bootstrap data
 * @param: playerId: number
 * @return: Promise<Element | null>
 */
export async function getPlayerBootstrapData(playerId) {
    try {
        const responseFromBootstrap = await axios.get(`${BASE_URL}bootstrap-static/`);
        const dataFromBootstrap = responseFromBootstrap.data;
        const player = dataFromBootstrap.elements.find((player) => player.id === playerId);
        if (player) {
            return player;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
/*
 * @notice: Combines bootstrap & element player data f
 * @param: playerId: number
 * @return: Promise<Player | null>
 */
export async function getCombinedData(playerId) {
    try {
        const bootstrap = await getPlayerBootstrapData(playerId);
        const elementSummary = await getPlayerSummary(playerId);
        if (bootstrap && elementSummary) {
            const player = Object.assign(Object.assign({}, bootstrap), elementSummary);
            return player;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
const pl = await getCombinedData(351);
console.log(pl);
