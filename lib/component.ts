// export interface Props {
//   className?: string
//   textContent?: string
//   href?: string
//   target?: '_blank' | '_self' | '_parent' | '_top'
//   onClick?: (event: MouseEvent) => void
// }

import { HTMLAttributesBase } from './types'

// export type VNode = {
//   tag: string
//   props: Props
//   children: VNode[]
// } | string

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

// function updateChildren (parent: Node, newChildren: VNode[], oldChildren: VNode[]): void {
//   const length = Math.max(newChildren.length, oldChildren.length)
//   for (let i = 0; i < length; i++) {
//     updateElement(parent, newChildren[i], oldChildren[i], i)
//   }
// }

// function changed (node1: VNode, node2: VNode): boolean {
//   if (typeof node1 !== typeof node2) {
//     return true
//   }
//   if (typeof node1 === 'string' && node1 !== node2) {
//     return true
//   }
//   if (typeof node1 !== 'string' && typeof node2 !== 'string' && node1.tag !== node2.tag) {
//     return true
//   }
//   return false
// }

// export function render (vnode: VNode, container: HTMLElement, virtualDOM?: VNode): void {
//   if (virtualDOM != null) {
//     updateElement(container, vnode, virtualDOM)
//   } else {
//     container.appendChild(renderElement(vnode))
//   }
// }

// export function createComponent ({
//   elementName = 'div',
//   classNames = '',
//   textContent = '',
//   children = [],
//   href = '',
//   target = '_blank',
//   onClick
// }: {
//   elementName?: string
//   classNames?: string
//   textContent?: string
//   children?: VNode[]
//   href?: string
//   target?: '_blank' | '_self' | '_parent' | '_top'
//   onClick?: (event: MouseEvent) => void
// } = {}): VNode {
//   const props: Props = {
//     className: classNames,
//     textContent,
//     href,
//     target,
//     onClick
//   }
//   return createElement(elementName, props, ...children)
// }

// export function initApp (parentId: string, children: VNode[] = []): void {
//   const app = document.getElementById(parentId)
//   if (app != null) {
//     render(createElement('div', {}, ...children), app)
//   } else {
//     console.error(`Element with id ${parentId} not found`)
//   }
// }

type ChildElement = HTMLElement | HTMLElement[] | (() => HTMLElement | ChildElement | ChildElement[])

type ComponentOptions = {
  elementName?: keyof HTMLElementTagNameMap
  textContent?: string
  children?: ChildElement[]
} & HTMLAttributesBase

export function createComponent ({
  elementName = 'div',
  textContent = '',
  children = [],
  ...props
}: ComponentOptions): HTMLElement {
  const { href, target = '_blank', className } = props
  const element = document.createElement(elementName)

  if (elementName === 'a' && href) {
    (element as HTMLAnchorElement).href = href;
    (element as HTMLAnchorElement).target = target
  }

  if (className) {
    element.classList.add(className)
  }

  Object.keys(props).forEach((key) => {
    element.setAttribute(key, props[key] as string)
  })

  Object.keys(props).forEach((key) => {
    if (key.startsWith('on') && typeof props[key] === 'function') {
      element.addEventListener(key.substring(2).toLowerCase(), props[key])
    }
  })

  element.textContent = textContent

  ;(children.length > 0) && render(children, element)

  return element
}

function render (childrens: ChildElement | ChildElement[], element: HTMLElement) {
  if (childrens instanceof HTMLElement) {
    return element.appendChild(childrens)
  }

  if (typeof childrens === 'function') {
    return render(childrens(), element)
  }

  if (Array.isArray(childrens) && childrens.length > 0) {
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

    return elements.forEach((el) => element.appendChild(el))
  }
}

export function initApp (parentId: string, children: ChildElement[] = []) {
  const app = document.getElementById(parentId)

  if (app instanceof HTMLElement && children.length > 0) {
    render(children, app)
  } else {
    console.error('Parent element not found')
  }
}
