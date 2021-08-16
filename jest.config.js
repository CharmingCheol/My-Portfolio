module.exports = {
  setupFilesAfterEnv: ["<rootDir>src/setupTests.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "components/(.*)": "<rootDir>/src/components/$1",
    "containers/(.*)": "<rootDir>/src/containers/$1",
    "hooks/(.*)": "<rootDir>/src/hooks/$1",
    "pages/(.*)": "<rootDir>/src/pages/$1",
    "static/(.*)": "jest-transform-stub",
    "styles/(.*)": "<rootDir>/src/styles/$1",
    "utils/(.*)": "<rootDir>/src/utils/$1",
  },
};
