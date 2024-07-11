import { ChildElement, ComponentOptions, HTMLAttributesBase } from '../types'

export function createComponent ({
  tag = 'div',
  content = '',
  children = [],
  events,
  ...props
}: ComponentOptions): HTMLElement {
  const { href, target = '_blank', classNames } = props
  const element = document.createElement(tag)

  if (tag === 'a' && href != null) {
    (element as HTMLAnchorElement).href = href;
    (element as HTMLAnchorElement).target = target
  }

  if (classNames != null && typeof classNames === 'string') {
    element.className = classNames.trim()
  } else if (classNames != null && Array.isArray(classNames)) {
    classNames.forEach((item) => element.classList.add(item.trim()))
  }

  Object.keys(props).forEach((key) => {
    const typedKey = key as keyof HTMLAttributesBase
    const value = props[typedKey]

    if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
      element.setAttribute(key, String(value))
    } else if (Array.isArray(value)) {
      element.setAttribute(key, value.join(' '))
    } else if (value !== undefined) {
      element.setAttribute(key, String(value))
    }
  })

  if (events != null) {
    Object.keys(events).forEach((key) => {
      const typedKey = key as keyof GlobalEventHandlersEventMap
      const listener = events[typedKey]
      if (listener != null) {
        element.addEventListener(typedKey, listener)
      }
    })
  }

  if (content != null) {
    element.textContent = content
  }

  children.length > 0 && render(children, element)

  return element
}

function render (childrens: ChildElement | ChildElement[], element: HTMLElement): HTMLElement | any {
  const fragment = document.createDocumentFragment()
  if (childrens instanceof HTMLElement) {
    fragment.appendChild(childrens)
    element.appendChild(fragment)
  } else if (typeof childrens === 'function') {
    render(childrens(), element)
  } else if (Array.isArray(childrens) && childrens.length > 0) {
    const elements: HTMLElement[] = []
    const funcs: Array<ChildElement | ChildElement[]> = []
    childrens.forEach((child) => {
      if (child instanceof HTMLElement) {
        elements.push(child)
      }

      if (typeof child === 'function') {
        const res = child()
        funcs.push(res)
      }
    })

    if (funcs.length > 0) {
      funcs.forEach((f) => render(f, element))
    }

    elements.forEach((el) => fragment.appendChild(el))
    element.appendChild(fragment)
  }
}

export function initApp (parentId: string, children: ChildElement[] = []): void {
  const app = document.getElementById(parentId)

  if (app instanceof HTMLElement && children.length > 0) {
    render(children, app)
  } else {
    console.error('Parent element not found')
  }
}
