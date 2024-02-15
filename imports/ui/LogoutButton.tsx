import React from 'react';
import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { useTracker } from 'meteor/react-meteor-data';
import * as auth from '/imports/api/auth';

export const LogoutButton = () => {
  const isLoggedIn = useTracker(auth.isUserLoggedIn);

  function handleClick() {
    Meteor.logout();
  }

  if (!isLoggedIn) {
    return null;
  }
  return <button onClick={handleClick}>Log out</button>;
};
