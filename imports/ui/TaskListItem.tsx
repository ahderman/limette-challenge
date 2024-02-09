import React, { useState } from 'react';

interface TaskListItemProps {
  task: {
    _id: string;
    text: string;
    createdAt: Date;
    isCompleted: boolean;
  };
  onTaskCompletionStatusChange: (
    _id: string,
    isCompleted: boolean
  ) => Promise<void>;
  onTaskDeleteButtonClicked: (_id: string) => Promise<void>;
}

export const TaskListItem = ({
  task,
  onTaskCompletionStatusChange,
  onTaskDeleteButtonClicked,
}: TaskListItemProps) => {
  const [checkboxState, setCheckboxState] = useState(task.isCompleted);

  async function handleCheckboxChange() {
    await onTaskCompletionStatusChange(task._id, !checkboxState);
    setCheckboxState(!checkboxState);
  }

  async function handleDeleteButtonClick() {
    await onTaskDeleteButtonClicked(task._id);
  }

  return (
    <li className="task-list-item">
      <input
        type="checkbox"
        checked={checkboxState}
        onChange={handleCheckboxChange}
      />
      <span className={task.isCompleted ? 'completed-task' : ''}>
        {task.text}
      </span>
      <button className="delete-task-button" onClick={handleDeleteButtonClick}>
        🗑
      </button>
    </li>
  );
};
