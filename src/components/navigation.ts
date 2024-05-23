import router from '../routes'
import { Button } from './button'

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
