import { createComponent, initApp } from '../lib/component'
import { Navigation } from './components/navigation/navigation'
import { Title } from './components/title/title'
import router from './routes'
import './style.css'

initApp('app', [
  Navigation,
  Title,
  router.layoutElement(createComponent({}))
])

router.startRouter()
