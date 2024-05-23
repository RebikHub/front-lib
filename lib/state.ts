interface Observer {
  update: (state: any, changedProperties: string[]) => void
}

export class StateManager {
  private state: { [key: string]: any }
  private readonly observers: Observer[]

  constructor (initialState: { [key: string]: any } = {}) {
    this.state = initialState
    this.observers = []
  }

  addObserver (observer: Observer): void {
    if (observer != null && typeof observer.update === 'function') {
      this.observers.push(observer)
    } else {
      console.error('Invalid observer. Must have an update method.')
    }
  }

  notifyObservers (changedProperties: string[]): void {
    this.observers.forEach(observer => observer.update(this.state, changedProperties))
  }

  setState (newState: { [key: string]: any }): void {
    const changedProperties = Object.keys(newState)
    this.state = { ...this.state, ...newState }
    this.notifyObservers(changedProperties)
  }

  getState (): { [key: string]: any } {
    return this.state
  }
}

export class StateObserver {
  private readonly manager: StateManager
  private component: HTMLElement | null
  private observeState: string

  constructor (manager: StateManager) {
    if (!(manager instanceof StateManager)) {
      throw new Error('Invalid manager. Must be an instance of StateManager.')
    }
    this.manager = manager
    this.manager.addObserver(this)
    this.component = null
    this.observeState = ''
  }

  observeElement (element: HTMLElement, observeState: string): HTMLElement {
    if (element instanceof HTMLElement) {
      this.component = element
      this.observeState = observeState
      return element
    } else {
      console.error('Invalid element. Must be an instance of HTMLElement.')
      throw new Error('Invalid element')
    }
  }

  update (newState: { [key: string]: any }): void {
    if ((this.component != null) && this.observeState != null) {
      this.updateElementWithState(this.component, newState[this.observeState])
    } else {
      console.error('No component to update.')
    }
  }

  updateElementWithState (element: HTMLElement, state: any): void {
    if (typeof state === 'object' && state !== null) {
      for (const key in state) {
        if (Object.prototype.hasOwnProperty.call(state, key)) {
          const value = state[key]
          if (typeof value === 'object' && value !== null) {
            this.updateElementWithState(element, value)
          } else {
            if ((element as any)[key] !== value) {
              (element as any)[key] = value
            }
          }
        }
      }
    } else {
      if (element.textContent !== state) {
        element.textContent = state
      }
    }
  }
}

// Подписка-обсервер на пропсы элемента-тега
// И остальные состояния
