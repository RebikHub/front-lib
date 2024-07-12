import { createComponent } from '../../../lib/component'

export function Title (): HTMLElement {
  return createComponent({
    tag: 'h1',
    class: 'fa',
    content: 'Hello Vanilla!'
  })
}
