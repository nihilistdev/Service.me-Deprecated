/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  clearMocks: true,
  coverageProvider: "v8",
  verbose: true,
  globalTeardown: "./scripts/teardown.ts",
  moduleDirectories: ["node_modules", "src"],
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  moduleNameMapper: {
    "^@root/(.*)": "<rootDir>/src/$1",
    "^@database/(.*)": "<rootDir>/src/database/$1",
    "^@context/(.*)": "<rootDir>/src/context/$1",
    "^@controllers/(.*)": "<rootDir>/src/controllers/$1",
    "^@middleware/(.*)": "<rootDir>/src/middleware/$1",
    "^@routes/(.*)": "<rootDir>/src/routes/$1",
    "^@routes": "<rootDir>/src/routes/index.ts",
    "^@types/(.*)": "<rootDir>/src/types/$1",
    "^@utils/(.*)": "<rootDir>/src/utils/$1",
  },
  resolver: undefined,
  roots: ["<rootDir>"],
  testMatch: ["**/test/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/"],
  testSequencer: "./scripts/sequencer.js",
  transform: {
    "^.+\\.[tj]sx?$": ["ts-jest"],
    "^.+\\.m?[tj]sx?$": ["ts-jest"],
    "^.+\\.ts?$": ["ts-jest", {}],
  },
  transformIgnorePatterns: ["/node_modules/", "\\.pnp\\.[^\\/]+$"],
};
