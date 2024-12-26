import { Player } from "./../src/interfaces";
import { getCombinedData } from "../src/index";

const PLAYER_ID = 351; // Erling Haaland

const main = async () => {
  const player: Player | null = await getCombinedData(PLAYER_ID);
  console.log(JSON.stringify(player, null, 2));
};

main();
