/**
 * Application status constants.
 * Defines the possible states for asynchronous operations throughout the application.
 * @constant {Object} STATUS
 * @property {string} idle - Initial state before any operation starts
 * @property {string} loading - State during an ongoing operation
 * @property {string} success - State when operation completed successfully
 * @property {string} error - State when operation failed with an error
 */

const STATUS = {
  idle: 'idle',
  loading: 'loading',
  success: 'success',
  error: 'error'
}

export function updateStatus(targets, status) {
  if (!(status in STATUS)) {
    throw new Error(`Invalid status: ${status}`)
  }
  targets.forEach((target) => {
    target.classList.remove(...Object.values(STATUS))
    target.classList.add(STATUS[status])
  })
}
