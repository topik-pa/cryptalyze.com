module.exports = app => {
  const api = require('../controllers/api.controller.js')
  const router = require('express').Router()

  // GET
  router.get('/test', api.test)

  app.use('/api', router)
}
