import { Meteor } from 'meteor/meteor';
import { TasksCollection } from '/imports/db/TasksCollection';

export function initializeTaskPublications() {
  Meteor.publish('tasks', function () {
    return TasksCollection.find({ ownerId: this.userId! });
  });
}
