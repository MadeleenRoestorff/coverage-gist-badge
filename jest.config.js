module.exports = {
  testEnvironment: "node",
  collectCoverageFrom: ["./index.js"],
  coverageReporters: ["text-summary"],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 75,
      statements: 0
    }
  }
};
