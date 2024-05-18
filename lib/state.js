// ...
export class StateManager {
  constructor(initialState) {
    this.state = initialState || {};
    this.observers = [];
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(changedProperty) {
    this.observers.forEach((observer) =>
      observer.update(this.state, changedProperty)
    );
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.notifyObservers(Object.keys(newState));
  }

  getState() {
    return this.state;
  }
}
// ...
export class StateObserver {
  constructor(manager) {
    this.manager = manager;
    this.manager.addObserver(this);
    this.component = null;
  }

  observeElement(element) {
    this.component = element;
    return element;
  }

  update(newState, changedProperty) {
    console.log("State updated:", newState);
    const targetElement = this.component;
    if (targetElement) {
      if (changedProperty.includes("count")) {
        targetElement.textContent = newState.count;
      }
    } else {
      console.error("Target element not found");
    }
    return newState;
  }
}
