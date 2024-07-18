import { createComponent } from '@lib/index'
import { add, state } from '@src/store'

export function Summ (): HTMLElement {
  const element = createComponent({
    tag: 'h3',
    content: `Summ ${state.count % 2 === 0 ? 'odd' : 'even'}`
  })

  add('Summ', ({ count }) => {
    element.textContent = `Summ ${count % 2 === 0 ? 'odd' : 'even'}`
  })

  return createComponent({
    content: 'Total summ',
    children: [element]
  })
}
