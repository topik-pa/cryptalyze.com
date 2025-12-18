/**
 * @fileoverview API controller for user management operations.
 * Provides CRUD endpoints for user resources.
 */

/**
 * Retrieves all users from the database.
 * @async
 * @function getUsers
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with array of users
 */

/**
 * Retrieves a single user by their ID.
 * @async
 * @function getUser
 * @param {Object} req - Express request object
 * @param {string} req.params.id - User ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with user object or 404 error
 */

/**
 * Retrieves a single user by their username.
 * @async
 * @function getUserByUsername
 * @param {Object} req - Express request object
 * @param {string} req.params.username - Username to search for
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with user object or 404 error
 */

/**
 * Creates a new user in the database.
 * @async
 * @function createUser
 * @param {Object} req - Express request object
 * @param {Object} req.body - User data for creation
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with created user object and 201 status
 */

/**
 * Updates an existing user by their ID.
 * @async
 * @function updateUser
 * @param {Object} req - Express request object
 * @param {string} req.params.id - User ID
 * @param {Object} req.body - Updated user data
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with updated user object or 404 error
 */

/**
 * Deletes a user by their ID.
 * @async
 * @function deleteUser
 * @param {Object} req - Express request object
 * @param {string} req.params.id - User ID
 * @param {Object} res - Express response object
 * @returns {Promise<void>} JSON response with success message or 404 error
 */

import { User } from '../models/User.js'

// GET all users
export const getUsers = async(req, res) => {
  const users = await User.find()
  res.json(users)
}

// GET user by ID
export const getUser = async(req, res) => {
  const stock = await User.findById(req.params.id)
  if (!stock) return res.status(404).json({ message: 'Not found' })
  res.json(stock)
}

// GET user by username
export const getUserByUsername = async(req, res) => {
  const stock = await User.findOne({ name: req.params.username })
  if (!stock) return res.status(404).json({ message: 'Not found' })
  res.json(stock)
}

// POST create a new user
export const createUser = async(req, res) => {
  const newUser = new User(req.body)
  await newUser.save()
  res.status(201).json(newUser)
}

// PUT update user by ID
export const updateUser = async(req, res) => {
  const stock = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
  if (!stock) return res.status(404).json({ message: 'Not found' })
  res.json(stock)
}

// DELETE user by ID
export const deleteUser = async(req, res) => {
  const result = await User.findByIdAndDelete(req.params.id)
  if (!result) return res.status(404).json({ message: 'Not found' })
  res.json({ message: 'Deleted' })
}
