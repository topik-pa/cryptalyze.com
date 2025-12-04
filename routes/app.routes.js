const multer = require('multer')
const XLSX = require('xlsx')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')



module.exports = (app, nonce) => {
  app.get('/', (req, res) => {
    const title = 'Home'
    res.render('home', { id: 'home', className: 'home', title, url: req.url, nonce })
  })

  // Gestisce l'upload del file Excel
  app.post('/transactions', upload.single('file'), (req, res) => {
    const title = 'Transactions'
    const breadcrumbs = [
      {
        name: title
      }
    ]
    if (!req.file) {
      return res.status(400).send('Nessun file caricato.')
    }
    try {
      // Legge il file Excel
      const workbook = XLSX.readFile(req.file.path)
      const sheetName = workbook.SheetNames[0]
      const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
        defval: ''
      })
      // sheet sarà un array di oggetti, uno per ogni riga
      const transactions = sheet.filter(row => {return row['Status'] === 'Filled'}).map(row => (
        {
          date: row['Date(UTC)'],
          orderNo: row['Order No.'],
          pair: row['Pair'],
          baseAsset: row['Base Asset'],
          quoteAsset: row['Quote Asset'],
          type: row['Type'],
          orderPrice: row['Order Price'],
          orderAmount: row['Order Amount'],
          filled: row['Filled'],
          total: row['Total'],
          status: row['Status']
        }
      ))
      res.render('transactions/transactions', { id: 'transactions', title, url: req.url, breadcrumbs, nonce, transactions })
    } catch (error) {
      console.error(error)
      res.status(500).send('Errore durante la lettura del file Excel.')
    } finally {
      fs.unlinkSync(req.file.path)
    }
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
