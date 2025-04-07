import config from "@jest/config/basic.config"

export default {
  ...config,
  testMatch: ["**/__tests__/**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/__mocks__/singleton.auth.ts", "<rootDir>/__mocks__/dbAuth.ts"],
  moduleNameMapper: {
    "^@prisma/generated/auth$": "<rootDir>/../../prisma/src/generated/auth/index.ts",
    "^@shared/(.*)$": "<rootDir>/src/$1",
  },
}
