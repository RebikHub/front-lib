export function createComponent ({
  elementName = 'div',
  classNames = '',
  textContent = '',
  children = [],
  href = '',
  target = '_blank',
  onClick
}) {
  const element = document.createElement(elementName)

  if (elementName === 'a') {
    element.href = href
    element.target = target
  }

  if (classNames) {
    element.classList.add(...classNames.split(' '))
  }

  if (typeof onClick === 'function') {
    element.addEventListener('click', onClick)
  }

  element.textContent = textContent

  render(children, element)

  return element
}

function render (childrens, element) {
  if (!element) {
    console.error('Element not found')
  } else if (Array.isArray(childrens)) {
    const result = childrens.reduce((acc, val) => acc.concat(Array.isArray(val) ? val : [val]), [])

    result.forEach((child) => {
      if (child instanceof HTMLElement) {
        element.appendChild(child)
      } else if (child instanceof Function) {
        const instance = child()
        if (instance instanceof HTMLElement) {
          element.appendChild(instance)
        } else if (instance instanceof Function) {
          element.appendChild(instance())
        } else if (Array.isArray(instance)) {
          render(instance, element)
        }
      } else {
        console.error('Child must be an instance of HTMLElement')
      }
    })
  } else {
    console.error('Children should be an array of HTMLElements')
  }
}

export function initApp (parentId, children = []) {
  const app = document.getElementById(parentId)

  render(children, app)
}
