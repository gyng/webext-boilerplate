// @ts-check

module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "esbuild-jest",
  },
  testRegex: ".*.test.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["<rootDir>/web-ext-artifacts/"],
  moduleNameMapper: {
    "^@src[/](.+)": "<rootDir>/src/$1",
    "^@test[/](.+)": "<rootDir>/test/$1",
    "^@vendor[/](.+)": "<rootDir>/vendor/$1",
  },
  setupFiles: ["jest-webextension-mock"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  testEnvironment: "jsdom",
};
