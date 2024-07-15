import { Observer, Writable } from '../types'

export function createState<T extends Record<string, any>> (initialState: T): {
  getState: () => T
  setState: (newState: Partial<T>) => void
  addObserver: (observer: Observer<T>) => void
  removeObserver: (observer: Observer<T>) => void
} {
  const state = new Proxy(initialState as Writable<T>, {
    set: (target, prop: string | symbol, value) => {
      if (typeof prop === 'string' && target[prop as keyof T] !== value) {
        target[prop as keyof T] = value
        notifyObservers()
      }
      return true
    }
  })

  const observers: Set<Observer<T>> = new Set()

  function getState (): T {
    return state as T
  }

  function setState (newState: Partial<T>): void {
    let hasChanged = false
    for (const key in newState) {
      if (key in newState && newState[key] !== state[key as keyof T]) {
        state[key as keyof T] = newState[key] as T[keyof T]
        hasChanged = true
      }
    }
    if (hasChanged) {
      notifyObservers()
    }
  }

  function addObserver (observer: Observer<T>): void {
    observers.add(observer)
  }

  function removeObserver (observer: Observer<T>): void {
    observers.delete(observer)
  }

  function notifyObservers (): void {
    observers.forEach(observer => observer(state as T))
  }

  return {
    getState,
    setState,
    addObserver,
    removeObserver
  }
}