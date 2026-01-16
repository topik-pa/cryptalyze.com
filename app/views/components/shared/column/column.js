import {
  createComponent
} from '../../../../scripts/globals.js'


const manageCollapsableMenu = () => {
  const colcollapse = document.getElementById('colcollapse')
  if (!colcollapse) return
  const column = document.querySelector('.layout > aside')
  colcollapse.addEventListener('click', () => {
    column.classList.toggle('collapsed')
  })
}

const updateStatistics = () => {
  const storedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || []
  const $totalFiles = document.getElementById('total-files')
  const $totalTransactions = document.getElementById('total-transactions')
      
  $totalFiles.innerText = storedTransactions.length
  $totalTransactions.innerText = storedTransactions.reduce(
    (acc, file) => acc + (file.data ? file.data.length : 0), 0
  )
}

const manageUploadedFilesList = () => {
  const storedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || []
  const $loadedFiles = document.getElementById('loaded-files')

  $loadedFiles.innerHTML = ''

  for(const file of storedTransactions) {
    const date = new Date(file.date)
    const dateOptions = {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }
    const formattedDate = date.toLocaleString('en-GB', dateOptions)
    const bullet = createComponent('cmp-bullet', {
      status: 'active',
      id: file.id
    }, [
      createComponent('span', { slot: 'type' }, [file.format]),
      createComponent('span', { slot: 'name' }, [file.origin]),
      createComponent('span', { slot: 'value' }, [file.exchange]),
      createComponent('span', { slot: 'lastmod' }, [formattedDate]),
      createComponent('span', { slot: 'footer' }, [])
    ])
    $loadedFiles.appendChild(bullet)
  }
}
    
const column = {
  init: () => {
    manageCollapsableMenu()
    updateStatistics()
    manageUploadedFilesList()

    window.addEventListener('transactionsUpdated', () => {
      updateStatistics()
      manageUploadedFilesList()
    })
  }
}

export default column
