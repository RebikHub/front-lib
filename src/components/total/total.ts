import { createComponent } from '../../../lib'
import { add } from '../../store'

export function Total (): HTMLElement {
  let element = createComponent({
    tag: 'p'
  })

  add(({ count }) => {
    console.log('Total: ', count)
    if (count > 0 && element != null) {
      element.textContent = `Count: ${count}`
    } else if (count > 0 && element == null) {
      element = createComponent({
        tag: 'p'
      })
    } else {
      element.remove()
    }
  })

  return element
}
