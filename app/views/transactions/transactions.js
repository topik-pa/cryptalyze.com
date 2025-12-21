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

    // eslint-disable-next-line no-undef
    new DataTable('#table')
  }
}
