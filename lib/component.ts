import { ChildElement, ComponentOptions, HTMLAllAttributes } from './types'

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

function renderInChunks (
  children: ChildElement | ChildElement[],
  element: HTMLElement,
  chunkSize: number = 50
): void {
  const fragment = document.createDocumentFragment()
  const queue: ChildElement[] = Array.isArray(children) ? children : [children]

  function processChunk (): void {
    const chunk = queue.splice(0, chunkSize)
    chunk.forEach(child => appendChildToFragment(child, fragment))

    if (queue.length > 0) {
      requestAnimationFrame(processChunk)
    } else {
      element.appendChild(fragment)
    }
  }

  requestAnimationFrame(processChunk)
}

function render (children: ChildElement | ChildElement[], element: HTMLElement): void {
  renderInChunks(children, element)
}

function appendChildToFragment (child: ChildElement, fragment: DocumentFragment): void {
  if (child instanceof HTMLElement) {
    fragment.appendChild(child)
  } else if (typeof child === 'function') {
    const result = child()
    if (Array.isArray(result)) {
      result.forEach(item => appendChildToFragment(item, fragment))
    } else {
      appendChildToFragment(result, fragment)
    }
  }
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
