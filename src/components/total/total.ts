import { createComponent } from '../../../lib'
import { add, state } from '../../store'
import { Summ } from '../summ/Summ'

export function Total (): HTMLElement {
  const element = createComponent({
    tag: 'p',
    content: `Count: ${state.count}`
  })

  const get = (): Function => {
    let d = 0
    return () => {
      d += 1
      console.log('D: ', d)
    }
  }

  const getD = get()

  add('Total', ({ count }) => {
    if (element != null) {
      element.textContent = `Count: ${count}`
    }

    getD()
  })

  return createComponent({
    children: [element, Summ]
  })
}
