import { Observer, Writable } from '../types'

export function createState<T extends Record<string, any>> (initialState: T): {
  get: () => T
  set: (newState: Partial<T>) => void
  add: (observer: Observer<T>) => void
  remove: (observer: Observer<T>) => void
  state: Writable<T>
} {
  const state = new Proxy(initialState as Writable<T>, {
    set: (target, prop: string | symbol, value) => {
      if (typeof prop === 'string' && target[prop as keyof T] !== value) {
        target[prop as keyof T] = value
        // notifyObservers()
      }
      return true
    }
  })

  const observers: Set<Observer<T>> = new Set()

  function get (): T {
    return state as T
  }

  function set (newState: Partial<T>): void {
    let hasChanged = false
    for (const key in newState) {
      if (newState[key] !== state[key as keyof T]) {
        state[key as keyof T] = newState[key] as T[keyof T]
        hasChanged = true
      }
    }
    if (hasChanged) {
      notifyObservers()
    }
  }

  function add (observer: Observer<T>): void {
    observers.add(observer)
  }

  function remove (observer: Observer<T>): void {
    observers.delete(observer)
  }

  function notifyObservers (): void {
    observers.forEach(observer => observer(state as T))
  }

  return {
    state,
    get,
    set,
    add,
    remove
  }
}
