/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", { jsc: { target: "es2020" } }],
  },
  testEnvironment: "node",
  modulePathIgnorePatterns: ["<rootDir>/dist"],
};
