import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { Accounts } from 'meteor/accounts-base';
import { Link, LinksCollection } from '/imports/api/links';
import { TasksCollection } from '/imports/db/TasksCollection';
import { initializeMeteorMethods } from '/imports/api/taskMethods';

initializeMeteorMethods();

async function insertLink({ title, url }: Pick<Link, 'title' | 'url'>) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  let userId;
  const user = Accounts.findUserByUsername('alex');
  if (user) {
    userId = user._id;
  } else {
    userId = await Accounts.createUserAsync({
      username: 'alex',
      password: 'ploup',
    });
  }
  console.log('User: ', user);
  console.log('UserId: ', userId);

  if (TasksCollection.find().count() === 0) {
    await TasksCollection.insertAsync({
      ownerId: userId,
      text: 'First task in DB',
      createdAt: new Date(),
      isCompleted: true,
    });
    await TasksCollection.insertAsync({
      ownerId: 'other-user',
      text: 'Second task in DB',
      createdAt: new Date(),
      isCompleted: false,
    });
    await TasksCollection.insertAsync({
      ownerId: userId,
      text: 'Third task in DB',
      createdAt: new Date(),
      isCompleted: false,
    });
  }
});

Meteor.startup(async () => {
  // If the Links collection is empty, add some data.
  if ((await LinksCollection.find().countAsync()) === 0) {
    await insertLink({
      title: 'Do the Tutorial',
      url: 'https://react-tutorial.meteor.com/simple-todos/01-creating-app.html',
    });

    await insertLink({
      title: 'Follow the Guide',
      url: 'https://guide.meteor.com',
    });

    await insertLink({
      title: 'Read the Docs',
      url: 'https://docs.meteor.com',
    });

    await insertLink({
      title: 'Discussions',
      url: 'https://forums.meteor.com',
    });
  }

  // We publish the entire Links collection to all clients.
  // In order to be fetched in real-time to the clients
  Meteor.publish('links', function () {
    return LinksCollection.find();
  });
});
