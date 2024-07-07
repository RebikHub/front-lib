import { createComponent } from '../../lib/component'

export function Main (): HTMLElement {
  return createComponent({
    elementName: 'p',
    textContent: 'Home page'
  })
}
