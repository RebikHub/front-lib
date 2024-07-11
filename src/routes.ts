import { createRouter } from 'crs-arch'
import { About } from './pages/about'
import { Home } from './pages/home'
import { Main } from './pages/main'

const router = createRouter()

router.addRoute('/about', About)

router.addRoute('/main', Main)

router.addRoute('/', Home)

export default router
