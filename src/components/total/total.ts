import { createComponent } from '../../../lib'
import { add, state } from '../../store'
import { Summ } from '../summ/Summ'

export function Total (): HTMLElement {
  const element = createComponent({
    tag: 'p',
    content: `Count: ${state.count}`
  })

  add('Total', ({ count }) => {
    if (element != null) {
      element.textContent = `Count: ${count}`
    }
  })

  return createComponent({
    children: [element, Summ]
  })
}
