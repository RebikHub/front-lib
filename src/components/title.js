import { createComponent } from '../../lib/component'

export function Title () {
  return createComponent({
    elementName: 'h1',
    classNames: 'fa',
    textContent: 'Hello Vanilla!'
  })
}
