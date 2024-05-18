export function createRouter() {
  const routes = {};
  let element

  function addRoute(route, callback) {
    routes[route] = callback;
  }

  function navigateTo(route) {
    window.history.pushState({ route }, '', route);
    renderContent(route);
  }

  function renderContent(route) {
    if (routes[route] && element) {
      element.innerHTML = ''
      const content = routes[route]();
      element.appendChild(content);
    }
  }

  function startRouter() {
    window.addEventListener('popstate', handlePopState);
    handlePopState({ state: window.history.state });
  }

  function handlePopState(event) {
    const route = event.state ? event.state.route : '/';
    renderContent(route);
  }

  function parentElement(node) {
    element = node
    return node
  }

  return {
    addRoute,
    navigateTo,
    startRouter,
    parentElement,
    routes,
  };
}
