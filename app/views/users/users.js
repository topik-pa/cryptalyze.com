/**
 * User management view module.
 * @namespace
 */

/**
 * Initializes the users view by dynamically importing and applying CSS styles.
 * Attempts to adopt the CSS module's stylesheet to the document.
 * Falls back silently if the browser doesn't support adoptedStyleSheets.
 * 
 * @async
 * @function init
 * @returns {Promise<void>} A promise that resolves when initialization is complete.
 * @throws {Error} Silently catches and ignores errors related to style sheet adoption.
 */

export default  {
  init: async() => {
    const cssModule = await import('./users.css', {
      with: { type: 'css' }
    })
    try {
      document.adoptedStyleSheets = [cssModule.default]
    // Setting adoptedStyleSheets may fail in unsupported browsers; log the error for debugging.
    } catch (err) { 
      // console.error('Error adopting style sheets:', err)
    }
  }
}
