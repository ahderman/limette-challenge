import { Mongo } from 'meteor/mongo';

export interface Task {
  _id: string;
  text: string;
  createdAt: Date;
  isCompleted: boolean;
}

// Maybe not useful
export type NewTask = Omit<Task, '_id' | 'createdAt'> & {
  _id?: string;
  createdAt?: Date;
};

export const TasksCollection = new Mongo.Collection<Task>('tasks');
