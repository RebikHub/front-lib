import { createComponent } from 'crs-arch'

export function Title (): HTMLElement {
  return createComponent({
    tag: 'h1',
    classNames: 'fa',
    content: 'Hello Vanilla!'
  })
}
