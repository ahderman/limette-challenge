import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { Accounts } from 'meteor/accounts-base';
import { initializeAppointmentPublications } from '/imports/api/appointmentPublications';

Meteor.startup(async () => {
  initializeAppointmentPublications();
});

if (process.env['LIMETTE_ENVIRONMENT'] === 'dev') {
  require('./devUtils');
}
