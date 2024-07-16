import { initApp } from '@lib/index'
import { Navigation } from './components/navigation/navigation'
import { Title } from './components/title/title'
import './style.css'
import { start } from './routes'
import { RootLayout } from './layout/root-layout'

initApp('app', [
  Navigation,
  Title,
  RootLayout
])

start()
