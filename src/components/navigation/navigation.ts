import { createComponent } from '@lib/index'
import { Button } from '../button/button'
import './navigation.css'
import { navigate } from '@src/routes'

export function Navigation (): HTMLElement {
  return createComponent({
    tag: 'header',
    class: 'navigation',
    children: [
      Button({
        title: 'About',
        onClick: () => navigate('/about')
      }),
      Button({
        title: 'Main',
        onClick: () => navigate('/main')
      }),
      Button({
        title: 'Home',
        onClick: () => navigate('/')
      })
    ]
  })
}
