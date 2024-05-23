import { StateManager, StateObserver } from '../lib/state'

export const store = new StateManager({ count: 0 })
export const observer = new StateObserver(store)

export const increment = () => store.setState({ count: store.getState().count + 1 })

export const decrement = () => store.setState({
  count: store.getState().count - 1
})
