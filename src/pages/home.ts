import { createComponent } from '../../lib/component'
import { ButtonsGroup } from '../components/buttons-group'
import { Total } from '../components/total'

export function Home (): HTMLElement {
  return createComponent({
    elementName: 'div',
    textContent: 'This is a custom lib for UI',
    children: [
      Total,
      ButtonsGroup
    ]
  })
}
