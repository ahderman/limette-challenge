import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { Accounts } from 'meteor/accounts-base';

import { AppointmentCollection } from '/imports/db/AppointmentCollection';

if (process.env['LIMETTE_ENVIRONMENT'] !== 'dev') {
  throw new Error('devUtils.ts file loaded in wrong environment');
}

function randomInt(max: number) {
  return Math.floor(Math.random() * max);
}

function pickRandom(array: any[]) {
  const index = randomInt(array.length);
  return array[index];
}

const FIRST_NAMES = [
  'Maria',
  'Kathleen',
  'Zara',
  'Ryan',
  'Sarah',
  'John',
  'Freddie',
  'Noah',
  'Leon',
  'Dominic',
];

const LAST_NAMES = [
  'Gärtner',
  'Möller',
  'Eichelberger',
  'Zimmerman',
  'Faust',
  'Kunze',
  'Krueger',
  'Kluge',
  'Reiniger',
  'Baumgaertner',
];

// Code borrowed from https://stackoverflow.com/a/563442
function addDays(date: Date, days: number) {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getRandomDate() {
  const currentDate = new Date();
  return addDays(currentDate, randomInt(31));
}

async function insertRandomAppointment(ownerId: string) {
  await AppointmentCollection.insertAsync({
    ownerId: ownerId,
    patientFirstName: pickRandom(FIRST_NAMES),
    patientLastName: pickRandom(LAST_NAMES),
    date: getRandomDate(),
  });
}

async function seedDatabase() {
  console.log('Seeding database');

  let test1User = Accounts.findUserByUsername('test1');
  if (!test1User) {
    await Accounts.createUserAsync({ username: 'test1', password: 'pw' });
    test1User = Accounts.findUserByUsername('test1');
  }

  let test2User = Accounts.findUserByUsername('test2');
  if (!test2User) {
    await Accounts.createUserAsync({ username: 'test2', password: 'pw' });
    test2User = Accounts.findUserByUsername('test2');
  }

  if (AppointmentCollection.find().count() === 0) {
    for (let i = 0; i < 20; i++) {
      await insertRandomAppointment(test1User!._id);
      await insertRandomAppointment(test2User!._id);
    }
  }
}

Meteor.startup(async () => {
  await seedDatabase();
});
