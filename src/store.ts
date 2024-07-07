import { StateManager, StateObserver } from '../lib/state'

interface State {
  count: number
}

export const store = new StateManager<State>({ count: 0 })
export const observer = new StateObserver(store)

export const increment = (): void => store.setState({ count: +store.getState().count + 1 })

export const decrement = (): void => store.setState({
  count: store.getState().count - 1
})
