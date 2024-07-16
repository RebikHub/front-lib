import { Button } from '../button/button'
import { decrement, increment } from '../../store'
import './buttons-group.css'
import { createComponent } from '../../../lib'

export function ButtonsGroup (): HTMLElement {
  return createComponent({
    classes: ['buttons-group', 'buttons'],
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
