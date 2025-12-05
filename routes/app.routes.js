const multer = require('multer')
const XLSX = require('xlsx')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs')
const csv = require('csv-parser')



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
      return res.status(400).send('No file uploaded.')
    }

    const file = req.file
    const isCSV = file.originalname.toLowerCase().endsWith('.csv')
    const excelExtensions = ['.xls', '.xlsx']
    const isExcel = excelExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext))

    if (isExcel) {
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
        res.status(500).send('Error reading file Excel.')
      } finally {
        fs.unlinkSync(req.file.path)
      }
    }

    if (isCSV) {
      const filePath = file.path // percorso reale del file salvato da multer
      let transactions = []
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          if (row['Filled Type'] === 'Trade') {
            const tempArr = row['Transaction Time(UTC+0)'].split(' ')
            const date = `${tempArr[1]} ${tempArr[0]}`
            const baseAsset = row['Market'].replace('USDT', '')
            const pair = baseAsset + '/' + 'USDT'
            const type = row['Direction'] === 'Short' ? 'SELL' : 'BUY'
            const transaction = {
              ts: new Date(date).getTime(),
              date: date,
              orderNo: row['Order No.'],
              pair: pair,
              baseAsset: baseAsset,
              quoteAsset: 'USDT',
              type: type,
              orderPrice: +row['Filled Price'],
              orderAmount: +row['Filled Quantity'],
              filled: +row['Filled Quantity'],
              total: +(row['Filled Price'] * row['Filled Quantity']).toFixed(3),
              status: 'Filled'
            }
            transactions.push(transaction)


            const map = new Map()
            for (const t of transactions) {
              if (!map.has(t.orderNo)) {
                map.set(t.orderNo, { ...t }) // clona l’oggetto
              } else {
                const existing = map.get(t.orderNo)
                existing.orderAmount = +(existing.orderAmount + t.orderAmount).toFixed(3) // somma i valori
                existing.filled = +(existing.filled + t.filled).toFixed(3) 
                existing.total = +(existing.total + t.total).toFixed(3) 
              }
            }
            transactions = Array.from(map.values())

            transactions.sort((a, b) => parseFloat(a.ts) - parseFloat(b.ts))

          }
        })
        .on('end', () => {

          // elimina il file temporaneo
          fs.unlinkSync(filePath)

          // restituisce i dati alla view
          res.render('transactions/transactions', { id: 'transactions', title, url: req.url, breadcrumbs, nonce, transactions })
        })
        .on('error', (err) => {
          console.error('Error reading file:', err)
          res.status(500).send('Error reading file CSV')
        })
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
