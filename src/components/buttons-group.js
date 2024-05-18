import { Button } from './button'
import { decrement, increment, store } from '../store'
import { createComponent } from '../../lib/component'

export function ButtonsGroup () {
  return createComponent({
    classNames: 'buttons',
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
