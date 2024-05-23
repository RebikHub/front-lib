import { createComponent } from '../../lib/component'

export function About () {
  return createComponent({
    elementName: 'p',
    textContent: 'About us'
  })
}
