module.exports = {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  moduleNameMapper: {
    "api/(.*)$": "<rootDir>/src/api/$1",
    "common/(.*)$": "<rootDir>/src/common/$1",
    "components/(.*)$": "<rootDir>/src/components/$1",
    "^constants/(.*)$": "<rootDir>/src/constants/$1",
    "containers/(.*)$": "<rootDir>/src/containers/$1",
    "fireConfig/(.*)$": "<rootDir>/src/fireConfig/$1",
    fixtures: "<rootDir>/src/fixtures/index",
    "hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "services/(.*)$": "<rootDir>/src/services/$1",
    "pages/(.*)$": "<rootDir>/src/pages/$1",
    "reducers/(.*)$": "<rootDir>/src/reducers/$1",
    "static/(.*)$": "jest-transform-stub",
    "store/(.*)$": "<rootDir>/src/store/$1",
    "styles/(.*)$": "<rootDir>/src/styles/$1",
    "types/(.*)$": "<rootDir>/src/types/$1",
  },
};
