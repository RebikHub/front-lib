// import { IStateManager, Observer } from './types'

// export class StateManager<T> implements IStateManager<T> {
//   state: T
//   observers: Array<Observer<T>>

//   constructor (initialState: T) {
//     this.state = initialState
//     this.observers = []
//   }

//   addObserver (observer: Observer<T>): void {
//     if (observer != null && typeof observer.update === 'function') {
//       this.observers.push(observer)
//     } else {
//       console.error('Invalid observer. Must have an update method.')
//     }
//   }

//   notifyObservers (changedProperties: string[]): void {
//     this.observers.forEach(observer => observer.update(this.state, changedProperties))
//   }

//   setState (newState: Partial<T>): void {
//     const changedProperties = Object.keys(newState)
//     this.state = { ...this.state, ...newState }
//     this.notifyObservers(changedProperties)
//   }

//   getState (): T {
//     return this.state
//   }
// }

// export class StateObserver<T> implements Observer<T> {
//   private readonly manager: IStateManager<T>
//   private component: HTMLElement | null
//   private observeState: string

//   constructor (manager: IStateManager<T>) {
//     if (!(manager instanceof StateManager)) {
//       throw new Error('Invalid manager. Must be an instance of StateManager.')
//     }
//     this.manager = manager
//     this.manager.addObserver(this)
//     this.component = null
//     this.observeState = ''
//   }

//   observeElement (element: HTMLElement, observeState: string): HTMLElement {
//     if (element instanceof HTMLElement) {
//       this.component = element
//       this.observeState = observeState
//       return element
//     } else {
//       console.error('Invalid element. Must be an instance of HTMLElement.')
//       throw new Error('Invalid element')
//     }
//   }

//   update (newState: T, _changedProperties: string[]): void {
//     if (this.component != null && this.observeState != null) {
//       const state = newState[this.observeState as keyof T]
//       this.updateElementWithState(this.component, state)
//     } else {
//       console.error('No component to update.')
//     }
//   }

//   updateElementWithState (element: HTMLElement, state: any): void {
//     if (typeof state === 'object' && state !== null) {
//       for (const key in state) {
//         if (Object.prototype.hasOwnProperty.call(state, key)) {
//           const value = state[key]
//           if (typeof value === 'object' && value !== null) {
//             this.updateElementWithState(element, value)
//           } else {
//             if ((element as any)[key] !== value) {
//               (element as any)[key] = value
//             }
//           }
//         }
//       }
//     } else {
//       if (element.textContent !== state) {
//         element.textContent = state
//       }
//     }
//   }
// }

type Writable<T> = {
  -readonly [P in keyof T]: T[P];
}

export class StateManager<T extends Record<string, any>> {
  private readonly state: Writable<T>
  private readonly observers: Set<(state: T) => void> = new Set()

  constructor (initialState: T) {
    this.state = new Proxy(initialState as Writable<T>, {
      set: (target, prop: string | symbol, value) => {
        if (typeof prop === 'string' && prop in target && target[prop as keyof T] !== value) {
          target[prop as keyof T] = value
          this.notifyObservers()
        }
        return true
      }
    })
  }

  getState (): T {
    return this.state as T
  }

  setState (newState: Partial<T>): void {
    for (const key in newState) {
      if (key in newState && newState[key] !== this.state[key as keyof T]) {
        this.state[key as keyof T] = newState[key] as T[keyof T]
      }
    }
    this.notifyObservers()
  }

  addObserver (observer: (state: T) => void): void {
    this.observers.add(observer)
  }

  removeObserver (observer: (state: T) => void): void {
    this.observers.delete(observer)
  }

  private notifyObservers (): void {
    this.observers.forEach(observer => observer(this.state as T))
  }
}
