import { createComponent } from '@lib/index'
import { add } from '@src/store'

export function About (): HTMLElement {
  const element = createComponent({ tag: 'p' })

  add(({ count }) => {
    console.log(count)
    if (count > 0) {
      element.textContent = String(count)
    } else {
      element.remove()
    }
  })

  console.log(element)

  return createComponent({
    children: [
      createComponent({
        tag: 'p',
        content: 'About us'
      }),
      element
    ]
  })
}
