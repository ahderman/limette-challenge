import { Mongo } from 'meteor/mongo';

export interface Appointment {
  _id: string;
  ownerId: string;
  patientFirstName: string;
  patientLastName: string;
  date: Date;
}

export type AppointmentData = Omit<Appointment, '_id' | 'ownerId'> & {
  _id?: string;
  ownerId?: string;
};

export const AppointmentCollection = new Mongo.Collection<Appointment>(
  'appointments'
);
