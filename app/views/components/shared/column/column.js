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

const manageUploadedFilesList = () => {
  const storedTransactions = JSON.parse(sessionStorage.getItem('transactions')) || []
  const $loadedFiles = document.getElementById('loaded-files')

  if(storedTransactions.length === 0) return

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

const manageDropAreaTransactionUpload = () => {
  const $dropArea = document.getElementById('drop')
  const $fileInput = document.getElementById('transactions-input')
  const $fileName = document.getElementById('file-name')
  const $uploadTransactions = document.getElementById('upload-transactions')

  // Click per aprire file picker
  $dropArea.addEventListener('click', () => $fileInput.click())

  // File selezionato via click
  $fileInput.addEventListener('change', () => {
    updateFileName($fileInput.files[0])
  })

  // Drag over → serve per permettere il drop
  $dropArea.addEventListener('dragover', (e) => {
    e.preventDefault()
    $dropArea.classList.add('dragover')
  })

  // Drag leave → ritorna allo stato normale
  $dropArea.addEventListener('dragleave', () => {
    $dropArea.classList.remove('dragover')
  })

  // Drop del file
  $dropArea.addEventListener('drop', (e) => {
    e.preventDefault()
    $dropArea.classList.remove('dragover')

    const file = e.dataTransfer.files[0]
    $fileInput.files = e.dataTransfer.files // collega al file input

    updateFileName(file)
  })

  function updateFileName(file) {
    if (file) {
      $fileName.textContent = 'Selected file: ' + file.name
      $uploadTransactions.classList.remove('disabled')
    }
  }
}
    
const column = {
  init: () => {
    manageCollapsableMenu()
    manageUploadedFilesList()
    manageDropAreaTransactionUpload()

    window.addEventListener('transactionsUpdated', () => {
      manageUploadedFilesList()
    })
  }
}

export default column
