import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';
import * as auth from '/imports/api/auth';

export const TaskForm = () => {
  const [inputText, setInputText] = useState('');

  async function handleFormSubmit(
    e: FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.preventDefault();
    console.log('inputText:', inputText);
    if (inputText.trim().length === 0) {
      return;
    }

    await TasksCollection.insertAsync({
      ownerId: auth.getCurrentUserId()!,
      text: inputText.trim(),
      createdAt: new Date(),
      isCompleted: false,
    });

    setInputText('');
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    setInputText(e.target.value);
  }

  return (
    <form className="task-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="New task text"
        value={inputText}
        onChange={handleInputChange}
      />
      <button type="submit">Create task</button>
    </form>
  );
};
