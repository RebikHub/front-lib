import { createComponent } from 'crs-arch'
import { ButtonsGroup } from '../components/buttons-group/buttons-group'
import { Total } from '../components/total/total'

export function Home (): HTMLElement {
  return createComponent({
    tag: 'div',
    content: 'This is a custom lib for UI',
    children: [
      Total,
      ButtonsGroup
    ]
  })
}
