import { createComponent } from '../../../lib/component'
import { State, store } from '../../store'
// import { observer } from '../../store'

// export function Total (): HTMLElement {
//   return observer.observeElement(createComponent({
//     tag: 'p'
//   }), 'count')
// }

export function Total (): HTMLElement {
  const element = createComponent({
    tag: 'p'
  })
  store.addObserver((state: State) => {
    console.log(state)
    element.textContent = `Count: ${state?.count}`
  })
  return element
}
