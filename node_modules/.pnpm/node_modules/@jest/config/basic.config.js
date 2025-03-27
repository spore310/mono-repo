const config = {
  preset: "ts-jest/presets/default-esm", // Use ts-jest with ESM
  testEnvironment: "node", // Set the test environment
  extensionsToTreatAsEsm: [".ts"], // Treat .ts files as ESM
  transform: {
    "^.+\\.ts$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "<rootDir>/tsconfig.json", // Point to the tsconfig.json
      },
    ],
  },
  moduleNameMapper: {
    "^@shared/(.*)$": "<rootDir>/../shared/src/$1",
    "^@common/(.*)$": "<rootDir>/../shared/src/utils/common/$1",
    "^@jest/config/(.*)$": "<rootDir>/packages/jest/$1",
    "^@prisma/(.*)$": "<rootDir>/../prisma/src/$1",
    "^(\\.{1,2}/.*)\\.js$": "$1", // Fix for ESM imports
  },
  moduleFileExtensions: ["ts", "js"],
  globals: {
    "ts-jest": {
      useESM: true,
    },
  },
};

export default config;
