import { generateUUID } from '../utils'
import { ChildElement, ComponentOptions, HTMLAllAttributes, ObserveProps } from '../types'

export function createComponent<T extends keyof HTMLElementTagNameMap> ({
  tag = 'div' as T,
  content = '',
  children = [],
  events,
  ...props
}: ComponentOptions<T>): HTMLElementTagNameMap[T] {
  const element = document.createElement(tag)

  setElementClasses(element, props)
  setElementAttributes(element, props)
  setElementEvents(element, events)

  if (content != null) {
    element.textContent = content
  }

  if (children.length > 0) {
    render(children, element)
  }

  return element
}

function setElementClasses (element: HTMLElement, props: HTMLAllAttributes): void {
  if (props.class != null && typeof props.class === 'string') {
    element.className = props.class.trim()
  }
  if (props.classes != null && Array.isArray(props.classes)) {
    props.classes.forEach((item) => element.classList.add(item.trim()))
  }
}

function setElementAttributes (element: HTMLElement, props: HTMLAllAttributes): void {
  Object.keys(props).forEach((key) => {
    const typedKey = key.trim() as keyof HTMLAllAttributes
    const value = props[typedKey]

    if (value != null) {
      if (typeof value === 'string') {
        element.setAttribute(key, value.trim())
      } else if (typeof value === 'boolean') {
        value ? element.setAttribute(key, '') : element.removeAttribute(key)
      } else {
        element.setAttribute(key, String(value))
      }
    }
  })
}

function setElementEvents (element: HTMLElement, events: { [key: string]: EventListener } | undefined): void {
  if (events != null) {
    Object.keys(events).forEach((key) => {
      const typedKey = key as keyof GlobalEventHandlersEventMap
      const listener = events[typedKey]
      if (listener != null) {
        element.addEventListener(typedKey, listener)
      }
    })
  }
}

export function observe<S, T extends keyof HTMLElementTagNameMap> ({
  store,
  props,
  render
}: ObserveProps<S, T>): HTMLElement {
  const element = createComponent(props)
  const key = generateUUID()

  element.setAttribute('data-key', key)

  store.add(key, (state) => {
    if (typeof render !== 'function') {
      console.error('Render is not a function:', render)
      return
    }

    update(element, render(state))
  })

  const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node: Node) => {
        if (node instanceof HTMLElement) {
          const datakeyElements = node.querySelectorAll('[data-key]')
          datakeyElements.forEach((item) => {
            if (node instanceof HTMLElement && item.hasAttribute('data-key')) {
              const nodeKey = item.getAttribute('data-key')
              if (nodeKey === key) {
                store.remove(key)
                mutationObserver.disconnect()
              }
            }
          })
        }
      })
    })
  })

  mutationObserver.observe(document.body, {
    childList: true,
    attributes: true,
    attributeFilter: ['data-key'],
    subtree: true
  })

  return element
}

export function update<T extends keyof HTMLElementTagNameMap> (element: HTMLElement, {
  tag = 'div' as T,
  content = '',
  children = [],
  events,
  ...props
}: ComponentOptions<T>
): HTMLElement {
  if (props.class != null) {
    setElementClasses(element, { class: props.class })
  }

  if (props.classes != null) {
    setElementClasses(element, { classes: props.classes })
  }

  if (content != null) {
    element.textContent = content
  }

  if (events != null) {
    setElementEvents(element, events)
  }

  if (props != null) {
    setElementAttributes(element, props)
  }
  if (children.length > 0) {
    render(children, element)
  }

  return element
}

function render (
  children: ChildElement | ChildElement[],
  element: HTMLElement,
  chunkSize: number = 50
): void {
  const fragment = document.createDocumentFragment()
  const queue: ChildElement[] = []

  function enqueue (items: ChildElement | ChildElement[]): void {
    if (Array.isArray(items)) {
      items.forEach(item => enqueue(item))
    } else if (items instanceof HTMLElement || items instanceof DocumentFragment) {
      queue.push(items)
    } else if (typeof items === 'function') {
      enqueue(items())
    }
  }

  enqueue(children)

  function processChunk (): void {
    const chunk = queue.splice(0, chunkSize)
    chunk.forEach(child => {
      if (child instanceof HTMLElement || child instanceof DocumentFragment) {
        fragment.appendChild(child)
      }
    })

    if (queue.length > 0) {
      requestAnimationFrame(processChunk)
    } else {
      element.appendChild(fragment)
    }
  }

  requestAnimationFrame(processChunk)
}

export function initApp (parentId: string, children: ChildElement[] = []): void {
  const app = document.getElementById(parentId)

  if (app instanceof HTMLElement) {
    if (children.length > 0) {
      render(children, app)
    }
  } else {
    console.error('Parent element not found')
  }
}
