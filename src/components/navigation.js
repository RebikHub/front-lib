import { Button } from './button'
import router from '../routes'

export function Navigation () {
  return [
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
}
