import React from 'react';

interface TaskListItemProps {
  task: {
    text: string;
  };
}

export const TaskListItem = ({ task }: TaskListItemProps) => {
  return <li>{task.text}</li>;
};
