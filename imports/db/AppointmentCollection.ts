import { Mongo } from 'meteor/mongo';

export interface Appointment {
  _id: string;
  ownerId: string;
  patientFirstName: string;
  patientLastName: string;
  date: Date;
}

export const AppointmentCollection = new Mongo.Collection<Appointment>(
  'appointments'
);
