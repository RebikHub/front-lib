import { createRouter } from '../lib'
import { About } from './pages/about'
import { Home } from './pages/home'
import { Main } from './pages/main/view/main'

export const { add, layout, navigate, start } = createRouter()

add('/about', About)

add('/main', Main)

add('/', Home)

// start()
