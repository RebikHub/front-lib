import { createComponent, initApp } from 'crs-arch'
import { Navigation } from './components/navigation/navigation'
import { Title } from './components/title/title'
import router from './routes'
import './style.css'
import { store } from './store'

initApp('app', [
  Navigation,
  Title,
  router.layoutElement(createComponent({}))
])

router.startRouter()

store.addObserver((state) => {
  console.log(state)
})
