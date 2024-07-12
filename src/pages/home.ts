import { createComponent } from '../../lib/component'
import { createState } from '../../lib/state'
import { ButtonsGroup } from '../components/buttons-group/buttons-group'
import { Total } from '../components/total/total'

export interface HomeState {
  count: number
}

export const store = createState<HomeState>({ count: 0 })

const increment = (): void => store.setState({ count: +store.getState().count + 1 })

const decrement = (): void => store.setState({
  count: store.getState().count - 1
})

export function Home (): HTMLElement {
  return createComponent({
    tag: 'div',
    content: 'This is a custom lib for UI',
    children: [
      Total,
      ButtonsGroup({ handleIncrement: increment, handleDecrement: decrement })
    ]
  })
}
