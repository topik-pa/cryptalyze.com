

export default  {
  init: async() => {
    const cssModule = await import('./analysis.css', {
      with: { type: 'css' }
    })
    try {
      document.adoptedStyleSheets = [cssModule.default]
    // Setting adoptedStyleSheets may fail in unsupported browsers; log the error for debugging.
    } catch (err) { 
      // console.error('Error adopting style sheets:', err)
    }

    const buildGitGraphs = (() => {
      const storedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || []

      // Get the graph container HTML element.
      const graphContainer = document.getElementById('graphs-wrapper')
      graphContainer.innerHTML = ''

      storedTransactions.forEach(file => {
        // Instantiate the graph
        const gitgraph = GitgraphJS.createGitgraph(graphContainer, { orientation: 'vertical-reverse' })
        const map = new Map()
        const master = gitgraph.branch('Wallet ' + file.exchange)
        master.commit(
          {
            subject: 'Start transactions'
          })

        file.data.forEach((transaction, i) => {

          if (map.has(transaction.baseAsset)) {
            //chiude operazione
            const branch = map.get(transaction.baseAsset)
            branch.commit(
              {
                tag: transaction.date || 'placeholder',
                subject: `${transaction.type} ${transaction.baseAsset} Q.ty ${transaction.filled}`,
                body: `Price: ${transaction.orderPrice}`
              })
          } else {
            //apre nuova operazione
            const branch = master.branch(transaction.baseAsset)
            branch.commit(
              {
                tag: transaction.date || 'placeholder',
                subject: `${transaction.type} ${transaction.baseAsset} Q.ty ${transaction.filled}`,
                body: `Price: ${transaction.orderPrice}`
              })

            map.set(transaction.baseAsset, branch)
          }

        })
      })
    })

    buildGitGraphs()
    window.addEventListener('transactionsUpdated', () => {
      buildGitGraphs()
    })

    

    


    
    


    

    
    




        
    

  }
}
