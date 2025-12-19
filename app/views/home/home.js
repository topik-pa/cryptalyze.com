/**
 * Home view module that initializes and manages the home page.
 * @namespace
 * @property {Function} init - Asynchronously initializes the home view by importing and applying CSS modules.
 * @returns {Promise<void>} A promise that resolves when the initialization is complete.
 * @throws {Error} Silently catches and ignores errors when adoptedStyleSheets is not supported by the browser.
 */

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

    manageDropAreaTransactionUpload()
  }
}
