export class Router {
  constructor () {
    this.routes = {}
    this.element = null

    this.handlePopState = this.handlePopState.bind(this)
  }

  addRoute (route, callback) {
    if (typeof route === 'string' && typeof callback === 'function') {
      this.routes[route] = callback
    } else {
      console.error('Invalid route or callback')
    }
  }

  navigateTo (route) {
    if (this.routes[route]) {
      window.history.pushState({ route }, '', route)
      this.renderContent(route)
    } else {
      console.error('Route not found')
    }
  }

  renderContent (route) {
    if (this.routes[route] && this.element) {
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

  startRouter () {
    window.addEventListener('popstate', this.handlePopState)
    this.handlePopState({ state: window.history.state })
  }

  handlePopState (event) {
    const route = event.state ? event.state.route : '/'
    this.renderContent(route)
  }

  layoutElement (node) {
    if (node instanceof HTMLElement) {
      this.element = node
      return node
    }
    console.error('Invalid element')
    return null
  }
}

// Usage example:
// const router = new Router();
// router.setParentElement(document.getElementById('app'));

// router.addRoute('/', () => {
//   const div = document.createElement('div');
//   div.textContent = 'Home';
//   return div;
// });

// router.addRoute('/about', () => {
//   const div = document.createElement('div');
//   div.textContent = 'About';
//   return div;
// });

// router.startRouter();

// To navigate to a route
// router.navigateTo('/about');
