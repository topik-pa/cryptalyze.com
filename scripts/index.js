import { pool } from './pool.js'
import mainMenu from '../components/shared/header/main-menu/main-menu.js'
import cookieLayer from '../components/shared/cookie_layer/cookie_layer.js'
import gotoTop from '../components/shared/goto_top/goto_top.js'
import header from '../components/shared/header/header.js'

pool()

mainMenu.toggleMobileMenu()
cookieLayer.init()
gotoTop.init()
header.init()

// Go to the hash element if present
function goToHash () {
  if (location.hash) {
    const $target = document.getElementById(location.hash.replace('#', ''))
    if ($target) {
      setTimeout(() => {
        $target.scrollIntoView({ behavior: 'smooth' })
      }, 500)
    }
  }
}
goToHash()

// Go to the relative hash section
function goToSection () {
  const $anchors = document.querySelectorAll('a[data-target]')
  for (const anchor of $anchors) {
    anchor.addEventListener('click', (e) => {
      const $target = document.getElementById(anchor.dataset.target)
      if ($target) {
        e.preventDefault()
        $target.scrollIntoView({ behavior: 'smooth' })
      }
    })
  }
}
goToSection()

if (document.querySelector('body#home')) {
  import('../views/home.js').then((module) => {
    module.home.init()
  })
}
if (document.querySelector('body#contacts')) {
  import('../views/contacts/contacts.js').then((module) => {
    module.contacts.init()
  })
}
if (document.querySelector('body#transactions')) {
  import('../views/transactions/transactions.js').then((module) => {
    module.transactions.init()
  })
}
if (document.querySelector('body#privacy')) {
  import('../views/privacy/privacy.js').then((module) => {
    module.privacy.init()
  })
}
if (document.querySelector('body#err404')) {
  import('../views/404/404.js').then((module) => {
    module.err404.init()
  })
}

