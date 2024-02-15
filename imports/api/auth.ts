import { Meteor } from 'meteor/meteor';

export function isUserLoggedIn(): boolean {
  return Meteor.user() !== null;
}

export function getCurrentUser(): Meteor.User | null {
  return Meteor.user();
}

export function getCurrentUserId(): string | null {
  const user = Meteor.user();
  return user && user._id;
}
