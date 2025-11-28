const express = require('express')
const app = express()
const { I18n } = require('i18n')
const path = require('path')
const compression = require('compression')
require('dotenv').config()
const crypto = require('crypto')
const PORT = process.env.PORT || 3000

// HTTPS redirect server-side
/* app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect('https://' + req.headers.host + req.url)
    } else { return next() }
  } else { return next() }
}) */

// Compress responses if browser is capable
app.use(compression({ filter: shouldCompress }))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

// Add nonce attribute
const nonce = crypto.randomUUID()
// Set custom headers
app.use(function (req, res, next) {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  res.setHeader('Upgrade-insecure-requests', '1')
  // eslint-disable-next-line max-len
  // res.setHeader('Content-Security-Policy', `default-src 'none'; script-src https://connect.facebook.net/ https://www.statcounter.com/ https://platform.linkedin.com/ https://www.linkedin.com/ https://cpwebassets.codepen.io/ 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline'; img-src 'self' https://www.paypalobjects.com/ https://www.paypal.com/ https://c.statcounter.com/ data:; object-src 'none'; frame-src https://c.statcounter.com/ https://www.facebook.com/ https://web.facebook.com/ https://www.linkedin.com/ https://codepen.io/ 'self'; form-action https://www.paypal.com/ 'self'; font-src 'self'; media-src 'self'; connect-src https://c.statcounter.com/ 'self'; frame-ancestors 'none'; base-uri 'none'`)
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'deny')
  next()
})

app.set('views', './views')
app.set('view engine', 'pug')

if (process.env.NODE_ENV === 'development') {
  app.use('/components', express.static(path.join(__dirname, 'components')))
  app.use('/scripts', express.static(path.join(__dirname, 'scripts')))
  app.use('/styles', express.static(path.join(__dirname, 'styles')))
  app.use('/views', express.static(path.join(__dirname, 'views')))
}
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use('/assets', express.static(path.join(__dirname, 'assets')))
app.use('/dist', express.static(path.join(__dirname, 'dist')))

const i18n = new I18n({
  locales: ['en', 'it'],
  defaultLocale: 'en',
  objectNotation: true,
  directory: path.join(__dirname, 'locales')
})
app.use((req, res, next) => {
  i18n.init(req, res)
  next()
})

// Use absolute path in pug imports
app.locals.basedir = path.join(__dirname, '/')

// ROUTES
require('./routes/api.routes')(app)
require('./routes/app.routes')(app, nonce)
// Handle 404
app.use(function (req, res) {
  res.status(400)
  res.render('404/404', { id: 'err404', title: 'Error 404' })
})
// Handle 500
// eslint-disable-next-line no-unused-vars
app.use(function (error, req, res, next) {
  console.log(error.stack)
  res.status(500)
  res.render('500/500', { id: 'err500', title: 'Error 500' })
})

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`)
})
