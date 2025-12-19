import express from 'express'
import multer from 'multer'
import getTransactions from './get-transactions.js'

const upload = multer({ dest: 'uploads/' })
const router = express.Router()


// Transactions
router.post(
  '/transactions-upload', 
  upload.single('file'),
  async(req, res) => {
    if (!req.file) {
      return res.status(400).send({ error: 'No file uploaded' })
    }
    const transactions = await getTransactions(req.file)
    if (transactions.error) {
      return res.status(500).send({ error: transactions.error })
    }
    
    // Store transactions data in session and redirect
    //req.locals.transactions = transactions.data
    //res.redirect('/transactions')
  })


export default router
