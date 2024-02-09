# LiMetTe Challenge - Liris Meteor Technical Challenge

Code for a web app for appointment scheduling, created for a hiring assignment for [Liris](https://liris.ch/).

## Problems encountered while developing this app

On page [1: Creating the app](https://react-tutorial.meteor.com/simple-todos/01-creating-app):

- The Mobile view was actually find with Firefox

On page [2: Collections](https://react-tutorial.meteor.com/simple-todos/02-collections):

- Running `meteor mongo` does not work and complains about [mongosh](https://www.mongodb.com/docs/mongodb-shell/)
  not being installed.
- The link to the docs for React Hooks points to a legacy page: [Hooks FAQ](https://legacy.reactjs.org/docs/hooks-faq.html)

## To read

- https://react-typescript-cheatsheet.netlify.app/docs/basic/setup

## Learned

- The `insecure` package allows anyone to write to the database
- the `autopublish` package automatically publishes the contents of the DB to the clients.  
  The clients can pick up the contents with the `useTracker` hook.

## Future improvements

- Remove `console.log()` statements
- Remove insecure and autopublish packages
- Get rid of NewTask type if not needed
- Name event handlers better
- Add tests
- Internationalisation
- Move CSS next to component
- Promote CSS to Sass
- Add error handling on read/writes to the DB
- Add input validation
