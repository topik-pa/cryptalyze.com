const url = 'https://6442459433997d3ef90c1331.mockapi.io/users' // APIRELATED
const $products = document.getElementById('products')
const $more = document.getElementById('more')

const initConf = {
  limit: 10,
  page: 1
}

$more.querySelector('.btn').addEventListener('click', async () => {
  initConf.page++
  await loadRemoteData()
})

const queryString = {
  get () {
    let qs = '?'
    qs += `page=${initConf.page}`
    qs += `&limit=${initConf.limit}`
    return qs
  }
}

const mutationObserver = new MutationObserver((mutations) => {
  mutations.forEach((mutation, i) => {
    if(i>0) return
    if(mutation.target.id === "products") {
      Array.from(mutation.target.children).map((prod) => {
        prod.querySelector('img').addEventListener("load", () => {
          prod.classList.remove('loading')
        })
      })
    }
  })
})
mutationObserver.observe($products, {
  childList: true
});


function generateHTML(strings, product) {
  return `
      <h2>${product.name} ${product.surname}</h2>
      <p>Email: ${product.email}</p>
      <p>Age: ${product.age}</p>
      <img alt="${product.name} image" src="${product.avatar}"/>
  `
}

const printProducts = (products) => {
  for (const p of products) {
    const productInnerHTML = generateHTML`${p}`
    const prodEl = document.createElement('div')
    prodEl.classList.add('product')
    prodEl.classList.add('loading')
    prodEl.innerHTML = productInnerHTML;
    $products.appendChild(prodEl)
  }
}

const loadRemoteData = async () => {
  $more.classList.toggle('loading')
  await fetch(url + queryString.get())
    .then(response => response.json())
    .then((json) => {
      printProducts(json) // APIRELATED
    })
    .catch((error) => {
      $more.classList.add('error')
      console.error(error)
    })
    .finally(() => {
      $more.classList.toggle('loading')
    })
}

export const plp = {
  init: async () => {
    console.log('PLP')

    await loadRemoteData()
  }
}
