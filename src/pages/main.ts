import { createComponent } from '../../lib/component'

export function Main () {
  return createComponent({
    elementName: 'p',
    textContent: 'Home page'
  })
}
