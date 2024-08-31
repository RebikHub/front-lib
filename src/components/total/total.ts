import { createComponent, observe } from '../../../lib'
import { totalStore } from '../../store'
import { Summ } from '../summ/Summ'

export function Total (): HTMLElement {
  return createComponent({
    children: [observe({
      store: totalStore,
      props: {
        tag: 'p',
        content: `Count: ${totalStore.state.count}`
      },
      render: (state) => ({ content: `Count: ${state.count}` })
    }), Summ]
  })
}
