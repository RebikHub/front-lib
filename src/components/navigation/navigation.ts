import { createComponent } from '../../../lib/component'
import router from '../../routes'
import { Button } from '../button/button'
import './navigation.css'

export function Navigation (): HTMLElement {
  return createComponent({
    tag: 'header',
    class: 'navigation',
    children: [
      Button({
        title: 'About',
        onClick: () => router.navigateTo('/about')
      }),
      Button({
        title: 'Main',
        onClick: () => router.navigateTo('/main')
      }),
      Button({
        title: 'Home',
        onClick: () => router.navigateTo('/')
      })
    ]
  })
}
