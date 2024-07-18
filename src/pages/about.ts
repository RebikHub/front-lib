import { createComponent } from '@lib/index'

export function About (): HTMLElement {
  const element = createComponent({ tag: 'p' })

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
