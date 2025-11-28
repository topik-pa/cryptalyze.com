
const $form = document.forms[0]
const $errors = document.getElementById('errors')
const $submit = $form.querySelector('button[type=submit]')

const listFormErrors = () => {
  $errors.innerText = ''
  const $invalids = $form.querySelectorAll(':invalid')
  if ($invalids.length > 0) $errors.classList.remove('hide')
  for (const elem of $invalids) {
    if (elem.nodeName === 'FIELDSET') continue
    const placeholder = elem.getAttribute('placeholder')
    const label = elem.id ? $form.querySelector(`label[for=${elem.id}]`).innerText : ''
    let error = placeholder || label
    const message = elem.validationMessage.toLowerCase() || 'invalid value.'
    error += ': '
    error += message
    const $li = document.createElement('li')
    $li.innerText = error
    $errors.append($li)
    // debugger
  }
}

$submit.addEventListener('click', (e) => {
  e.preventDefault()
  listFormErrors()
})

export const form = {
  init: async () => {
    console.log('Form')
  }
}
