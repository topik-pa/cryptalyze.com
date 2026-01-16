import XLSX from 'xlsx'
import fs from 'fs'
import csv from 'csv-parser'
import crypto from 'crypto'

export default function getTransactions(file) {

  const excelExtensions = ['.xls', '.xlsx']
  const isCSV = file.originalname.toLowerCase().endsWith('.csv')
  const isExcel = excelExtensions.some(ext => file.originalname.toLowerCase().endsWith(ext))
  if (isExcel) {
    const workbook = XLSX.readFile(file.path)
    const sheetName = workbook.SheetNames[0]
    const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
      defval: ''
    })
    if (sheet.length === 0) {
      return { error: 'Uploaded Excel file is empty' }
    }
    if (
      sheet[0]['Date(UTC)'] && 
      sheet[0]['Order No.'] && 
      sheet[0]['AvgTrading Price'] 
    ){
      //Binance format
      const transactions = sheet.filter(row => {return row['Status'] === 'Filled'}).map(row => (
        {
          ts: new Date(row['Date(UTC)']).getTime(),
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
      return { 
        id: crypto.randomBytes(16).toString('base64'),
        date: new Date().getTime(),
        format: 'excel',
        exchange: 'binance',
        origin: file.originalname.toLowerCase(),
        data: transactions 
      }
    }
  }

  if (isCSV) {
    const filePath = file.path
    let transactions = []
    let csvFormat
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (row) => {
          if(
            row['Filled Type'] && 
            row['ExecFeeV2'] && 
            row['Trading Fee']
          ) {
            //Bybit format
            csvFormat = 'Bybit'
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
            }
          }
        })
        .on('end', () => {
          fs.unlinkSync(filePath)
          if (csvFormat === 'Bybit') {
            const map = new Map()
            for (const t of transactions) {
              if (!map.has(t.orderNo)) {
                map.set(t.orderNo, { ...t })
              } else {
                const existing = map.get(t.orderNo)
                existing.orderAmount = +(existing.orderAmount + t.orderAmount).toFixed(3)
                existing.filled = +(existing.filled + t.filled).toFixed(3) 
                existing.total = +(existing.total + t.total).toFixed(3) 
              }
            }
            transactions = Array.from(map.values())
            transactions.sort((a, b) => parseFloat(a.ts) - parseFloat(b.ts))
          }
          resolve({ 
            id: crypto.randomBytes(16).toString('base64'),
            date: new Date().getTime(),
            format: 'csv',
            exchange: 'bybit',
            origin: file.originalname.toLowerCase(),
            data: transactions 
          })
        })
        .on('error', (err) => {
          reject({ error: 'Error reading CSV file:', err })
        })
    })
  }

}