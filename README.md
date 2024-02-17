# LiMetTe Challenge - Liris Meteor Technical Challenge

Code for a web app for appointment scheduling, created for a hiring assignment for [Liris](https://liris.ch/).

## How to run the application

This command runs the application and makes it available at http://localhost:3000:

`npm start`

This command runs the e2e tests with Cypress (work in progress):

`npm run e2e`

Note: To make the Cypress tests work, I followed (roughly) the steps indicated in the following article:
https://blog.meteor.com/testing-a-meteor-app-with-cypress-bfb3d3c6ed6f#744c

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

- Document important scripts
- Get rid of NewTask type if not needed
- Name event handlers better
- Add tests
- Dockerize the application (split Mongo into its own process?)
- Deploy the application
- Internationalisation
- Move CSS next to component
- Promote CSS to Sass
- Add error handling on read/writes to the DB
- Add input validation
- Add data validation to all data that gets saved in the DB
- Use React router
- Add pagination to list of appointments
- Do not show appointments in the past unless the user wants to

## Open questions

- Why are so many functions not async? e.g. `Meteor.user()`, `Accounts.findUserByUsername()`
