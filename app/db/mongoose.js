/**
 * Connects to MongoDB using mongoose.
 * 
 * @async
 * @function connectToDB
 * @throws {Error} If connection to MongoDB fails, logs error and exits process with code 1
 * @returns {Promise<void>} A promise that resolves when connection is established
 * @description Establishes a connection to MongoDB using the URI from environment variable 
 * MONGODB_URI or defaults to 'mongodb://localhost:27017/cryptalize'. Logs success or error messages
 * using the logger utility.
 */

import mongoose from 'mongoose'
import logger from '../configs/logger.js'

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cryptalize'

export async function connectToDB() {
  try {
    await mongoose.connect(mongoUri, {})
    logger.info('✅ Connected to MongoDB')
  } catch (err) {
    logger.error('❌ Error connecting to MongoDB: ', err)
    process.exit(1)
  }
}
