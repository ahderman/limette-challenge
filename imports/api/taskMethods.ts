import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

function ensureUserIsLoggedIn(userId: string | null) {
  if (!userId) {
    throw new Meteor.Error('Not logged in');
  }
}

export function initializeTaskMethods(): void {
  Meteor.methods({
    async 'tasks.insert'(text: string): Promise<void> {
      ensureUserIsLoggedIn(this.userId);
      check(text, String);

      await TasksCollection.insertAsync({
        ownerId: this.userId!,
        text: text.trim(),
        createdAt: new Date(),
        isCompleted: false,
      });
    },
    async 'tasks.remove'(taskId: string): Promise<void> {
      ensureUserIsLoggedIn(this.userId);
      check(taskId, String);

      await TasksCollection.removeAsync(taskId);
    },
    async 'tasks.setIsCompleted'(
      taskId: string,
      isCompleted: boolean
    ): Promise<void> {
      ensureUserIsLoggedIn(this.userId);
      check(taskId, String);
      check(isCompleted, Boolean);

      await TasksCollection.updateAsync(taskId, { $set: { isCompleted } });
    },
  });
}
