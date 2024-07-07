import { Button } from '../button/button'
import { createComponent } from '../../../lib/component'
import { decrement, increment } from '../../store'
import './buttons-group.css'

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
