import { createComponent } from '../../lib/component'

export function About (): HTMLElement {
  return createComponent({
    tag: 'p',
    content: 'About us'
  })
}
