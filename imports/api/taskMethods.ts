import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TasksCollection } from '/imports/db/TasksCollection';

function ensureUserIsLoggedIn(userId: string | null) {
  if (userId === null) {
    throw new Meteor.Error('Not logged in');
  }
}

async function ensureUserIsTaskOwner(userId: string, taskId: string) {
  const task = await TasksCollection.findOneAsync({
    _id: taskId,
    ownerId: userId,
  });

  if (task === undefined) {
    throw new Meteor.Error('Access denied');
  }
}

export function initializeTaskMethods(): void {
  Meteor.methods({
    async 'tasks.create'(text: string): Promise<string> {
      ensureUserIsLoggedIn(this.userId);
      check(text, String);

      const taskId = await TasksCollection.insertAsync({
        ownerId: this.userId!,
        text: text.trim(),
        createdAt: new Date(),
        isCompleted: false,
      });

      return taskId;
    },
    async 'tasks.remove'(taskId: string): Promise<void> {
      ensureUserIsLoggedIn(this.userId);
      check(taskId, String);
      await ensureUserIsTaskOwner(this.userId!, taskId);

      await TasksCollection.removeAsync(taskId);
    },
    async 'tasks.setIsCompleted'(
      taskId: string,
      isCompleted: boolean
    ): Promise<void> {
      ensureUserIsLoggedIn(this.userId);
      check(taskId, String);
      check(isCompleted, Boolean);
      await ensureUserIsTaskOwner(this.userId!, taskId);

      await TasksCollection.updateAsync(taskId, { $set: { isCompleted } });
    },
  });
}
