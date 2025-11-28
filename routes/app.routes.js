module.exports = (app, nonce) => {
  app.get('/', (req, res) => {
    const title = 'Home'
    res.render('home', { id: 'home', className: 'home', title, url: req.url, nonce })
  })
  app.get('/users', (req, res) => {
    const title = 'Users'
    const breadcrumbs = [
      {
        name: title
      }
    ]
    res.render('users/users', { id: 'users', title, url: req.url, breadcrumbs, nonce })
  })
  app.get('/form', (req, res) => {
    const title = 'Form'
    const breadcrumbs = [
      {
        name: title
      }
    ]
    res.render('form/form', { id: 'form', title, url: req.url, breadcrumbs, nonce })
  })
  app.get('/plp', (req, res) => {
    const title = 'PLP'
    const breadcrumbs = [
      {
        name: title
      }
    ]
    res.render('plp/plp', { id: 'plp', title, url: req.url, breadcrumbs, nonce })
  })
  app.get('/contacts', (req, res) => {
    const title = 'Contacts'
    const breadcrumbs = [
      {
        name: title
      }
    ]
    res.render('contacts/contacts', { id: 'contacts', title, url: req.url, breadcrumbs, nonce })
  })
  app.get('/privacy', (req, res) => {
    const title = 'Privacy'
    const breadcrumbs = [
      {
        name: title
      }
    ]
    res.render('privacy/privacy', { id: 'privacy', title, url: req.url, breadcrumbs, nonce })
  })
  // Sitemap.xml
  app.get('/sitemap.xml', function (req, res) {
    res.sendFile('public/sitemap.xml', { root: '.' })
  })
  // Robots.txt
  app.get('/robots.txt', function (req, res) {
    res.sendFile('public/robots.txt', { root: '.' })
  })
}
