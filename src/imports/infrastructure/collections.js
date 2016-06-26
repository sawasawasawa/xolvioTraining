import { Mongo } from 'meteor/mongo';

export const Students = new Mongo.Collection('students');
export const Appointments = new Mongo.Collection('appointments');
export const Teachers = new Mongo.Collection('teachers');