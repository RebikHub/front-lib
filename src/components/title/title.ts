import { createComponent } from '../../../lib/component'

export function Title (): HTMLElement {
  return createComponent({
    tag: 'h1',
    classNames: 'fa',
    content: 'Hello Vanilla!'
  })
}
