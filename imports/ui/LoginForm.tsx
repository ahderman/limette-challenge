import React, { FormEvent } from 'react';
// @ts-ignore
import { Meteor } from 'meteor/meteor';

export const LoginForm = () => {
  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    Meteor.loginWithPassword(
      formData.get('username') as string,
      formData.get('password') as string
    );
  }

  return (
    <form onSubmit={handleFormSubmit} data-cy="login-form">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />
      <button type="submit">Log in</button>
    </form>
  );
};
