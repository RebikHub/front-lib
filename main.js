import './style.css'
import { initApp, createComponent } from './lib/component'
import { Button } from './src/components/button'
import router from './src/routes'
import { Navigation } from './src/components/navigation'
import { Title } from './src/components/title'

initApp('app', [
  Navigation,
  Title,
  router.layoutElement(createComponent({}))
])

router.startRouter()
