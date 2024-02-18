import { Meteor } from 'meteor/meteor';
// @ts-ignore
import { Accounts } from 'meteor/accounts-base';
import { initializeAppointmentPublications } from '/imports/api/appointmentPublications';
import { initializeAppointmentMethods } from '/imports/api/appointmentMethods';

Meteor.startup(async () => {
  initializeAppointmentPublications();
  initializeAppointmentMethods();
});

if (process.env['LIMETTE_ENVIRONMENT'] === 'dev') {
  require('./devUtils');
}
