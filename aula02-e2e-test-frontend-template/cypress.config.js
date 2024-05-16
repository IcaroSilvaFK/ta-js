import preprocessor from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { defineConfig } from "cypress";

const { WEB_SERVER_URL } = process.env;

if (!WEB_SERVER_URL) {
  console.error("missing WEB_SERVER_URL enviroment variable!");
  process.exit(1);
}
console.log(WEB_SERVER_URL);

export default defineConfig({
  e2e: {
    async setupNodeEvents(on, config) {
      await preprocessor.addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
    specPattern: "cypress/e2e/features/*.feature",
    baseUrl: WEB_SERVER_URL,
    testIsolation: false,
  },
});
