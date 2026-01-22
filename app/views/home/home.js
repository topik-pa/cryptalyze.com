/**
 * Home view module that initializes and manages the home page.
 * @namespace
 * @property {Function} init - Asynchronously initializes the home view by importing and applying CSS modules.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 * @throws {Error} Silently catches and ignores errors when adoptedStyleSheets is not supported by the browser.
 */

function countUniqueCryptos(transactions) {
  const uniqueCryptos = new Set()

  transactions.forEach(file => {
    file.data.forEach(transaction => {
      // Further processing can be done here if needed
      if (transaction.baseAsset) {
        uniqueCryptos.add(transaction.baseAsset)
      }
      if (transaction.quoteAsset) {
        uniqueCryptos.add(transaction.quoteAsset)
      }
    })
  })
  return {
    count: uniqueCryptos.size,
    cryptos: Array.from(uniqueCryptos).sort()
  }
}

const updateStatistics = () => {
  const storedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || []
  const $totalFiles = document.getElementById('files')
  const $totalTransactions = document.getElementById('transactions')
  const $totalCryptos = document.getElementById('cryptos')
  const $listCryptos = document.getElementById('list')

  if(storedTransactions.length === 0) {
    $totalFiles.innerText = 0
    $totalTransactions.innerText = 0
    $totalCryptos.innerText = 0
    $listCryptos.innerText = '-'
    return
  }

  const stats = countUniqueCryptos(storedTransactions)

  $totalFiles.innerText = storedTransactions.length
  $totalTransactions.innerText = storedTransactions.reduce(
    (acc, file) => acc + (file.data ? file.data.length : 0), 0
  )  
  $totalCryptos.innerText = stats.count
  $listCryptos.innerText = stats.cryptos.join(', ')
}

export default  {
  init: async() => {
    const cssModule = await import('./home.css', {
      with: { type: 'css' }
    })
    try {
      document.adoptedStyleSheets = [cssModule.default]
    // Setting adoptedStyleSheets may fail in unsupported browsers; log the error for debugging.
    } catch (err) { 
      // console.error('Error adopting style sheets:', err)
    }

    updateStatistics()
    window.addEventListener('transactionsUpdated', () => {
      updateStatistics()
    })

  }
}
