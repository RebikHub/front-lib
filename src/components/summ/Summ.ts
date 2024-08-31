import { createComponent, observe } from '@lib/index'
import { totalStore } from '@src/store'

export function Summ (): HTMLElement {
  return createComponent({
    content: 'Total summ',
    children: [observe({
      store: totalStore,
      props: {
        tag: 'h3',
        content: `Summ ${totalStore.state.count % 2 === 0 ? 'odd' : 'even'}`
      },
      render: (state) => ({
        content: `Summ ${state.count % 2 === 0 ? 'odd' : 'even'}`
      })
    })]
  })
}
