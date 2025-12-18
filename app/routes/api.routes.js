/**
 * Express router for user API endpoints.
 * Provides RESTful API routes for user management including CRUD operations.
 * 
 * @module routes/api.routes
 * @requires express
 * @requires ../controllers/api.controller
 * 
 * Routes:
 * - GET    /users/              - Retrieve all users
 * - GET    /users/:id           - Retrieve a specific user by ID
 * - GET    /users/username/:username - Retrieve a user by username
 * - POST   /users/              - Create a new user
 * - PUT    /users/:id           - Update an existing user by ID
 * - DELETE /users/:id           - Delete a user by ID
 * 
 * @returns {express.Router} Express router instance with configured user routes
 */

import express from 'express'
import {
  getUsers,
  getUser,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/api.controller.js'
const router = express.Router()


// GET all users
router.get('/users/', getUsers)

// GET user by ID
router.get('/users/:id', getUser)

// GET user by username
router.get('/users/username/:username', getUserByUsername)

// POST create a new user
router.post('/users/', createUser)

// PUT update user by ID
router.put('/users/:id', updateUser)

// DELETE user by ID
router.delete('/users/:id', deleteUser)



export default router
