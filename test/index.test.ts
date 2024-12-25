import axios from "axios";
import { getBootsrapStaticData, BASE_URL } from "../src/index";
import { mockData } from "./mocks";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("getBootsrapStaticData", () => {
  it("should fetch bootstrap static data successfully", async () => {
    mockedAxios.get.mockResolvedValue({
      data: mockData,
      status: 200,
      statusText: "OK",
      headers: {},
      config: {
        url: `${BASE_URL}bootstrap-static/`,
      },
    });

    const result = await getBootsrapStaticData();
    expect(result).toEqual(mockData);
  });

  it("should return null if there is an error", async () => {
    mockedAxios.get.mockRejectedValue(new Error("Network Error"));

    const result = await getBootsrapStaticData();
    expect(result).toBeNull();
  });
});
