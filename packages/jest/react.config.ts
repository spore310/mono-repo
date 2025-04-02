// packages/jest/react.config.ts
import base from "@jest/config/jest.config";

import type { Config } from "jest";

const config: Config = {
  ...base,
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default config;
