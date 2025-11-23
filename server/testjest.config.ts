/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  roots: ["<rootDir>/tests"],
  testMatch: ["**/*.test.ts"],
  setupFilesAfterEnv: ["<rootDir>/tests/singleton.ts"],
  transformIgnorePatterns: ["node_modules/(?!(supertest|body-parser)/)"],
};
// import type { Config } from "@jest/types";

// const config: Config.InitialOptions = {
//   preset: "ts-jest",
//   testEnvironment: "node",
//   transform: {
//     "^.+\\.(ts|tsx)$": "ts-jest",
//   },
//   moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
// };

// export default config;

// import type { Config } from "jest";

// const config: Config = {
//   preset: "ts-jest",
//   testEnvironment: "node",

//   transform: {
//     "^.+\\.(ts|tsx)$": [
//       "ts-jest",
//       {
//         tsconfig: "tsconfig.json", // <-- ts-jest config goes here now
//       },
//     ],
//   },

//   moduleFileExtensions: ["ts", "tsx", "js", "json"],
//   transformIgnorePatterns: ["/node_modules/"],
// };

// export default config;
