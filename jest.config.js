module.exports = {
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "components/(.*)": "<rootDir>/src/components/$1",
    "containers/(.*)": "<rootDir>/src/containers/$1",
    "pages/(.*)": "<rootDir>/src/pages/$1",
    "static/(.*)": "<rootDir>/src/static/$1",
    "styles/(.*)": "<rootDir>/src/styles/$1",
    "utils/(.*)": "<rootDir>/src/utils/$1",
  },
};
