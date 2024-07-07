import { ChildElement, ComponentOptions, HTMLAttributesBase } from './types'

// function createElement (tag: string, props: Props = {}, ...children: VNode[]): VNode {
//   return { tag, props, children: [...children] }
// }

// function renderElement (vnode: VNode): Node {
//   if (typeof vnode === 'string') {
//     return document.createTextNode(vnode)
//   }

//   // Проверяем, что vnode является объектом с тегом
//   if (typeof vnode === 'object' && 'tag' in vnode) {
//     const { tag, props, children } = vnode
//     const element = document.createElement(tag)

//     // Проверяем, что props определен и является объектом
//     if (props && typeof props === 'object') {
//       Object.keys(props).forEach((key) => {
//         const value = props[key as keyof Props]
//         if (value !== undefined) {
//           if (key.startsWith('on') && typeof value === 'function') {
//             element.addEventListener(key.slice(2).toLowerCase(), value as EventListener)
//           } else if (key in element) {
//             (element as any)[key] = value
//           } else {
//             element.setAttribute(key, value as string)
//           }
//         }
//       })
//     }

//     children.forEach((child: any) => {
//       let childNode: Node | null = null

//       if (typeof child === 'string') {
//         childNode = document.createTextNode(child)
//       } else if (child instanceof HTMLElement) {
//         childNode = child
//       } else if (typeof child === 'function') {
//         const childVNode = child()
//         childNode = renderElement(childVNode)
//       } else if (typeof child === 'object') {
//         childNode = renderElement(child)
//       }

//       if (childNode) {
//         element.appendChild(childNode)
//       }
//     })

//     return element
//   } else {
//     throw new Error('Invalid VNode format');
//   }
// }

// function updateElement (parent: Node, newNode: VNode, oldNode: VNode, index = 0): void {
//   if (oldNode == null && newNode != null) {
//     parent.appendChild(renderElement(newNode))
//   } else if (newNode == null && oldNode != null) {
//     parent.removeChild(parent.childNodes[index])
//   } else if (newNode != null && changed(newNode, oldNode)) {
//     parent.replaceChild(renderElement(newNode), parent.childNodes[index])
//   } else if (typeof newNode !== 'string' && newNode != null && newNode.tag !== '' && typeof oldNode !== 'string') {
//     updateChildren(parent.childNodes[index], newNode.children, oldNode.children)
//   }
// }

export function createComponent ({
  elementName = 'div',
  textContent = '',
  children = [],
  events,
  ...props
}: ComponentOptions): HTMLElement {
  const { href, target = '_blank', className } = props
  const element = document.createElement(elementName)

  if (elementName === 'a' && href != null) {
    (element as HTMLAnchorElement).href = href;
    (element as HTMLAnchorElement).target = target
  }

  if (className != null) {
    element.classList.add(className)
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

  element.textContent = textContent

  children.length > 0 && render(children, element)

  console.log(element)

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

// function createFragmentFromString (str) {
//   let template = document.createElement('template')
//   template.innerHTML = str
//   return template.content
// }
