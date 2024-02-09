import React, { ChangeEvent, FormEvent, useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';

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
      <button>Create task</button>
    </form>
  );
};
