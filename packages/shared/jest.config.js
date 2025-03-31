import config from "../jest/basic.config.js";

export default {
  ...config,
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterEnv: [
    // "<rootDir>/__tests__/singleton.auth.ts",
    "<rootDir>/__mocks__/singleton.auth.ts",
    "<rootDir>/__mocks__/dbAuth.ts",
  ], // Add the path to your singleton file
  moduleNameMapper: {
    "^@prisma/generated/auth$":
      "<rootDir>/../../prisma/src/generated/auth/index.ts",
    "^@shared/(.*)$": "<rootDir>/src/$1",
  },
};
