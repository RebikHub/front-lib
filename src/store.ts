import { createState } from '../lib'

export interface State {
  count: number
}

export const { set, state, add } = createState<State>({ count: 0 })

export const increment = (): void => set({ count: state.count - 1 })

export const decrement = (): void => set({ count: state.count + 1 })
