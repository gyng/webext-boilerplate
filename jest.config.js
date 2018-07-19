module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testRegex: ".*.test.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFiles: ["jest-webextension-mock"],
  modulePathIgnorePatterns: ["<rootDir>/web-ext-artifacts/"],
  moduleNameMapper: {
    "^@src[/](.+)": "<rootDir>/src/$1"
  }
};
