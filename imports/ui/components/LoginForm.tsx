import React, { FormEvent, useState } from 'react';
// @ts-ignore
import { Meteor } from 'meteor/meteor';

export const LoginForm = () => {
  const [loginError, setLoginError] = useState<string | null>(null);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    Meteor.loginWithPassword(
      formData.get('username') as string,
      formData.get('password') as string,
      // We should probably promisify this function to avoid mixing callbacks with promises
      (err) => {
        if (err !== null) {
          setLoginError(`Failed to log in: ${(err as Meteor.Error).reason}`);
          return;
        }
        setLoginError(null);
      }
    );
  }

  return (
    <form onSubmit={handleFormSubmit} data-cy="login-form">
      {loginError && (
        <div data-cy="login-error-message">
          <p>{loginError}</p>
        </div>
      )}
      <label htmlFor="username">Username</label>
      <input type="text" name="username" required />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" required />
      <button type="submit">Log in</button>
    </form>
  );
};
