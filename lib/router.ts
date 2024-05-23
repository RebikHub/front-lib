
export class Router {
  private routes: { [route: string]: () => Node }
  private element: HTMLElement | null

  constructor () {
    this.routes = {}
    this.element = null
    this.handlePopState = this.handlePopState.bind(this)
  }

  addRoute (route: string, callback: () => Node): void {
    if (route && callback) {
      this.routes[route] = callback
    } else {
      console.error('Invalid route or callback')
    }
  }

  navigateTo (route: string): void {
    if (this.routes[route]) {
      window.history.pushState({ route }, '', route)
      this.renderContent(route)
    } else {
      console.error('Route not found')
    }
  }

  renderContent (route: string): void {
    if (this.routes[route] && (this.element != null)) {
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
    const initialRoute = initialState && initialState.route ? initialState.route : '/'
    this.renderContent(initialRoute)
  }

  handlePopState (event: PopStateEvent): void {
    const route = event.state && event.state.route ? event.state.route : '/'
    this.renderContent(route)
  }

  layoutElement (node: HTMLElement): HTMLElement {
    this.element = node
    return node
  }

  destroy (): void {
    window.removeEventListener('popstate', this.handlePopState)
  }
}
