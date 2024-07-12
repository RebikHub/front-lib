import { createComponent } from '../../../lib/component'
import { HomeState, store } from '../../pages/home'

export function Total (): HTMLElement {
  const element = createComponent({
    tag: 'p'
  })
  store.addObserver((state: HomeState) => {
    element.textContent = `Count: ${state?.count}`
  })
  return element
}
