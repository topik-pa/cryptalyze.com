/**
 * Mongoose schema for User model.
 * @typedef {Object} UserSchema
 * @property {Number} userId - Unique identifier for the user (required)
 * @property {String} name - Name of the user (required)
 * @property {Number} age - Age of the user (optional)
 * @property {Date} createdAt - Timestamp when the user was created (auto-generated)
 * @property {Date} updatedAt - Timestamp when the user was last updated (auto-generated)
 */

/**
 * User model for MongoDB database.
 * @type {mongoose.Model<UserSchema>}
 * @exports User
 */

import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
  userId:
      {
        type: Number,
        required: [true, 'User id is required'],
        unique: true
      },
  name:
      {
        type: String,
        required: [true, 'User name is required'],
        unique: false
      },
  age:
      {
        type: Number,
        unique: false
      }
}, { timestamps: true } )

export const User = mongoose.model('User', userSchema)
