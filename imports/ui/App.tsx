import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';
import { TaskListItem } from '/imports/ui/TaskListItem';
import { Task, TasksCollection } from '/imports/db/TasksCollection';
import { TaskForm } from '/imports/ui/TaskForm';
import { LoginForm } from '/imports/ui/components/LoginForm';
import { LogoutButton } from '/imports/ui/components/LogoutButton';
import * as auth from '/imports/api/auth';

interface trackerReturnValue {
  isLoading: boolean;
  tasks: Task[] | undefined;
  nbIncompleteTasks: number | undefined;
}

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);

  const isLoggedIn = useTracker(auth.isUserLoggedIn);

  const { isLoading, tasks, nbIncompleteTasks }: trackerReturnValue =
    useTracker(() => {
      const handle = Meteor.subscribe('tasks');

      if (!handle.ready()) {
        return { isLoading: true };
      }

      let queryFilter: Mongo.Selector<Task> = {};
      if (hideCompleted) {
        queryFilter = { isCompleted: { $eq: false } };
      }
      const tasks = TasksCollection.find(queryFilter, {
        sort: { createdAt: -1 },
      }).fetch();

      const nbIncompleteTasks = TasksCollection.find({
        isCompleted: { $eq: false },
      }).count();

      return { isLoading: false, tasks, nbIncompleteTasks };
    });

  async function handleTaskCompletionStatusChange(
    taskId: string,
    isCompleted: boolean
  ): Promise<void> {
    await Meteor.call('tasks.setIsCompleted', taskId, isCompleted);
  }

  async function handleTaskDeleteButtonClicked(_id: string): Promise<void> {
    await Meteor.call('tasks.remove', _id);
  }

  return !isLoggedIn ? (
    <div>
      <h1>LiMetTe</h1>
      <LoginForm />
    </div>
  ) : (
    <div>
      <h1>LiMetTe {nbIncompleteTasks ? `(${nbIncompleteTasks})` : ''}</h1>
      <LogoutButton />

      <div>{isLoading ? 'Loading...' : null}</div>

      <TaskForm />

      <button onClick={() => setHideCompleted(!hideCompleted)}>
        {hideCompleted ? 'Show all' : 'Hide completed'}
      </button>

      <ul>
        {tasks &&
          tasks.map((task) => (
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
