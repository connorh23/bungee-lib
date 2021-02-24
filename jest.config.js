// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

   // Automatically clear mock calls and instances between every test
   clearMocks: true,

   collectCoverage: true,
   coverageDirectory: "coverage",
   coveragePathIgnorePatterns: [

      // Standard ignorePatterns
      "/__test__/",
      "/node_modules/",
      "./jest.config.js",
      ".eslintrc.js",

   ],
   coverageThreshold: {
      global: {
         statements: 80,
         branches: 70,
         lines: 70,
         functions: 70,
      }
   },


   testMatch: [
      "**/__test__/**/*.test.[jt]s?(x)",
      "**/?(*.)+(spec|test).[tj]s?(x)"
   ],
};
