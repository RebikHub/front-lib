import { createComponent } from '../../lib/component'

export function Title (): HTMLElement {
  return createComponent({
    elementName: 'h1',
    className: 'fa',
    textContent: 'Hello Vanilla!'
  })
}
