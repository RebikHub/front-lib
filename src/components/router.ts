export function createRouter (): {
  add: (route: string, callback: () => Node) => void
  navigate: (route: string) => void
  render: (route: string) => void
  start: () => void
  handlePopState: (event: PopStateEvent) => void
  layout: (node: HTMLElement) => HTMLElement
  destroy: () => void
} {
  const routes: { [route: string]: () => Node } = {}
  let element: HTMLElement | null = null

  function add (route: string, callback: () => Node): void {
    if (route != null && typeof callback === 'function') {
      routes[route] = callback
    } else {
      console.error('Invalid route or callback')
    }
  }

  function navigate (route: string): void {
    if (routes[route] != null) {
      window.history.pushState({ route }, '', route)
      render(route)
    } else {
      console.error('Route not found')
    }
  }

  function render (route: string): void {
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

  function start (): void {
    window.addEventListener('popstate', handlePopState)
    render(window.location.pathname)
  }

  function handlePopState (event: PopStateEvent): void {
    const route = event.state?.route !== undefined && event.state?.route !== null ? event.state.route : window.location.pathname
    render(route)
  }

  function layout (node: HTMLElement): HTMLElement {
    element = node
    return node
  }

  function destroy (): void {
    window.removeEventListener('popstate', handlePopState)
    element = null
  }

  return {
    add,
    navigate,
    render,
    start,
    handlePopState,
    layout,
    destroy
  }
}
