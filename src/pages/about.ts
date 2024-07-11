import { createComponent } from 'crs-arch'

export function About (): HTMLElement {
  return createComponent({
    tag: 'p',
    content: 'About us'
  })
}
