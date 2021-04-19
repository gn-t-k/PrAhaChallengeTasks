import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleDirectories: ["node_modules", "src"],
};

export default config;
