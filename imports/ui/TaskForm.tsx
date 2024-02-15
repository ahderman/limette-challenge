import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Meteor } from 'meteor/meteor';

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

    await Meteor.call('tasks.insert', inputText.trim());

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
