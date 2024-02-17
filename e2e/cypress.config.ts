import { defineConfig } from 'cypress';
import { MongoClient, ObjectId } from 'mongodb';

const testUser = {
  // Meteor uses string
  _id: 'abc' as unknown as ObjectId,
  createdAt: new Date(),
  services: {
    password: {
      // plain text: "pw"
      bcrypt: '$2b$10$.JcBAAvCuaZlnQIBW/Q7GedYUY47ZcBe3rFnmGEv1uGqPvY3KL69e',
    },
  },
  username: 'testUser',
};

export default defineConfig({
  e2e: {
    setupNodeEvents(on, _config) {
      on('task', {
        async clearDb(): Promise<null> {
          const mongo = new MongoClient('mongodb://localhost:4001/meteor');
          await mongo.connect();
          const collections = await mongo.db().collections();
          for (let collection of collections) {
            await collection.deleteMany({});
          }
          return null;
        },
        async createTestUser() {
          const mongo = new MongoClient('mongodb://localhost:4001/meteor');
          await mongo.connect();
          await mongo.db().collection('users').insertOne(testUser);

          return null;
        },
      });
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
