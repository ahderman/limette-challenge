# LiMetTe Challenge - Liris Meteor Technical Challenge

Code for a web app for appointment scheduling, created for a hiring assignment for [Liris](https://liris.ch/).

## How to run the application

First, install all the necessary packages:

`meteor npm install`

Then run the application, which makes it available at http://localhost:3000:

`npm start`

Then, log in as user "test1" or "test2". The password is "pw" for both users.

## How to run the tests

Run the e2e tests with Cypress:

`npm run e2e`

Note: To make the Cypress tests work, I followed (roughly) the steps indicated in the following article:
https://blog.meteor.com/testing-a-meteor-app-with-cypress-bfb3d3c6ed6f#744c

## Decisions made while developing the application

- Focus on making tests work
- Filter implemented with a regexp. Not a good choice.
- For such a simple application (login + one page) I did not use React Router, but if this were a real
  application I would definitely add React Router from the start.
- I did not add global event/state management either (like Redux, for example). As a result I have to pass
  the appointment selection event all the way from the AppointmentListItem component up to the AppointmentsPage,
  and then down to the AppointmentEditor component.  
  In a real application, I would definitely introduce an extra dependency to simplify that pattern.

## Problems/surprises encountered while developing this app

On page [1: Creating the app](https://react-tutorial.meteor.com/simple-todos/01-creating-app):

- The Mobile view was actually fine with Firefox

On page [2: Collections](https://react-tutorial.meteor.com/simple-todos/02-collections):

- Running `meteor mongo` does not work and complains about [mongosh](https://www.mongodb.com/docs/mongodb-shell/)
  not being installed.
- The link to the docs for React Hooks points to a legacy page: [Hooks FAQ](https://legacy.reactjs.org/docs/hooks-faq.html)
- Typings don't work for packages such as `meteor/accounts-base` and `meteor/react-meteor-data`.

On page [7: Adding User Accounts](https://react-tutorial.meteor.com/simple-todos/07-adding-user-accounts):

- `db.tasks.remove({})` is deprecated in MongoDB. We should now use `db.tasks.deleteMany({})`.

On page [12: Testing](https://react-tutorial.meteor.com/simple-todos/12-testing):

- The database that gets used in tests seems to be the same as the one used in normal development
- Calling any Chai function throws an error in the console when running the tests.

On page [Testing, How to test your Meteor application](https://guide.meteor.com/testing.html):

- It says any file with a name that matches `*.test[s].*`, or `*.spec[s].*` will be loaded automatically, but that
  was not the case unless I removed the property `meteor.testModule` from the package.json.

## To read

- https://react-typescript-cheatsheet.netlify.app/docs/basic/setup
- https://legacy.reactjs.org/docs/hooks-faq.html

## Learned

- The `insecure` package allows anyone to write to the database
- the `autopublish` package automatically publishes the contents of the DB to the clients.  
  The clients can pick up the contents with the `useTracker` hook.

## Future improvements

- Refactor the AppointmentEditor and AppointmentCreator to use shared internals
- Add global state/action management (Redux or similar)
- Add page routing
- Add more tests
- Dockerize the application (split Mongo into its own process?)
- Deploy the application
- Internationalisation
- Move CSS closer to component
- Promote CSS to Sass
- Add input validation
- Improve data validation to all data that gets saved in the DB
- Add pagination to list of appointments
- Do not show appointments in the past unless the user wants to
- Throttle the onChange event on the filter, or add a Search button

## Open questions

- Why are so many functions not async? e.g. `Meteor.user()`, `Accounts.findUserByUsername()`
