import { Button } from '../button/button'
import { createComponent } from '../../../lib/component'
import './buttons-group.css'
import { store } from '../../pages/home'

interface Props { handleIncrement: () => void, handleDecrement: () => void }

export function ButtonsGroup ({ handleIncrement, handleDecrement }: Props): HTMLElement {
  const button = Button({
    title: 'Increment',
    onClick: handleIncrement
  })

  store.addObserver((state) => {
    if (state.count > 3) {
      button.setAttribute('disabled', '')
    } else {
      button.removeAttribute('disabled')
    }
  })
  return createComponent({
    classes: ['buttons-group', 'buttons'],
    children: [
      button,
      Button({
        title: 'Decrement',
        onClick: handleDecrement
      })
    ]
  })
}
