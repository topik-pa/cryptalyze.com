/**
 * Logger configuration module using Pino.
 * 
 * Creates a logger instance with different configurations based on the environment:
 * - Development: Uses pino-pretty transport with colorized output and human-readable timestamps
 * - Production: Uses standard pino output with configurable log level
 * 
 * @module logger
 * @requires pino
 * 
 * @type {import('pino').Logger}
 * 
 * @example
 * import logger from './configs/logger.js'
 * 
 * logger.info('App started')
 * logger.warn('Warning message')
 * logger.error(new Error('Something went wrong'))
 * logger.debug({ object: 'debug info' }, 'Debug details')
 */

import pino from 'pino'

const nodeEnv = process.env.NODE_ENV || 'development'

const logger = nodeEnv === 'development'
  ? pino({
    level: process.env.LOG_LEVEL || 'debug',
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard', // readable timestamp
        ignore: 'pid,hostname'         // removes unnecessary info in development
      }
    }
  })
  : pino({
    level: process.env.LOG_LEVEL || 'info'
  })

export default logger
