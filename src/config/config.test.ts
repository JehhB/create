import { getConfig, defaultConfig } from "./config";

import * as fs from "fs";
jest.mock("fs");

describe("config", () => {
  it("should be equal to default config when there is no config file", () => {
    const exists = fs.existsSync as jest.Mock;
    exists.mockReturnValue(false);

    expect(getConfig()).toBe(defaultConfig);
    expect(exists).toHaveBeenCalled();
  });
});
