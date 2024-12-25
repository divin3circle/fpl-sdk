import axios from "axios";
import { getPlayerSummary, BASE_URL } from "../src/index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
