import React from 'react';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';
import { TaskListItem } from '/imports/ui/TaskListItem';
import { Task, TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from '/imports/ui/TaskForm';

export const App = () => {
  const dbTasks = useTracker(() =>
    TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch()
  ) as Task[];
  console.log('dbTasks:', dbTasks);

  async function handleTaskCompletionStatusChange(
    taskId: string,
    isCompleted: boolean
  ): Promise<void> {
    await TasksCollection.updateAsync(taskId, {
      $set: { isCompleted: isCompleted },
    });
  }

  async function handleTaskDeleteButtonClicked(_id: string): Promise<void> {
    await TasksCollection.removeAsync(_id);
  }

  return (
    <div>
      <h1>Welcome to Meteor!</h1>

      <TaskForm />

      <ul>
        {dbTasks.map((task) => (
          <TaskListItem
            key={task._id}
            task={task}
            onTaskCompletionStatusChange={handleTaskCompletionStatusChange}
            onTaskDeleteButtonClicked={handleTaskDeleteButtonClicked}
          />
        ))}
      </ul>
    </div>
  );
};
