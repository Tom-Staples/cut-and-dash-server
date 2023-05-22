import * as mongoose from 'mongoose';

const reqString = {
  type: String,
  required: true,
};

export const userSchema = new mongoose.Schema({
  firstName: reqString,
  lastName: reqString,
  email: reqString,
  password: reqString,
});

export interface User extends mongoose.Document {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
