const mainMenu = {
  listenerAdded: false,
  toggleMobileMenu: () => {
    const $view = document.documentElement
    const $root = document.getElementById('main-menu')
    if (!$root) {
      return
    }
    const $hamburger = document.querySelector('header .hamburger')
    const $closeMenu = $root.querySelector('.close')

    if (!mainMenu.listenerAdded) {
      $view.addEventListener('click', (e) => {
        if (e.target === $hamburger) {
          $root.classList.toggle('show')
          return
        }
        if (e.target === $closeMenu) {
          $root.classList.remove('show')
          return
        }

        let parent = e.target.parentNode
        let toBeClosed = true
        while (parent) {
          if (parent === $root) {
            toBeClosed = false
            break
          } else {
            parent = parent.parentNode
          }
        }
        if (toBeClosed) {
          $root.classList.remove('show')
        }
      })
      mainMenu.listenerAdded = true
    }
  }
}

export default mainMenu
