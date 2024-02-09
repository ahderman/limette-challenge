import { Meteor } from 'meteor/meteor';
import { Link, LinksCollection } from '/imports/api/links';
import { TasksCollection } from '/imports/api/TasksCollection';

async function insertLink({ title, url }: Pick<Link, 'title' | 'url'>) {
  await LinksCollection.insertAsync({ title, url, createdAt: new Date() });
}

Meteor.startup(async () => {
  if (TasksCollection.find().count() === 0) {
    await TasksCollection.insertAsync({ text: 'First task in DB' });
    await TasksCollection.insertAsync({ text: 'Second task in DB' });
    await TasksCollection.insertAsync({ text: 'Third task in DB' });
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
