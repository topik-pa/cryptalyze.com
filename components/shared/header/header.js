const toggleDarkMode = () => {
  const $toggledark = document.getElementById('toggle-dark')
  // if (localStorage.getItem('dark')) document.documentElement.classList.add('dark') // Moved to <head>
  // Toggle between dark mode
  function toggle () {
    document.documentElement.classList.toggle('dark')
    localStorage.removeItem('dark')
    if (document.documentElement.classList.contains('dark')) localStorage.setItem('dark', true)
  }

  $toggledark.addEventListener('click', () => {
    toggle()
  })
}

const header = {
  init: () => {
    toggleDarkMode()
  }
}

export default header
