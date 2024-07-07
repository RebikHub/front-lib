import { createComponent } from '../../lib/component'
import { observer } from '../store'

export function Total (): HTMLElement {
  return observer.observeElement(createComponent({
    elementName: 'p'
  }), 'count')
}
