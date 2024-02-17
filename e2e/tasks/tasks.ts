import { MongoClient, ObjectId } from 'mongodb';

const testUser = {
  // Meteor uses string for user IDs
  _id: 'testUserId' as unknown as ObjectId,
  createdAt: new Date(),
  services: {
    password: {
      // plain text: "pw"
      bcrypt: '$2b$10$.JcBAAvCuaZlnQIBW/Q7GedYUY47ZcBe3rFnmGEv1uGqPvY3KL69e',
    },
  },
  username: 'testUser',
};

const otherUser = {
  // Meteor uses string for user IDs
  _id: 'otherUserId' as unknown as ObjectId,
  createdAt: new Date(),
  services: {
    password: {
      // plain text: "pw"
      bcrypt: '$2b$10$.JcBAAvCuaZlnQIBW/Q7GedYUY47ZcBe3rFnmGEv1uGqPvY3KL69e',
    },
  },
  username: 'otherUser',
};

export async function clearDb(): Promise<null> {
  const mongo = new MongoClient('mongodb://localhost:4001/meteor');
  await mongo.connect();
  const collections = await mongo.db().collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
  return null;
}

export async function createTestUser() {
  const mongo = new MongoClient('mongodb://localhost:4001/meteor');
  await mongo.connect();
  await mongo.db().collection('users').insertOne(testUser);

  return null;
}

export async function createOtherUser() {
  const mongo = new MongoClient('mongodb://localhost:4001/meteor');
  await mongo.connect();
  await mongo.db().collection('users').insertOne(otherUser);

  return null;
}

export async function createAppointments() {
  const mongo = new MongoClient('mongodb://localhost:4001/meteor');
  await mongo.connect();
  await mongo
    .db()
    .collection('appointments')
    .insertMany([
      {
        ownerId: testUser._id,
        patientFirstName: 'Clark',
        patientLastName: 'Kent',
        date: new Date(),
      },
      {
        ownerId: testUser._id,
        patientFirstName: 'Bruce',
        patientLastName: 'Wayne',
        date: new Date(),
      },
      {
        ownerId: otherUser._id,
        patientFirstName: 'Peter',
        patientLastName: 'Parker',
        date: new Date(),
      },
      {
        ownerId: otherUser._id,
        patientFirstName: 'Steve',
        patientLastName: 'Rogers',
        date: new Date(),
      },
    ]);

  return null;
}
