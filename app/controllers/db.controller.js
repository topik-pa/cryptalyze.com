/**
 * Retrieves all users from the database.
 * @async
 * @function getAllUsers
 * @returns {Promise<Array>} A promise that resolves to an array of user documents
 * @throws {Error} Throws an error if the database query fails
 */

/**
 * Creates a new user in the database.
 * @async
 * @function createUser
 * @param {Object} data - The user data to be saved
 * @returns {Promise<Object>} A promise that resolves to the saved user document
 * @throws {Error} Throws an error if the user creation fails
 */

/**
 * Reads a single user from the database by userId.
 * @async
 * @function readUser
 * @param {string} userId - The unique identifier of the user to retrieve
 * @returns {Promise<Object|null>} A promise that resolves to the user document or null if not found
 * @throws {Error} Throws an error if the database query fails
 */

/**
 * Updates an existing user or creates a new one if it doesn't exist.
 * @async
 * @function upsertUser
 * @param {Object} data - The user data to update or insert
 * @param {string} data.userId - The unique identifier of the user
 * @returns {Promise<Object>} A promise that resolves to the updated or created user document
 * @throws {Error} Throws an error if the upsert operation fails
 */

/**
 * Deletes a user from the database by userId.
 * @async
 * @function deleteUser
 * @param {string} userId - The unique identifier of the user to delete
 * @returns {Promise<Object>} A promise that resolves to the deletion result object
 * @throws {Error} Throws an error if the deletion operation fails
 */

import { User } from '../models/User.js'
import logger from '../configs/logger.js'

export async function getAllUsers() {
  try {
    const users = await User.find()
    return users
  } catch (err) {
    logger.error(new Error(`❌ Error getting users\n${err}`))
    throw err
  }
}

export async function createUser(data) {
  try {
    const user = new User(data)
    const savedUser = await user.save()
    return savedUser
  } catch (err) {
    logger.error(new Error(`❌ Error saving user\n${err}`))
    throw err
  }
}

export async function readUser(userId) {
  try {
    const user = await User.findOne({ userId })
    return user
  } catch (err) {
    logger.error(new Error(`❌ Error reading user ${userId}\n${err}`))
    throw err
  }
}

export async function upsertUser(data) {
  try {
    const filter = { userId: data.userId }
    const update = { ...data }
    const options = {
      new: true,       // returns the updated document
      upsert: true,    // create if does not exist
      runValidators: true // applies schema validations
    }
    const user = await User.findOneAndUpdate(filter, update, options)
    logger.info(`✅ User updated: ${data.userId}`)
    return user
  } catch (err) {
    logger.error(new Error(`❌ Error upserting user ${data.userId}\n${err}`))
    throw err
  }
}

export async function deleteUser(userId) {
  try {
    const result = await User.deleteOne({ userId })
    if (result.deletedCount === 0) {
      logger.warn(`⚠️ User not found for deletion: ${userId}`)
    } else {
      logger.info(`✅ User deleted: ${userId}`)
    }
    return result
  } catch (err) {
    logger.error(new Error(`❌ Error deleting user ${userId}\n${err}`))
    throw err
  }
}