import { Observer, Writable } from '../types'

export function createState<T extends Record<string, any>> (initialState: T): {
  get: () => T
  set: (newState: Partial<T>) => void
  add: (name: string, observer: Observer<T>) => void
  remove: (name: string) => void
  state: Writable<T>
} {
  const state = new Proxy(initialState as Writable<T>, {
    set: (target, prop: string | symbol, value) => {
      if (typeof prop === 'string' && target[prop as keyof T] !== value) {
        target[prop as keyof T] = value
      }
      return true
    }
  })

  const observers: Map<string, Observer<T>> = new Map()

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

  function add (name: string, observer: Observer<T>): void {
    observers.set(name, observer)
  }

  function remove (name: string): void {
    observers.delete(name)
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
