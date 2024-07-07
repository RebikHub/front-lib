import { createComponent } from '../../lib/component'

export function Main (): HTMLElement {
  return createComponent({
    tag: 'p',
    content: 'Home page'
  })
}
