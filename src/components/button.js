import { createComponent } from '../../lib/component'

export function Button ({ title, onClick }) {
  return createComponent({
    elementName: 'button',
    textContent: title,
    onClick
  })
}
