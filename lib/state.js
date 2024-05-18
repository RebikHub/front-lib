export class StateManager {
  constructor (initialState = {}) {
    this.state = initialState
    this.observers = []
  }

  addObserver (observer) {
    if (observer && typeof observer.update === 'function') {
      this.observers.push(observer)
    } else {
      console.error('Invalid observer. Must have an update method.')
    }
  }

  notifyObservers (changedProperties) {
    this.observers.forEach(observer => observer.update(this.state, changedProperties))
  }

  setState (newState) {
    const changedProperties = Object.keys(newState)
    this.state = { ...this.state, ...newState }
    this.notifyObservers(changedProperties)
  }

  getState () {
    return this.state
  }
}

export class StateObserver {
  constructor (manager) {
    if (!(manager instanceof StateManager)) {
      throw new Error('Invalid manager. Must be an instance of StateManager.')
    }
    this.manager = manager
    this.manager.addObserver(this)
    this.component = null
    this.observeState = ''
  }

  observeElement (element, observeState) {
    if (element instanceof HTMLElement) {
      this.component = element
      this.observeState = observeState
      return element
    } else {
      console.error('Invalid element. Must be an instance of HTMLElement.')
    }
  }

  update (newState) {
    if (this.component && this.observeState) {
      this.updateElementWithState(this.component, newState[this.observeState])
    } else {
      console.error('No component to update.')
    }
  }

  updateElementWithState (element, state) {
    if (typeof state === 'object' && state !== null) {
      for (const key in state) {
        if (typeof state[key] === 'object' && state[key] !== null) {
          this.updateElementWithState(element, state[key])
        } else {
          element.textContent = state
        }
      }
    } else {
      element.textContent = state
    }
  }
}

// Usage example:

// const initialState = { count: 0 };
// const stateManager = new StateManager(initialState);

// const observer = new StateObserver(stateManager);
// const element = document.getElementById('count-display');
// observer.observeElement(element);

// // Simulate state change
// stateManager.setState({ count: 1 });

// // To observe the element's content update
// console.log(element.textContent); // Should print "1"
