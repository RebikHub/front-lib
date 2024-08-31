import { createState } from '../lib'

export interface State {
  count: number
}

export const totalStore = createState<State>({ count: 0 })

export const increment = (): void => totalStore.set({ count: totalStore.state.count - 1 })

export const decrement = (): void => totalStore.set({ count: totalStore.state.count + 1 })
