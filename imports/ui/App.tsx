import React from 'react';
import { TaskListItem } from '/imports/ui/TaskListItem';
import { useTracker } from 'meteor/react-meteor-data';
import { Task, TasksCollection } from '/imports/api/TasksCollection';

const tasks = [
  { _id: '1', text: 'first task' },
  { _id: '2', text: 'second task' },
  { _id: '3', text: 'third task' },
];

export const App = () => {
  const dbTasks = useTracker(() => TasksCollection.find().fetch()) as Task[];
  console.log('dbTasks:', dbTasks);

  return (
    <div>
      <h1>Welcome to Meteor!</h1>
      <ul>
        {dbTasks.map((task) => (
          <TaskListItem key={task._id} task={task} />
        ))}
      </ul>
    </div>
  );
};
