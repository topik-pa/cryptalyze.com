const template = document.createElement('template')
template.innerHTML = `
  <style>
    .bullet {
      border: 1px solid var(--darker-gray);
      background-color: var(--light-gray);
      border-radius: var(--border-radius-small);
      width: 100%;
      min-width: 16rem;
      max-width: 28rem;
      box-sizing: border-box;
      margin: var(--main-padding) 0;
    }
    .head {
      padding: var(--main-padding) var(--main-padding) var(--x-large-space) var(--main-padding);
      font-weight: 500;
      color: var(--darker-gray);
      position:relative;
      text-transform: uppercase;
    }
    .name {
      padding: 0 var(--main-padding);
      font-style: italic;
      text-shadow: 0 1px 0px var(--darkest-gray);
    }
    .value {
      padding: var(--x-small-space) var(--main-padding);
      font-size: var(--font-size-bigger);
      font-weight: bold;
      text-shadow: 0 1px 0px var(--darkest-gray);
    }
    .lastmod {
      padding: var(--x-small-space) var(--main-padding);
      font-size: var(--font-size-x-small);
      color: var(--dark-gray);
    }
    footer {
      background-color: var(--darkest-gray);
      padding: var(--x-small-space);
    }
    #remove {
      position: absolute;
      top: var(--main-padding);
      right: var(--main-padding);
      cursor: pointer;
    }
  </style>

  <div class="bullet">
    <header class="head">
      <slot name="type"></slot>
      <span id="remove">&#x274C;</span>
    </header>
    <div class="name">
      <slot name="name"></slot>
    </div>
    <div class="value">
      <slot name="value"></slot>
    </div>
    <div class="lastmod">
      <slot name="lastmod"></slot>
    </div>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
`

class CmpBullet extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.append(template.content.cloneNode(true))
    this.root = this.shadow.querySelector('div')
    this.root.querySelector('#remove').addEventListener('click', () => {
      const storedTransactions = JSON.parse(sessionStorage.getItem('transactions'))
      const filtered = storedTransactions.filter(t => t.id !== this.getAttribute('id'))
      sessionStorage.setItem('transactions', JSON.stringify(filtered))
      const event = new Event('transactionsUpdated')
      window.dispatchEvent(event)
      this.remove()
    })
  }

  connectedCallback() {
    this.root.classList.add(this.getAttribute('status'))
  }
}

customElements.define('cmp-bullet', CmpBullet)
