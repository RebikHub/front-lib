
export class Router {
  private routes: { [route: string]: () => Node }
  private element: HTMLElement | null

  constructor () {
    this.routes = {}
    this.element = null
    this.handlePopState = this.handlePopState.bind(this)
  }

  addRoute (route: string, callback: () => Node): void {
    if (route != null) {
      this.routes[route] = callback
    } else {
      console.error('Invalid route or callback')
    }
  }

  navigateTo (route: string): void {
    console.log(route)

    if (this.routes[route] != null) {
      window.history.pushState({ route }, '', route)
      this.renderContent(route)
    } else {
      console.error('Route not found')
    }
  }

  renderContent (route: string): void {
    if (this.routes[route] != null && (this.element != null)) {
      this.element.innerHTML = ''
      const content = this.routes[route]()
      if (content instanceof Node) {
        this.element.appendChild(content)
      } else {
        console.error('Route callback did not return a DOM node')
      }
    } else {
      console.error('Route or element not found')
    }
  }

  startRouter (): void {
    window.addEventListener('popstate', this.handlePopState)
    const initialState = window.history.state
    this.renderContent(initialState?.route ?? '/')
  }

  handlePopState (event: PopStateEvent): void {
    this.renderContent(event.state?.route ?? '/')
  }

  layoutElement (node: HTMLElement): HTMLElement {
    this.element = node
    return node
  }

  destroy (): void {
    window.removeEventListener('popstate', this.handlePopState)
  }
}
