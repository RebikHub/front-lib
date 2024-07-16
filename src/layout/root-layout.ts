import { createComponent } from '@lib/index'
import { layout } from '@src/routes'
import './style.css'

export function RootLayout (): HTMLElement {
  return layout(createComponent({
    class: 'layout'
  }))
}
