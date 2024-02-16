import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(_on, _config) {
      // implement node event listeners here
    },
    supportFile: 'e2e/support/e2e.ts',
    specPattern: 'e2e/tests/**/*.cy.ts',
    baseUrl: 'http://localhost:4000',
  },
  fixturesFolder: 'e2e/fixtures',
  downloadsFolder: 'e2e/downloads',
  screenshotsFolder: 'e2e/screenshots',
  supportFolder: 'e2e/support',
  videosFolder: 'e2e/videos',
});
