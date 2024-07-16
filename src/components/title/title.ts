import { createComponent } from '../../../lib'

export function Title (): HTMLElement {
  return createComponent({
    tag: 'h1',
    class: 'fa',
    content: 'Hello Vanilla!'
  })
}
