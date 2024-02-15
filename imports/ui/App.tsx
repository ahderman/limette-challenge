import React, { useState } from 'react';
import { Mongo } from 'meteor/mongo';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';
import { TaskListItem } from '/imports/ui/TaskListItem';
import { Task, TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from '/imports/ui/TaskForm';
import { LoginForm } from '/imports/ui/LoginForm';
import { LogoutButton } from '/imports/ui/LogoutButton';
import * as auth from '/imports/api/auth';

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const isLoggedIn = useTracker(auth.isUserLoggedIn);

  const dbTasks = useTracker(() => {
    console.log('auth.getCurrentUser(): ', auth.getCurrentUser());
    console.log('auth.getCurrentUserId(): ', auth.getCurrentUserId());
    let queryFilter: Mongo.Selector<Task> = {
      ownerId: auth.getCurrentUserId()!,
    };
    if (hideCompleted) {
      queryFilter = {
        ownerId: auth.getCurrentUserId()!,
        isCompleted: { $eq: false },
      };
    }
    return TasksCollection.find(queryFilter, {
      sort: { createdAt: -1 },
    }).fetch();
  }) as Task[];
  console.log('dbTasks:', dbTasks);

  const nbIncompleteTasks = useTracker(() => {
    return TasksCollection.find({
      ownerId: auth.getCurrentUserId()!,
      isCompleted: { $eq: false },
    }).count();
  });

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

  const nbIncompleteTasksText =
    nbIncompleteTasks > 0 ? `(${nbIncompleteTasks})` : '';

  return !isLoggedIn ? (
    <div>
      <h1>LiMetTo</h1>
      <LoginForm />
    </div>
  ) : (
    <div>
      <h1>LiMetTo {nbIncompleteTasksText}</h1>

      <LogoutButton />

      <TaskForm />

      <button onClick={() => setHideCompleted(!hideCompleted)}>
        {hideCompleted ? 'Show all' : 'Hide completed'}
      </button>

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
