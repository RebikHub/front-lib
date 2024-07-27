import { createRouter } from '../lib'
import { App } from './observeMain'
import { About } from './pages/about'
import { Home } from './pages/home'
import { Main } from './pages/main/view/main'

export const { add, layout, navigate, start } = createRouter()

add('/switch', App)

add('/about', About)

add('/main', Main)

add('/', Home)
