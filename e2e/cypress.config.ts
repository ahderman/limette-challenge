import { defineConfig } from 'cypress';
import * as tasks from '/e2e/tasks/tasks';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, _config) {
      on('task', tasks);
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
