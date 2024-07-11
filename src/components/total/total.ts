import { createComponent } from 'crs-arch'
import { State, store } from '../../store'

export function Total (): HTMLElement {
  const element = createComponent({
    tag: 'p'
  })
  console.log('render: Total')

  store.addObserver((state: State) => {
    console.log(state)
    element.textContent = `Count: ${state?.count}`
  })
  return element
}
