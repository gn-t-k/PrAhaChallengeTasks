import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testMatch: ["**/?(*.)(spec|test).(js|ts)?(x)"],
  moduleDirectories: ["node_modules", "src"],
  testPathIgnorePatterns: ["node_modules", "dist"],
};

export default config;
