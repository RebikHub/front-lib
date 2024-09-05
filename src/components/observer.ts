import { StateReturn } from '@lib/types'

export const createMutationObserver = <S>(key: string, store: StateReturn<S>): {
  observe: (target: Node) => void
  disconnect: () => void
} => {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof HTMLElement) {
          const datakeyElements = node.querySelectorAll('[data-key]')
          datakeyElements.forEach((item) => {
            if (item.hasAttribute('data-key')) {
              const nodeKey = item.getAttribute('data-key')
              if (nodeKey === key) {
                store.remove(key)
                observer.disconnect()
                return null
              }
            }
          })
        }
      })
    })
  })

  const observe = (target: Node): void => {
    observer.observe(target, {
      childList: true,
      attributes: true,
      attributeFilter: ['data-key'],
      subtree: true
    })
  }

  const disconnect = (): void => {
    observer.disconnect()
  }

  return {
    observe,
    disconnect
  }
}
