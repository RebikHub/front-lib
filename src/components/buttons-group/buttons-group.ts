import { Button } from '../button/button'
import { decrement, increment } from '../../store'
import './buttons-group.css'
import { createComponent } from 'crs-arch'

export function ButtonsGroup (): HTMLElement {
  return createComponent({
    classNames: ['buttons-group', 'buttons'],
    children: [
      Button({
        title: 'Increment',
        onClick: increment
      }),
      Button({
        title: 'Decrement',
        onClick: decrement
      })
    ]
  })
}
