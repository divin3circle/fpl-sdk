import axios from "axios";
/*
 * @notice: Base URL of the Fantasy Premier League API
 */
const BASE_URL = "https://fantasy.premierleague.com/api/";
/*
 * @notice: Fetch Bootstrap Static Data
 */
export async function getBootsrapStaticData() {
    try {
        const response = await axios.get(`${BASE_URL}bootstrap-static/`);
        return response;
    }
    catch (error) {
        console.error(error);
        return null;
    }
}
const bootstrapData = await getBootsrapStaticData();
if (bootstrapData) {
    console.log(bootstrapData);
}
