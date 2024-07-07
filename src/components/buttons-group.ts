import { Button } from './button'
import { createComponent } from '../../lib/component'
import { decrement, increment } from '../store'

export function ButtonsGroup (): HTMLElement {
  return createComponent({
    className: 'buttons',
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
