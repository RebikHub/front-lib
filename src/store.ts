import { createState } from 'crs-arch'

export interface State {
  count: number
}

export const store = createState<State>({ count: 0 })

export const increment = (): void => store.setState({ count: +store.getState().count + 1 })

export const decrement = (): void => store.setState({
  count: store.getState().count - 1
})
