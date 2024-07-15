export function createRouter (): {
  addRoute: (route: string, callback: () => Node) => void
  navigateTo: (route: string) => void
  renderContent: (route: string) => void
  startRouter: () => void
  handlePopState: (event: PopStateEvent) => void
  layoutElement: (node: HTMLElement) => HTMLElement
  destroy: () => void
} {
  const routes: { [route: string]: () => Node } = {}
  let element: HTMLElement | null = null

  function addRoute (route: string, callback: () => Node): void {
    if (route != null && typeof callback === 'function') {
      routes[route] = callback
    } else {
      console.error('Invalid route or callback')
    }
  }

  function navigateTo (route: string): void {
    if (routes[route] != null) {
      window.history.pushState({ route }, '', route)
      renderContent(route)
    } else {
      console.error('Route not found')
    }
  }

  function renderContent (route: string): void {
    if (routes[route] != null && (element != null)) {
      element.innerHTML = ''
      const content = routes[route]()
      if (content instanceof Node) {
        element.appendChild(content)
      } else {
        console.error('Route callback did not return a DOM node')
      }
    } else {
      console.error('Route or element not found')
    }
  }

  function startRouter (): void {
    window.addEventListener('popstate', handlePopState)
    renderContent(window.location.pathname)
  }

  function handlePopState (event: PopStateEvent): void {
    const route = event.state?.route !== undefined && event.state?.route !== null ? event.state.route : window.location.pathname
    renderContent(route)
  }

  function layoutElement (node: HTMLElement): HTMLElement {
    element = node
    return node
  }

  function destroy (): void {
    window.removeEventListener('popstate', handlePopState)
    element = null
  }

  return {
    addRoute,
    navigateTo,
    renderContent,
    startRouter,
    handlePopState,
    layoutElement,
    destroy
  }
}
