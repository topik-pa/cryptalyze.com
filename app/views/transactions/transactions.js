const addNewTransactionsToSessionStorage = () => {
  let newTransactions = null
  if (document.getElementById('transactions-data')) {
    newTransactions = JSON.parse(document.getElementById('transactions-data').dataset.transactions)
  }
  const storedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || []
  if(newTransactions) {
    storedTransactions.push(newTransactions)
    sessionStorage.setItem('transactions', JSON.stringify(storedTransactions))
    const event = new Event('transactionsUpdated')
    window.dispatchEvent(event)
  }
}

const buildTransactionsTable = () => {
  const storedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || []
  let tableHTML = `
      <table id="table" class="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Exchange</th>
            <th>Pair</th>
            <th>Type</th>
            <th>Order Price</th>
            <th>Order Amount</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
    `
  for(const batch of storedTransactions) {
    for(const t of batch.data) {
      const date = new Date(t.ts)
      const formattedDate = date.toLocaleString('en-GB', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      })
      tableHTML += `
          <tr>
            <td>${formattedDate}</td>
            <td>${batch.exchange}</td>
            <td>${t.pair}</td>
            <td>${t.type}</td>
            <td>${t.orderPrice}</td>
            <td>${t.orderAmount}</td>
            <td>${t.total}</td>
            <td>${t.status}</td>
          </tr>
        `
    }
  }
  tableHTML += `
        </tbody>
      </table>
    `
  document.getElementById('transactions-table-container').innerHTML = tableHTML 
     
  // eslint-disable-next-line no-undef
  new DataTable('#table')
}

export default  {
  init: async() => {
    const cssModule = await import('./transactions.css', {
      with: { type: 'css' }
    })
    try {
      document.adoptedStyleSheets = [cssModule.default]
    // Setting adoptedStyleSheets may fail in unsupported browsers; log the error for debugging.
    } catch (err) { 
      // console.error('Error adopting style sheets:', err)
    }

    addNewTransactionsToSessionStorage()
    buildTransactionsTable()
    window.addEventListener('transactionsUpdated', () => {
      buildTransactionsTable()
    })
    
  }
}
