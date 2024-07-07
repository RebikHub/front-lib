import { createComponent } from '../../lib/component'

export function About (): HTMLElement {
  return createComponent({
    elementName: 'p',
    textContent: 'About us'
  })
}
